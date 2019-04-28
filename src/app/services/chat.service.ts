import { Injectable } from '@angular/core';
import { RdfService } from '../services/rdf.service';
import { ChatChannel } from '../models/chat-channel.model';
import { Message } from '../models/message.model';
import { Participant } from '../models/participant.model';
import * as uuid from 'uuid';


const MESSAGE_CONTENT_TYPE = 'application/ld+json';
const BASE_NAME_MESSAGES = 'dechat_msg';

const PRIVATE_FOLDER = '/private';
const FILES_FOLDER = '/private/files'
const CHAT_FOLDER = '/private/dechat_es6b';
const INBOX_FOLDER = '/inbox/';
const PROFILE_CARD_FOLDER = '/profile/card#me';
const GROUPS_FOLDER = '/private/dechat_groups';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatChannels: ChatChannel[] = new Array();
  allActiveChats: ChatChannel[] = new Array(); // all active user chats
  uri: string;
  webid: string

  waitForCheckInbox: boolean = false;

  constructor(private rdf: RdfService) {
    // this.startChat();
  }

  /**
   * Method to start chat execution. Checks if the necessary folders exist, loads the chats of the 
   * current session, and checks the inbox for new messages.
   * 
   * You then subscribe to the POD of the current session to detect new messages.
   */
  public async startChat() {
    this.webid = await this.rdf.getWebId();
    this.uri = this.webid.replace(PROFILE_CARD_FOLDER, "");

    await this.checkFolder(PRIVATE_FOLDER)
      .then(async () => { await this.checkFolder(FILES_FOLDER) })
      .then(async () => { await this.checkFolder(CHAT_FOLDER) })
      .then(async () => { await this.checkFolder(GROUPS_FOLDER) })
      .then(async () => { await this.loadChatChannels() })
      .then(async () => { await this.checkInbox() });

    // We open WebSocket, any modification in our POD will cause the execution of "checkInbox()".
    let updateUri = this.rdf.store.sym(this.uri + INBOX_FOLDER);
    await this.rdf.fetcher.load(updateUri.doc());
    this.rdf.updateManager.addDownstreamChangeListener(updateUri.doc(), async () => {
      // Wait if there is already another test in operation (IMPROVE)
      while (this.waitForCheckInbox) { 
        await this.delay(Math.random() * (400 - 250) + 250); 
      }

      // Check that another check is not already running (IMPROVE)
      if (!this.waitForCheckInbox) {
        this.waitForCheckInbox = true;
        await this.checkInbox();
        this.waitForCheckInbox = false;
      }
    });
  }

  /**
   * Checks if the folder specified by parameter exists, if it does not exist create the folder.
   * 
   * @param folder Folder to check. Example: '/private'
   */
  private async checkFolder(folder: string) {
    // If the folder is not created we create it
    let checkFolder = await this.rdf.readFolder(this.uri + folder);
    if (checkFolder === undefined) {
      console.log("The '"+folder+"' folder does not exist, creating it...");
      await this.rdf.createFolder(this.uri + folder);
    }
  }

  /**
   * Returns the service object with RDF operations
   */
  getRdfService() {
    return this.rdf;
  }

  /**
   * Loads the chats stored in the POD of the current session and sorts them according to the last message of each chat.
   * It also creates a copy of the chats in "allActiveChats".
   */
  public async loadChatChannels() {
    console.log("Loading chat channels...");
    this.chatChannels = await this.rdf.loadChatChannels(this.uri + CHAT_FOLDER + "/");
    this.sortChatChannels();
    this.allActiveChats = this.chatChannels.map(channel => { return channel });
  }

  /**
   * Adds the message specified by parameter to the channel specified by parameter, and reorders the 
   * channel list according to the last message of each chat.
   * 
   * @param channel Channel to which the message will be added
   * @param msg Message to be added to the channel
   */
  private addNewMessageToChannel(channel: ChatChannel, msg: Message) {
    channel.messages.push(msg);
    this.sortChatChannels();
  }

  /**
   * Sorts the chat channels based on the date of the last message sent by each one.
   */
  sortChatChannels() {
    this.chatChannels.sort(function(a, b) { 
      if (a.getLastMessage() && !b.getLastMessage())
        return 1;
      else if (!a.getLastMessage() && b.getLastMessage())
        return -1;
      else if (!a.getLastMessage() && !b.getLastMessage())
        return 0;
      else
        return +new Date(b.getLastMessage().sendTime) - +new Date(a.getLastMessage().sendTime) 
    });
  }

  /**
   * Used to modify the channel list.
   * 
   * @param chatChannels New channel list
   */
  setChatChannels(chatChannels: ChatChannel[]) {
    this.chatChannels = chatChannels;
  }

  /**
   * Allows you to set asynchronous waiting.
   * 
   * @param ms Waiting time (milliseconds)
   */
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Allows you to send a message to a contact.
   * 
   * Saves the message in the chatChannel object, adds the message to the chat channel on your own POD
   * and sends the message to the Inbox of the participants of the chat channel.
   *
   * @param chatChannel Chat channel to which the message will be sent
   * @param msg Message (content) to be sent
   */
  public async sendMessage(chatChannel: ChatChannel, msg: string) {
    // We check that the channel exists
    try {
      let channel: ChatChannel = this.searchChatChannelById(chatChannel.id);
      if (channel != null) {
        // We create and save the message
        let message = new Message(this.webid, msg);
        this.addNewMessageToChannel(chatChannel, message);

        // If it is a group channel we update the participants
        // and add the group to the message in a new property
        if (chatChannel.group && chatChannel.group.toString().length > 0) {
          chatChannel.participants = await this.rdf.getGroupChatParticipants(chatChannel.group.toString());
          message["group"] = chatChannel.group.toString();
        }

        // We update chat channel in own POD
        message.markMessageAsRead();
        let msgUri = await this.rdf.saveMessage(this.uri + CHAT_FOLDER + "/" + chatChannel.id, message);
        message.id = msgUri;

        // We send the message to all chat participants
        message.markMessageAsPending();
        let newMsg = JSON.stringify(message);
        message.markMessageAsRead(); // In memory it must remain in READ (own message)

        chatChannel.participants.forEach(async participant => { 
          if (participant.webId != this.webid) {
            let tmpParticipant = participant.webId.toString().replace(PROFILE_CARD_FOLDER, "");
            await this.rdf.createFile(tmpParticipant + INBOX_FOLDER + BASE_NAME_MESSAGES, newMsg, MESSAGE_CONTENT_TYPE);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Allows you to get the user's contact list for the current session.
   * 
   * @param users Object in which the user's contact list will be stored.
   */
  async getFriends(users) {
    await this.rdf.getFriends(users);
  }
  
  /**
   * Allows you to send a file to a contact.
   * 
   * Upload the file to your own POD, assign the appropriate permissions to the file and send a message with 
   * the URL to the chat channel participants.
   * 
   * @param chatChannel Chat channel to which the file will be sent
   * @param file File to be sent
   */
  public async sendFile(chatChannel: ChatChannel, msg: string, file: File) {
    try {
      // We check that the channel exists
      let channel: ChatChannel = this.searchChatChannelById(chatChannel.id);
      if (channel != null) {
        // We create the message
        let message = new Message(this.webid, msg);
 
        // Save the file in the pod and update the message with the url of the file
        let urlFile = await this.rdf.createFile(this.uri + FILES_FOLDER + "/" + "file_" + file.name.replace(/[^a-zA-Z0-9-_\.]/g, '_'), file);
        message.message = urlFile;
        
        // We save the message (url)
        this.addNewMessageToChannel(chatChannel, message);

        // If it is a group channel we update the participants and add the group to the message in a new property
        if (chatChannel.group && chatChannel.group.toString().length > 0) {
          chatChannel.participants = await this.rdf.getGroupChatParticipants(chatChannel.group.toString());
          message["group"] = chatChannel.group.toString();
        }

        // Create the file .acl (permissions) and assign the Owner (current webid)
        await this.rdf.updateFile(urlFile + ".acl", "");
        await this.rdf.addOwnerToACL(urlFile, this.webid);

        // We update chat channel in own POD
        message.markMessageAsRead();
        let msgUri = await this.rdf.saveMessage(this.uri + CHAT_FOLDER + "/" + chatChannel.id, message);
        message.id = msgUri;


        // We send the message to all chat participants
        message.markMessageAsPending();
        let newMsg = JSON.stringify(message);
        message.markMessageAsRead(); // In memory it must remain in READ (own message)

        chatChannel.participants.forEach(async participant => {
          if (participant.webId != this.webid) {
            let uriParticipant = participant.webId.toString().replace(PROFILE_CARD_FOLDER, "");
            // We add reading permissions to the file for the participant
            await this.rdf.addReaderToACL(urlFile, participant.webId.toString());
            // We send to the inbox of the participant the message with the url of the file
            this.rdf.createFile(uriParticipant + INBOX_FOLDER + BASE_NAME_MESSAGES, newMsg, MESSAGE_CONTENT_TYPE);
          }
        });
        
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Used to set the status of all messages of the chat channel specified by parameter to "PENDING".
   * 
   * @param channel Chat channel in which all messages are set to "PENDING" status.
   */
  async markPendingMessagesAsRead(channel: ChatChannel) {
    let pendingMessages = channel.getPendingMessages();

    if (pendingMessages.length > 0) {
      pendingMessages.forEach(m => {
        m.status = Message.Status.READ; // At this point it doesn't seem to detect "m.markMessageAsRead()"
      });

      await this.rdf.updateMessageToRead(pendingMessages.map(m => {
        let msgUri = (this.uri + CHAT_FOLDER + "/" + channel.id + "#" + m.id);
        return msgUri;
      }));
    }
  }

  /**
   * Searches for new messages in the inbox itself, if there is one it processes it.
   */
  public async checkInbox() {
    console.log("Checking inbox...");
    let msgs = await this.rdf.getInboxMessages(this.uri + INBOX_FOLDER);

    for (const msg of msgs) {
      await this.processNewMessage(msg);
    }
  }

  /**
   * Checks whether the message is regular or group, and then processes it using the 
   * "processRegularMessage" and "processGroupMessage" methods.
   *
   * @param newMessage Message to be processed.
   */
  private async processNewMessage(newMessage: any) {
    let msgId: string;

    if (!newMessage.group) {
      msgId = await this.processRegularMessage(newMessage);
    } else {
      msgId = await this.processGroupMessage(newMessage);
    }

    newMessage.id = msgId.split("#").pop();
  }

  /**
   * Processes a regular message and returns the ID assigned to the message.
   * Returns the URI assigned to the message
   * 
   * - If there is already a chat channel with the participant, add the new message to the existing channel.
   * - If there is no chat channel with the participant, create the corresponding channel and add it to the new channel.
   * 
   * @param newMessage Message to be processed.
   */
  private async processRegularMessage(newMessage: any): Promise<string> {
    let channel:ChatChannel = this.searchChatChannelByParticipantWebid(newMessage.makerWebId);
    
      
    // Add the message to the corresponding channel if it already exists
    if (channel != null) {
      this.addNewMessageToChannel(channel, newMessage);
      channel.messages.sort(function(a, b) { return  +new Date(a.sendTime) - +new Date(b.sendTime) });

      // We save the message in the chat on our own POD
      return await this.rdf.saveMessage(this.uri + CHAT_FOLDER + "/" + channel.id, newMessage);
      
    } else {
      // If there is no associated channel we create one
      let newChannel = await this.createNewChatChannel(newMessage.makerWebId);
      
      this.addNewMessageToChannel(newChannel, newMessage);
      // We save the message in the chat on our own POD
      return await this.rdf.saveMessage(this.uri + CHAT_FOLDER + "/" + newChannel.id, newMessage);
    }
  }

  /**
   * Processes a group message and returns the ID assigned to the message.
   * Returns the URI assigned to the message
   * 
   * - If there is already a chat channel with the participant, add the new message to the existing channel.
   * - If there is no chat channel with the participant, create the corresponding channel and add it to the new channel.
   * 
   * @param newMessage Message to be processed.
   */
  private async processGroupMessage(newMessage: any): Promise<string> {
    let channel:ChatChannel = this.searchChatChannelByGroup(newMessage.group.toString());
    let validParticipant = (await this.rdf.getGroupChatParticipants(newMessage.group))
                            .filter(p => { return p.webId == newMessage.makerWebId });

    // If the participant does not exist in the group we understand that he has been expelled, therefore ignore
    if (validParticipant.length != 0) {
      await this.rdf.fetchNewParticipant(newMessage.makerWebId);

      // Add the message to the corresponding channel if it already exists
      if (channel != null) {
        this.addNewMessageToChannel(channel, newMessage);
        channel.messages.sort(function(a, b) { return  +new Date(a.sendTime) - +new Date(b.sendTime) });

        // We save the message in the chat on our own POD
        return await this.rdf.saveMessage(this.uri + CHAT_FOLDER + "/" + channel.id, newMessage);

      } else {
        // If there is no associated channel we create one
        let newChannel = await this.createNewGroupChatChannel(newMessage.group.toString(),
                              await this.rdf.getChatGroupTitle(newMessage.group.toString()));

        this.addNewMessageToChannel(newChannel, newMessage);
        // We save the message in the chat on our own POD
        return await this.rdf.saveMessage(this.uri + CHAT_FOLDER + "/" + newChannel.id, newMessage);
      }
    }
  }

  /**
   * Method to create new channels, the new channel will be created on the own POD and added to the list of chat channels.
   * Returns the channel if it is created correctly, if it does not return null.
   *
   * @param webId Contact WebId (Example: https://yourpod.solid.community/profile/card#me)
   * @param title Chat title (deprecated), currently ignored
   */
  public async createNewChatChannel(webId: string, title: string = "Chat Channel"): Promise<ChatChannel> {
    let channel: ChatChannel = this.searchChatChannelByParticipantWebid(webId);
    let participant = await this.rdf.loadParticipantData(webId);

    if (channel == null && participant != undefined) {
      title = (participant.name != undefined && participant.name.length > 0) ? participant.name.toString() : title;
      let newChatChannel = new ChatChannel(this.getUniqueChatChannelID(), title);

      // We add chat to the list of memory chats
      newChatChannel.participants.push(participant);
      this.chatChannels.push(newChatChannel);

      // We save the chat on our POD
      await this.rdf.saveNewChatChannel(this.uri + CHAT_FOLDER + "/", newChatChannel);

      return newChatChannel;
    }

    return null;
  }

  /**
   * Create a new group chat channel, the new channel will be created on the own POD and added to the list of chat channels.
   * Returns the channel if it is created correctly, if it does not return null.
   * 
   * @param groupURI Chat group file URI.
   * @param title Title of the group chat.
   */
  public async createNewGroupChatChannel(groupURI: string, title: string = "Group channel"): Promise<ChatChannel> {
    let channel: ChatChannel = this.searchChatChannelByGroup(groupURI);

    if (channel == null) {
      let newChatChannel = new ChatChannel(this.getUniqueChatChannelID(), title, groupURI);
      newChatChannel.participants.push(await this.rdf.loadParticipantData(this.webid));
      this.chatChannels.push(newChatChannel);

      // We save the chat on our POD
      await this.rdf.saveNewChatChannel(this.uri + CHAT_FOLDER + "/", newChatChannel);
      
      return newChatChannel;
    }

    return null;
  }

  /**
   * Method for creating a new chat group and the corresponding group chat channel.
   * Returns the channel if it is created correctly, if it does not return null.
   * 
   * @param title Title of the group chat.
   */
  public async createNewChatGroup(title: string): Promise<ChatChannel> {
    let groupURI = await this.rdf.addNewChatGroupToFile(this.uri + GROUPS_FOLDER, this.webid, title);
    let groupChannel = await this.createNewGroupChatChannel(groupURI, title);
    return groupChannel
  }

  /**
   * Allows you to search for a chat channel through the participant's webId.
   * If it finds it, it returns the channel, if not NULL.
   * 
   * << METHOD ONLY VALID FOR INDIVIDUAL CHATS - IGNORES GROUP CHATS >>
   *
   * @param webId WebId of the participant of the chat channel.
   */
  public searchChatChannelByParticipantWebid(webId: string): ChatChannel {
    for (const channel of this.chatChannels) {
      for (const p of channel.participants) {
        if ((!channel.group || channel.group.toString().length == 0) && p.webId == webId) {
          return channel;
        }
      }
    }
    return null;
  }

  /**
   * Method to search for a chat channel by its ID.
   * Returns the channel if it finds it, if it does not return NULL.
   *
   * @param id ID of the channel to search.
   */
  public searchChatChannelById(id: string): ChatChannel {
    for (const channel of this.chatChannels) {
      if (channel.id == id) {
        return channel;
      }
    }
    return null;
  }

  /**
   * Method to search for a chat channel through the URI of the group.
   * Returns the channel if it finds it, if it does not return NULL.
   *
   * @param group URI of the chat group.
   */
  public searchChatChannelByGroup(groupURI: string): ChatChannel {
    for (const channel of this.chatChannels) {
      if (channel.group == groupURI) {
        return channel;
      }
    }
    return null;
  }

  /**
   * Method to generate a unique ID to create a chat channel.
   * Returns the generated ID.
   */
  private getUniqueChatChannelID(): string {
    let isUnique: boolean = false;
    let id = uuid.v4();

    while (!isUnique) {
      isUnique = true;
      this.chatChannels.forEach(channel => {
        if (channel.id == id) {
          isUnique = false;
        }
      });
    }

    return id;
  }

  /**
   * Method that allows you to delete a chat channel.
   * It removes it from memory and POD.
   * 
   * @param chat Chat channel to be deleted.
   */
  public async delete(chat: ChatChannel) {
    // We check that the channel exists
    let channel: ChatChannel = this.searchChatChannelById(chat.id);
    console.log(channel.created);

    // If there is, we delete it
    if (channel != null) {
      await this.rdf.deleteFile(this.uri + CHAT_FOLDER + "/" + chat.id);
      this.chatChannels = this.chatChannels.filter(channel => channel.id != chat.id);
    }
  }

  /**
   * Method to obtain all the participants of a group chat channel.
   * Returns a list of participants.
   * 
   * @param channel Group chat channel from which participants want to obtain.
   */
  public async getUserListGroup(channel: ChatChannel): Promise<Participant[]> {
    let list: Participant[] = [];

    if (channel.group && channel.group.length > 0) {
      list = await this.rdf.getGroupChatParticipants(channel.group);
    }

    return list;
  }

}