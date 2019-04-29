import { Injectable } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { SolidSession } from '../models/solid-session.model';
declare let solid: any;
declare let $rdf: any;
//import * as $rdf from 'rdflib'

import * as uuid from 'uuid';
import * as fileClient from 'solid-file-client';

// TODO: Remove any UI interaction from this service
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Message } from '../models/message.model';
import { Participant } from '../models/participant.model';
import { ChatChannel } from '../models/chat-channel.model';


const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
const SH = $rdf.Namespace('http://www.w3.org/ns/shacl#');
const XSD = $rdf.Namespace('http://www.w3.org/2001/XMLSchema#');
const SCHEMA = $rdf.Namespace('http://schema.org/');
const DC = $rdf.Namespace('http://purl.org/dc/elements/1.1/');
const TERMS = $rdf.Namespace('http://purl.org/dc/terms/');
const FLOW = $rdf.Namespace('http://www.w3.org/2005/01/wf/flow#');
const ICAL = $rdf.Namespace('http://www.w3.org/2002/12/cal/ical#');
const MEE = $rdf.Namespace('http://www.w3.org/ns/pim/meeting#');
const SIOC = $rdf.Namespace('http://rdfs.org/sioc/ns#');
const SOLIDRDF = $rdf.Namespace('http://www.w3.org/ns/solid/terms#');
const UI = $rdf.Namespace('http://www.w3.org/ns/ui#');
const RDF = $rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
const LDP = $rdf.Namespace("http://www.w3.org/ns/ldp#");
const ACL = $rdf.Namespace("http://www.w3.org/ns/auth/acl#");
const TYPE = $rdf.Namespace("https://www.w3.org/1999/02/22-rdf-syntax-ns#type");


// const JSONLD_CONTENT_TYPE = 'application/ld+json'
const JSONLD_CONTENT_TYPE = 'http://www.w3.org/ns/iana/media-types/application/ld+json#Resource'


/**
 * A service layer for RDF data manipulation using rdflib.js
 * @see https://solid.inrupt.com/docs/manipulating-ld-with-rdflib
 */
@Injectable({
  providedIn: 'root',
})
export class RdfService {

  session: SolidSession;
  store = $rdf.graph();

  /**
   * A helper object that connects to the web, loads data, and saves it back. More powerful than using a simple
   * store object.
   * When you have a fetcher, then you also can ask the query engine to go fetch new linked data automatically
   * as your query makes its way across the web.
   * @see http://linkeddata.github.io/rdflib.js/doc/Fetcher.html
   */
  fetcher = $rdf.Fetcher;

  /**
   * The UpdateManager allows you to send small changes to the server to “patch” the data as your user changes data in
   * real time. It also allows you to subscribe to changes other people make to the same file, keeping track of
   * upstream and downstream changes, and signaling any conflict between them.
   * @see http://linkeddata.github.io/rdflib.js/doc/UpdateManager.html
   */
  updateManager = $rdf.UpdateManager;

  constructor (private toastr: ToastrService, private chatUtils: UtilsService) {
    const fetcherOptions = {};
    this.fetcher = new $rdf.Fetcher(this.store, fetcherOptions);
    this.updateManager = new $rdf.UpdateManager(this.store);
    this.getSession();
  }

  /**
   * Fetches the session from Solid, and store results in localStorage
   */
  getSession = async() => {
    this.session = await solid.auth.currentSession(localStorage);
  }

  /**
   * Method that will save via RDF in the folder specified by parameter, the chat specified by parameter.
   * 
   * @param folderUri Uri of the folder where you will save the chat. Example: https://yourpod.solid.community/private/
   * @param newChatChannel Chat channel to be saved on the POD (the chat id will be used for the URL, so it must be unique)
   */
  async saveNewChatChannel(folderUri: String, newChatChannel: ChatChannel) {
    let chatUri = folderUri + newChatChannel.id;
    let channel = this.store.sym(chatUri);

    this.store.add(channel, TYPE(), MEE("LongChat"), channel.doc());
    this.store.add(channel, DC("title"), newChatChannel.title, channel.doc());
    this.store.add(channel, DC("created"), newChatChannel.created, channel.doc());
    newChatChannel.participants.forEach(element => {
      let part = this.store.sym(element.webId);
      this.store.add(channel, FLOW("participation"), part, channel.doc());
    });
    this.store.add(channel, DC("group"), (newChatChannel.group)? this.store.sym(newChatChannel.group) : "", channel.doc());

    await this.fetcher.putBack(channel);
  }

  /**
   * Adds a message via RDF to the chat channel specified by parameter via its URI.
   * Returns the URI assigned to the message.
   * 
   * @param chatUri Uri of the chat channel where the message will be saved. Example: https://yourpod.solid.community/private/aaaaa-bbbbb-ccccc
   * @param msg Message to be added to the chat channel.
   */
  async saveMessage(chatUri: String, message: Message): Promise<string> {
    let msgUri = await this.generateUniqueUrlForResource(chatUri + "#");
    try {
      let msg = this.store.sym(msgUri);

      this.store.add(msg, TERMS("created"), message.sendTime, msg.doc());
      this.store.add(msg, FOAF("maker"), message.makerWebId, msg.doc());
      this.store.add(msg, SIOC("content"), message.message, msg.doc());
      this.store.add(msg, DC("status"), message.status, msg.doc());

      await this.fetcher.putBack(msg);
      console.log("Message saved! (" + msgUri + ")");
      return msgUri;
    } catch (err) {
      console.error("An error occurred while saving the message (" + msgUri + ")");
    }
  }

  /**
   * Update the status of the messages in the POD to READ.
   * 
   * @param msgsUris List of messages. Example: https://yourpod.solid.community/private/aaaaa-bbbbb-ccccc#aaaaa-bbbbb-ccccc
   */
  async updateMessageToRead(msgsUris: string[]) {
    let ins = [];
    let del = [];

    msgsUris.forEach(msgUri => { 
      let msg = this.store.sym(msgUri);
      ins.push($rdf.st(msg, DC("status"), Message.Status.READ, msg.doc()))
      del.push($rdf.st(msg, DC("status"), Message.Status.PENDING, msg.doc()));
    });
      
    this.updateManager.update(del, ins, (uri, ok, message) => {
      if (ok) console.log('Messages marked as read successfully!');
      else console.error("An error occurred when marking the messages as read.")
    });
  }
  
  /**
   * Create a new chat group. Returns its URI if it was created correctly, NULL otherwise.
   * 
   * @param folderGroupUri Folder where the group files are stored. Example: /private/dechat_groups
   * @param makerWebId WebId of the group creator.
   * @param title Name of the group.
   */
  public async addNewChatGroupToFile(folderGroupUri: string, makerWebId: string, title: string): Promise<string> {
    console.log("Creating a group...");
    
    let participant = this.store.sym(makerWebId);
    let fileGroup = await this.generateUniqueUrlForResource(folderGroupUri + "/");

    let group = this.store.sym(fileGroup);
    this.store.add(group, TYPE(), MEE("ChatGroup"), group.doc());
    this.store.add(group, DC("title"), title, group.doc());
    this.store.add(group, FLOW("participation"), participant, group.doc());
    await this.fetcher.putBack(group);

    // Create the file .acl (permissions) and assign the Owner (makerWebId)
    await this.updateFile(fileGroup + ".acl", "");
    await this.addOwnerToACL(fileGroup, participant);

    return fileGroup;
  }

  /**
   * Add a new participant to the chat group specified by parameter, if the group does not exist 
   * or the participant already belongs to the group, nothing is done.
   * 
   * @param groupFileUri Uri from the group file.
   * @param newParticipant WebId of the new participant to add to the group.
   */
  public async addParticipantToGroup(groupFileUri: string, newParticipant: string) {
    console.log("Adding a participant to the group...");

    let participant = this.store.sym(newParticipant);
    let group = this.store.sym(groupFileUri.toString());
    
    await this.fetcher.load(group.doc()).then(async res => {
      let d = await this.store.each(null, FLOW("participation"), null, group.doc());
      let w = await this.store.each(null, FLOW("participation"), participant, group.doc());

      // If it contains "participation" we assume that it is a valid chat group
      // If it does not already contain the participant, we add it
      if (d.length != 0 && w.length == 0) {
        let ins = $rdf.st(group, FLOW("participation"), participant, group.doc());
        let del = [];
        
        this.updateManager.update(del, ins, (uri, ok, message) => {
          if (ok) console.log('Participant added to the group successfully!');
          else console.error("An error occurred when trying to add the participant to the group.")
        });

        // Assign permits to the new participant
        this.addOwnerToACL(groupFileUri.toString(), participant);
      } else {
        console.error("Invalid group or participant already exists")
      }
    });
  }

  /**
   * Remove a participant from the chat group specified by parameter and its permissions on the chat group.
   * 
   * @param groupFileUri Uri from the group file.
   * @param oldParticipant WebId of the new participant to be removed from the group.
   */
  public async removeParticipantFromGroup(groupFileUri: string, oldParticipant: string) {
    console.log("Removing participant from the group...");
    
    let participant = this.store.sym(oldParticipant);
    // Remove Group Participant
    let group = this.store.sym(groupFileUri.toString());
    await this.fetcher.load(group.doc()).then(res => {
      let ins = [];
      let del = $rdf.st(group, FLOW("participation"), participant, group.doc());
      
      this.updateManager.update(del, ins, (uri, ok, message) => {
        if (ok) console.log('Participant successfully deleted!');
        else console.error("An error occurred when deleting the participant from the group.")
      });
    });

    // Remove participant permissions on the group
    let groupPermissions = this.store.sym(groupFileUri.toString() + ".acl");
    
    await this.fetcher.load(groupPermissions.doc()).then(async res => {
      let uri = await this.store.match(null, ACL("agent"), participant, groupPermissions.doc()).map(st => { return (st.subject.value); });
      uri = this.store.sym(uri[0]);

      let ins = [];
      let del = this.store.statementsMatching(uri, null, null, groupPermissions.doc());

      this.updateManager.update(del, ins, (uri, ok, message) => {
        if (ok) console.log('Participant permissions successfully removed!');
        else console.error("An error occurred when deleting group participant permissions.")
      });
    });
  }

  /**
   * Returns all participants of a chat group.
   * 
   * @param groupFileUri Uri from the group file.
   */
  public async getGroupChatParticipants(groupFileUri: string): Promise<Participant[]> {
    let participants: Participant[] = new Array();
    let group = this.store.sym(groupFileUri.toString());

    let promises = this.fetcher.load(group.doc()).then(res => {
      return Promise.all(this.store.match(group, FLOW("participation"), null, group.doc()).map(async st => {
        return this.loadParticipantData(st.object.value.toString());
      }));
    });

    // Save the participants in an array
    await promises.then(parts => { parts.forEach(part => { participants.push(part); })});

    // Return the array of participants (they are promises)
    return participants;
  }

  /**
   * Returns the title of a chat group.
   * 
   * @param groupFileUri Uri from the group file.
   */
  public async getChatGroupTitle(groupFileUri: string): Promise<string> {
    let group = this.store.sym(groupFileUri.toString());

    let promise = this.fetcher.load(group.doc()).then(res => {
      return Promise.all(this.store.match(group, DC("title"), null, group.doc()).map(async st => {
        return st.object.value.toString();
      }));
    });

    return (await promise.then(title => { return title })).toString();
  }

  /**
   * Method that obtains the messages in json received in the specified inbox,
   * once obtained deletes them from the inbox.
   * 
   * Returns an array with the messages retrieved from the Inbox.
   * 
   * << METHOD TO BE MODIFIED >>
   * 
   * @param inboxUri Inbox Folder Uri.
   */
  public async getInboxMessages(inboxUri: string): Promise<any[]> {
    let messages: Message[] = new Array();
    let fileUri = this.store.sym(inboxUri);
        
    let promises = this.fetcher.load(fileUri.doc()).then(async response => {
      return Promise.all(this.store.match(null, RDF('type'), null, fileUri.doc()).map(async st => {
        // Verify that it is JSONLD
        if (st.object.value == JSONLD_CONTENT_TYPE) {
          let jsonld = await this.readFile(st.subject.value); // st.subject.value -> jsonld URL
          try {
            let jsonMessage: any = JSON.parse(jsonld);
            // Verify that it is a valid message
            if (jsonMessage.makerWebId && jsonMessage.message && jsonMessage.sendTime) {
              this.deleteFile(st.subject.value);
              return jsonMessage;
            }
          } catch (err) {
            console.error("The message does not have the correct structure. (" + st.subject.value + ")");
          }
        }
      }));
    });

    // Save the messages in an array
    await promises.then(msgs => { msgs.forEach(msg => { messages.push(msg); })});

    // Return the array of messages (they are promises)
    // The array can contain "undefined" objects, so we remove them.
    return messages.filter(msg => { return msg != undefined });
  }

  /**
   * Method for retrieving chat channels stored on the POD.
   * Returns an array with the chat channels.
   * (The method will sort the messages of each chat channel according to the sending date)
   * 
   * @param chatChannelsFolderUri Uri of the folder where the chat channels are stored.
   * Example: https://yourpod.solid.community/private/dechat_es6b/
   */
  public async loadChatChannels(chatChannelsFolderUri: string): Promise<ChatChannel[]> {
    let chatChannels: ChatChannel[] = new Array();
    let chatFolder = this.store.sym(chatChannelsFolderUri);

    let promises = this.fetcher.load(chatFolder.doc()).then(response => {
      // get the chat channels
      return Promise.all(this.store.match(chatFolder, LDP('contains'), null, chatFolder.doc()).map(async st => {
        let fileUri = this.store.sym(st.object.value); // st.object.value -> Channel URI
        
        // get the data from the chat channel
        return this.fetcher.load(fileUri.doc()).then(async response => {
          var d = await this.store.each(null, TYPE(), MEE("LongChat"), fileUri.doc()); 
          // check that it's a valid chat channel
          if (d.length != 0) {
            let id = st.object.value.split('/').pop();
            let title = this.store.match(fileUri, DC("title"), null, fileUri.doc()).map(st => { return (st.object.value) });
            let created = this.store.match(fileUri, DC("created"), null, fileUri.doc()).map(st => { return (st.object.value) });
            let group = await this.store.match(fileUri, DC("group"), null, fileUri.doc()).map(st => { return (st.object.value) });

            // "FETCH" all group chat participants
            if (group && group.toString().trim().length > 0) {
              let participants = await this.getGroupChatParticipants(group.toString());
              participants.forEach(async p => { await this.fetchNewParticipant(p.webId.toString()) });
            }
            
            // get participants and messages from the chat channel
            let messages = await this.getMessagesChatChannel(st.object.value);
            let participants = await this.getParticipantsChatChannel(st.object.value);

            // return the chat channel with the data obtained
            return new ChatChannel(id, title, group.toString(), new Date(created), messages, participants);
          } else {
            console.error(st.object.value + " is not a valid chat channel");
          }
        });
      }));
    });

    // save the chat channels in an array
    await promises.then(channels => { channels.forEach(channel => { chatChannels.push(channel) })});

    // return the array of chat channels (they are promises)
    return chatChannels.filter(channel => { return channel != undefined });
  }

  /**
   * Method to obtain the data of all the participants of a chat channel.
   * Returns an array with the participants.
   * 
   * @param chatChannelUri Chat channel file Uri.
   */
  public async getParticipantsChatChannel(chatChannelUri: string): Promise<Participant[]> {
    let participants: Participant[] = new Array();
    let fileUri = this.store.sym(chatChannelUri);

    let promises = this.fetcher.load(fileUri.doc()).then(res => {
      return Promise.all(this.store.match(fileUri, FLOW("participation"), null, fileUri.doc()).map(async st => {
        let me = this.store.sym(st.object.value.toString());

        await this.fetchNewParticipant(st.object.value.toString());

        return this.fetcher.load(me.doc()).then(res => {
          let nameFN = this.store.match(me, VCARD("fn"), null, me.doc()).map(st => { return (st.object.value) });
          let nameNAME = this.store.match(me, FOAF("name"), null, me.doc()).map(st => { return (st.object.value) });
          let imageURL = this.store.match(me, VCARD("hasPhoto"), null, me.doc()).map(st => { return (st.object.value) });
          let selectedName = (nameFN != undefined && nameFN.length != 0)? nameFN.toString() : nameNAME.toString();
          let selectedImageURL = (imageURL.length > 0)? imageURL[0].toString() : ""; // Select the first image (if any)
          return new Participant(st.object.value.toString(), selectedImageURL.toString(), selectedName.toString());
        });
      }));
    });

    // save the participants in an array
    await promises.then(parts => { parts.forEach(part => { participants.push(part) })});

    // return the array of participants (they are promises)
    return participants;
  }

  /**
   * Method for obtaining the data of all messages in a chat channel.
   * Returns an array with the messages from the chat channel.
   * 
   * @param chatChannelUri Chat channel file Uri.
   */
  public async getMessagesChatChannel(chatChannelUri: string): Promise<Message[]> {
    let messages: Message[] = new Array();
    let fileUri = this.store.sym(chatChannelUri);

    let promises = this.fetcher.load(fileUri.doc()).then(res => {
       return Promise.all(this.store.match(null, SIOC("content"), null, fileUri.doc()).map(async st => {
        let messageUri = this.store.sym(st.subject.value);
        let messageId = st.subject.value.split('#').pop();

        return this.fetcher.load(messageUri.doc()).then(res => {
          let msgCreated = this.store.match(messageUri, TERMS("created"), null, messageUri.doc()).map(st => { return (st.object.value) });
          let msgContent = this.store.match(messageUri, SIOC("content"), null, messageUri.doc()).map(st => { return (st.object.value) });
          let msgMaker = this.store.match(messageUri, FOAF("maker"), null, messageUri.doc()).map(st => { return (st.object.value) });
          let msgStatus = this.store.match(messageUri, DC("status"), null, messageUri.doc()).map(st => { return (st.object.value) });
          return new Message(msgMaker.toString(), msgContent.toString(), new Date(msgCreated), messageId, msgStatus.toString());
        });
      }));
    });

    // save the messages in an array
    await promises.then(msgs => { msgs.forEach(msg => { messages.push(msg); })});

    // order the messages of the chat channel (they arrive in a disordered way)
    messages.sort(function(a, b) { return  +new Date(a.sendTime) - +new Date(b.sendTime) });

    // return the array of messages (they are promises)
    return messages;
  }

  /**
   * Method for assigning owner permissions to a file (Read, Write and Control).
   * 
   * '@prefix  acl:     <http://www.w3.org/ns/auth/acl#>.\n'+
   *     
   *     '<#owner>\n'+
   *     'a                  acl:Authorization;\n'+
   *     'acl:agent          <'+ownerWebId+'>;\n'+
   *     'acl:accessTo       <'+fileURI+'>;\n'+
   *     'acl:defaultForNew  <'+fileURI+'>;\n'+
   *     'acl:mode           acl:Read, acl:Write, acl:Control.\n'+
   * 
   * @param fileURI Uri of the file to which the permissions will be assigned.
   * @param ownerWebId WebId of the user to whom the permissions will be assigned.
   */
  public async addOwnerToACL(fileURI: string, ownerWebId: string) {
    let file = this.store.sym(fileURI);
    let owner = this.store.sym(ownerWebId);

    let uniqueUri = await this.generateUniqueUrlForResource(fileURI + ".acl#owner");
    let aclFile = this.store.sym(uniqueUri);

    await this.fetcher.load(aclFile.doc()).then(response => {
      let ins = [];
      ins.push($rdf.st(aclFile, TYPE(), ACL("Authorization"), aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("agent"), owner, aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("accessTo"), file, aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("defaultForNew"), file, aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("mode"), ACL("Read"), aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("mode"), ACL("Write"), aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("mode"), ACL("Control"), aclFile.doc()));

      let del = [];
      
      this.updateManager.update(del, ins, (uri, ok, message) => {
        if (ok) console.log('Read-Write-Control permissions successfully added!');
        else console.error("An error occurred when adding Read-Write-Control permissions.")
      });
    });
  }

  /**
   * Method to add reading permissions to a file.
   * 
   * '<#reader>\n'+
   *     'a                  acl:Authorization;\n'+
   *     'acl:agent          <'+otherWebId+'>;\n'+
   *     'acl:accessTo       <'+fileURI+'>;\n'+
   *     'acl:defaultForNew  <'+fileURI+'>;\n'+
   *     'acl:mode           acl:Read.'
   * 
   * @param fileURI Uri of the file to which the permissions will be assigned.
   * @param otherWebId WebId of the user to whom the permissions will be assigned.
   */
  public async addReaderToACL(fileURI: string, otherWebId: string) {
    let file = this.store.sym(fileURI);
    let other = this.store.sym(otherWebId);

    let uniqueUri = await this.generateUniqueUrlForResource(fileURI + ".acl#reader");
    let aclFile = this.store.sym(uniqueUri);

    await this.fetcher.load(aclFile.doc()).then(response => {
      let ins = [];
      ins.push($rdf.st(aclFile, TYPE(), ACL("Authorization"), aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("agent"), other, aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("accessTo"), file, aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("defaultForNew"), file, aclFile.doc()));
      ins.push($rdf.st(aclFile, ACL("mode"), ACL("Read"), aclFile.doc()));

      let del = [];
      
      this.updateManager.update(del, ins, (uri, ok, message) => {
        if (ok) console.log('Reading permissions added successfully!');
        else console.error("An error occurred when adding the read permissions.")
      });
    });
  }

  /**
   * Returns the name of the WebId specified by parameter.
   * If it exists, it returns VCARD("fn"), otherwise FOAF("name").
   * 
   * @param webid WebId from which you want to get the name.
   */
  async getVCardName(webid: string): Promise<string> {
    let me = this.store.sym(webid);
    let name = "";

    await this.fetcher.load(me.doc()).then(response => {
      let nameFN = this.store.match(me, VCARD("fn"), null, me.doc()).map(st => { return (st.object.value) });
      let nameNAME = this.store.match(me, FOAF("name"), null, me.doc()).map(st => { return (st.object.value) });
      name = (nameFN != undefined && nameFN.length != 0)? nameFN.toString() : nameNAME.toString();
    });

    return name;
  }

  /**
   * Returns the url of the WebId image specified by parameter. If it does not have an image, it returns an empty string.
   * 
   * @param webid WebId from which you want to obtain the url of the image.
   */
  async getVCardImage(webid: string): Promise<string> {
    let me = this.store.sym(webid);
    let image = "";
    
    await this.fetcher.load(me.doc()).then(response => {
      let imageURL = this.store.match(me, VCARD("hasPhoto"), null, me.doc()).map(st => { return (st.object.value) });
      image = (imageURL.length > 0)? imageURL[0].toString() : ""; // Select the first image (if any)
    });

    return image;
  }

  /**
   * Loads the data of the WebId specified by parameter. Returns the participant.
   * 
   * @param webid WebId of the participant from whom you want to obtain the data.
   */
  async loadParticipantData(webid: string): Promise<Participant> {
    try {
      let imageURL = await this.getVCardImage(webid);
      let name = await this.getVCardName(webid);
      return new Participant(webid, imageURL, name);
    } catch (err) { console.error("An error occurred when loading the participant: " + err); }
  }

  /**
   * Returns the WebId of the current session.
   */
  async getWebId(): Promise<string> {
    if (!this.session) {
      await this.getSession();
    }

    return this.session.webId;
  }


  /******************************* SOLID-FILE-CLIENT METHODS ********************************/

  /**
   * Creates in the POD, in the url specified by parameter, a file with the specified content and type of content (optional).
   * 
   * @param newFile Uri of the fichero to create. Example: https://yourpod.solid.community/private/newFile.txt
   * @param content Contents of the file.
   * @param contentType Type of content of the file.
   */
  async createFile(newFile, content?, contentType?): Promise<string> {
    return fileClient.createFile(newFile, content, contentType)
        .then( fileCreated => { console.log(`Created file ${fileCreated}.`); return(fileCreated) }, err => console.log(err) );
  }

  /**
   * Returns the contents of the POD file specified by parameter.
   *
   * @param file Uri of the file to read.
   */
  async readFile(file) {
    return fileClient.readFile(file).then(body => { return(body) }, err => console.log(err) );
  }

  /**
   * Updates in the POD the file specified by parameter with the new content. If the file does not exist, it creates it.
   *
   * @param url Uri of the file to be updated.
   * @param newContent New file content.
   * @param contentType File type of the new content.
   */
  async updateFile(url, newContent, contentType?: string) {
    await fileClient.updateFile( url, newContent, contentType )
        .then( success => { console.log( `Updated ${url}.`) }, err => console.log(err) );
  }

  /**
   * Deletes the file specified by parameter from the POD.
   *
   * @param url Uri of the file to be deleted.
   */
  async deleteFile(url) {
    await fileClient.deleteFile(url)
        .then(success => { console.log(`Deleted ${url}.`); }, err => console.log(err) );
  }

  /**
   * Copies the specified file to the specified destination path.
   * URL SOURCE FILE ---> URL DESTINATION FILE
   *
   * @param oldFile Uri of the source file.
   * @param newFile  Uri of the destination file.
   */
  async copyFile(oldFile,newFile) {
    fileClient.readFile(oldFile).then( content => {
      fileClient.createFile(newFile,content).then( res => {
        return(res);
      }, err => {throw new Error("copy upload error  "+err)});
    }, err => {throw new Error("copy download error  "+err)});
  }

  /**
   * Creates a new folder on the POD in the specified url.
   *
   * @param url Uri from the new folder. Example: https://yourpod.solid.community/newFolder
   */
  async createFolder(url: string) {
    await fileClient.createFolder(url)
        .then(success => { console.log(`Created folder ${url}.`); }, err => console.log(err) );
  }

  /**
   * Returns the contents of a POD folder:
   * 
   * {
          type : "folder",
          name : // folder name (without path),
           url : // full URL of the resource,
      modified : // dcterms:modified date
         mtime : // stat:mtime
          size : // stat:size
        parent : // parentFolder or undef if none,
       content : // raw content of the folder's turtle representation,
         files : // an array of files in the folder
       folders : // an array of sub-folders in the folder,
      }
   *
   * @param url
   */
  async readFolder(url) {
    return fileClient.readFolder(url).then(folder => { return(folder) }, err => console.log(err) );
  }

  /**
   * Closes the current session.
   */
  async logout() {
    await fileClient.logout().then( console.log( `Bye now!` ), err => console.log(err) );
  }

  /**
   *
   */
  async fetch(url) {
    fileClient.fetch(url).then( results => {
      // do something with results
    }, err => {} ); // console.log(err) );
  }

  /***************************************************************/

  
  /**
   * Generates a unique URL for a resource. Concatena to the URL passed by parameter a random code, forming a unique URL.
   * Returns a unique URL.
   * 
   * @param baseurl Base URL from which the unique URL will be generated.
   */
  async generateUniqueUrlForResource(baseurl): Promise<string> {
    if (!this.session) {
      await this.getSession();
    }

    try {
      let storeG = $rdf.graph();
      let timeout = 5000; // 5000 ms timeout
      let fetcherG = new $rdf.Fetcher(storeG, timeout);
      let url = storeG.sym(baseurl + uuid.v4());

      fetcherG.load(url.doc()).then(async response => {
        var d = await storeG.each(url);

        // Check if there are triples in the generated URL, if there are any we generate 
        // a new one and check again if it is free
        while (d.length != 0) {
          url = storeG.sym(baseurl + '#' + uuid.v4());
          d = await storeG.each(url);
        }
      }, err => {
        console.error("Load failed " +  err);
      });

      return url["value"];
    } catch (err) {
      console.error("An error occurred when generating the unique URL: " +  err);
    }
  }
  
  /**
   * Method that returns a user's contact list.
   */
  getFriends = async (list: { username: string; id: string }[]) => {
    if (!this.session) {
        await this.getSession();
    }
    try {
        var store = $rdf.graph();
        var timeout = 5000; // 5000 ms timeout
        var fetcher = new $rdf.Fetcher(store, timeout);

        let url = this.session.webId;

        fetcher.nowOrWhenFetched(url, async function (ok, body, xhr) {
            if (!ok) {
                console.log('Error getting the data');
            } else {
                const subject = $rdf.sym(url);
                const friends = await store.each(subject, FOAF('knows'));
                await friends.forEach(async (friend) => {
                    await fetcher.load(friend);
                    const webId = friend.value;
                    const nameNode = await store.any(friend, FOAF('name'));
                    let fullName = '';
                    if (nameNode == null || typeof (nameNode) === 'undefined') {
                        fullName = (webId.split('://')[1]).split('.')[0];
                    } else {
                        fullName = nameNode.value;
                    }

                    await list.push({username: fullName + '', id: webId});
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
  };

  /*******************************************************************************
   * (Temporary) solution for accessing files from a provider other than the 
   * account you logged in with.
   * 
   * Used in:
   *  - loadChatChannels() [rdf.service.ts]
   *  - getParticipantsChatChannel() [rdf.service.ts]
   *  - processGroupMessage() [chat.service.ts]
  ********************************************************************************/
  fetcheatedParticipants = [];
  async fetchNewParticipant(webid: string) {
    if (!this.fetcheatedParticipants.includes(webid)) {
      this.fetcheatedParticipants.push(webid);
      this.store.sym(webid);
      // let uri = webid.match(this.chatUtils.regexUrlDomain)[0];
      // await fileClient.fetch(uri).then( results => {}, err => {} );
    }
  }

}