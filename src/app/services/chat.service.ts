import { Injectable } from '@angular/core';
import { RdfService } from '../services/rdf.service';
import { ChatChannel } from '../models/chat-channel.model';
import { Message } from '../models/message.model';

import * as uuid from 'uuid';


const CHAT_CHANNEL_CONTENT_TYPE = 'application/ld+json';
const MESSAGE_CONTENT_TYPE = 'application/ld+json';
const PRIVATE_FOLDER = '/private';
const PRIVATE_CHAT_FOLDER = '/private/dechat_es6b';
const INBOX_FOLDER = '/inbox/';
const BASE_NAME_MESSAGES = 'dechat_msg';
const PROFILE_CARD_FOLDER = '/profile/card#me';
const MESSAGE_FILE_FORMAT = 'jsonld';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatChannels: ChatChannel[] = new Array();
  uri: string;
  webid: string

  constructor(private rdf: RdfService ) {
    // this.startChat();
  }

  /**
   * Método para iniciar la ejecución del chat
   */
  public async startChat() {
    this.webid = await this.rdf.getWebId();
    this.uri = this.webid.replace(PROFILE_CARD_FOLDER, "");

    await this.checkPrivateFolder()
      .then(async () => { await this.checkDeChatFolder() })
      .then(async () => { await this.loadChatChannels() })
      .then(async () => { await this.checkInbox() });

    // Abrimos WebSocket, cualquier modificación en nuestro POD provocará la ejecución de "checkInbox()"
    let updateUri = this.rdf.store.sym(this.uri + INBOX_FOLDER);
    await this.rdf.fetcher.load(updateUri.doc());
    this.rdf.updateManager.addDownstreamChangeListener(updateUri.doc(), async () => { await this.checkInbox() });
  }

  /**
   * Crea la carpeta /private
   */
  private async checkPrivateFolder() {
    // Si no esta creada la carpeta para almacenar los canales de chat la creamos
    let checkFolder = await this.rdf.readFolder(this.uri + PRIVATE_FOLDER);
    if (checkFolder === undefined) {
      console.log("The 'private' folder does not exist, creating it...");
      await this.rdf.createFolder(this.uri + PRIVATE_FOLDER);
    }
  }

  /**
   * Crea la carpeta para almacenar los canales de chat si no está creada
   */
  private async checkDeChatFolder() {
    // Si no esta creada la carpeta para almacenar los canales de chat la creamos
    let checkFolder = await this.rdf.readFolder(this.uri + PRIVATE_CHAT_FOLDER);
    if (checkFolder === undefined) {
      console.log("The 'dechat_es6b' folder does not exist, creating it...");
      await this.rdf.createFolder(this.uri + PRIVATE_CHAT_FOLDER);
    }
  }

  /**
   *
   */
  private async loadChatChannels() {
    console.log("Loading chat channels...");
    this.chatChannels = await this.rdf.loadChatChannels(this.uri + PRIVATE_CHAT_FOLDER);

    // Ordenamos los mensajes de cada canal de chat
    for (const c of this.chatChannels) {
      c.messages.sort(function(a, b) { return  +new Date(a.sendTime) - +new Date(b.sendTime) });
    }
  }

  /**
   * 
   * @param chatChannels 
   */
  setChatChannels(chatChannels: ChatChannel[]){
    this.chatChannels = chatChannels;
  }

  /**
   * 
   * @param ms 
   */
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  /**
   * 
   */
  getUri(): string {
    return this.uri;
  }

  /**
   * Guarda el mensaje en el objeto chat, actualiza el chat en el POD propio y envía el mensaje al Inbox de los participantes del chat
   *
   * @param chatChannel
   * @param msg
   */
  public async sendMessage(chatChannel: ChatChannel, msg: string) {
      // Comprobamos que el canal exista
      let channel:ChatChannel = this.searchChatChannelById(chatChannel.id);
      if (channel != null) {
        // Creamos y guardamos el mensaje
        let tmpMakerWebId = await this.rdf.getWebId();
        let message = new Message(tmpMakerWebId, msg);
        chatChannel.messages.push(message);

        // Actualizamos canal de chat en POD propio
        await this.rdf.saveMessage(this.uri + PRIVATE_CHAT_FOLDER + "/" + chatChannel.id, message);

        // Enviamos el mensaje a todos los participantes del chat
        let newMsg = JSON.stringify(message);
        chatChannel.participants.forEach(async participant => {  // << En este momento solo está implementado para cada persona distinta un chat distinto >>
          let tmpParticipant = participant.webId.toString().replace(PROFILE_CARD_FOLDER, "");
          await this.rdf.createFile(tmpParticipant + INBOX_FOLDER + BASE_NAME_MESSAGES, newMsg, MESSAGE_CONTENT_TYPE);
        });
      }
  }

  /**
   * Busca nuevas notificaciones de mensajes en el inbox propio
   */
  private async checkInbox() {
    let folderContent = await this.rdf.readFolder(this.uri + INBOX_FOLDER);

    console.log("Checking inbox...");
    for (const file of folderContent.files) {
      if (file.type == MESSAGE_CONTENT_TYPE && file.label.includes(BASE_NAME_MESSAGES)) {
        await this.processNewMessage(file.url);
        await this.rdf.deleteFile(file.url);
      }
    }
  }

  /**
   * - Si ya existe canal de chat con el participante añade el nuevo mensaje al canal existente
   * - Si no existe canal de chat con el participante crea el canal correspondiente y lo añade al nuevo canal
   *
   * @param urlFile
   */
  private async processNewMessage(urlFile: any) {
    let jsonld = await this.rdf.readFile(urlFile);
    let newMessage:Message = JSON.parse(jsonld);

    // Añadimos el mensaje al canal correspondiente si ya existe
    let channel:ChatChannel = await this.searchChatChannelByParticipantWebid(newMessage.makerWebId);
    if (channel != null) {
      channel.messages.push(newMessage);
      channel.messages.sort(function(a, b) { return  +new Date(a.sendTime) - +new Date(b.sendTime) });

       // Guardamos el mensaje en el chat en el POD propio
      await this.rdf.saveMessage(this.uri + PRIVATE_CHAT_FOLDER + "/" + channel.id, newMessage);

    } else {
      // Si no hay canal asociado creamos uno
      let newChannel = await this.createNewChatChannel(newMessage.makerWebId);
      newChannel.messages.push(newMessage);

      // Guardamos el mensaje en el chat en el POD propio
      await this.rdf.saveMessage(this.uri + PRIVATE_CHAT_FOLDER + "/" + newChannel.id, newMessage);
    }
  }

  /**
   *
   * @param ChatChannel chat
   */
  public async showChatMessages(chat: ChatChannel) {
      for (const m in chat.messages) {
        console.log(m.toString);
      }
  }

  /**
   * Método para crear nuevos canales, el nuevo canal será creado en el POD propio y añadido a la
   * lista de canales de chat.
   *
   * @param webId WebId del contacto (Example: https://yourpod.solid.community/profile/card#me)
   * @param title
   */
  public async createNewChatChannel(webId: string, title: string = "Canal de chat"): Promise<ChatChannel> {
    let channel:ChatChannel = await this.searchChatChannelByParticipantWebid(webId);
    let participant = await this.rdf.loadParticipantData(webId);

    if (channel == null && participant != undefined) {
      title = (participant.name != undefined && participant.name.length > 0)? participant.name.toString() : title;
      let newChatChannel = new ChatChannel(this.getUniqueChatChannelID(), title);

      // Añadimos el chat a la lista de chats en memoria
      newChatChannel.participants.push(participant);
      this.chatChannels.push(newChatChannel);

      // Guardamos el chat a nuestro POD
      await this.rdf.saveNewChatChannel(this.uri + PRIVATE_CHAT_FOLDER + "/", newChatChannel);

      return newChatChannel;
    }

    return null;
  }

  /**
   * <<MÉTODO SOLO VÁLIDO PARA CHATS INDIVIDUALES - ADAPTAR PARA IMPLEMENTACIÓN DE CHATS GRUPALES>>
   *
   * @param webId
   */
  public async searchChatChannelByParticipantWebid(webId: string): Promise<ChatChannel> {
    let participant = await this.rdf.loadParticipantData(webId);
    for (const channel of this.chatChannels) {
      for (const p of channel.participants) {
        if (p.webId == participant.webId) {
          return channel;
        }
      }
    }
    return null;
  }

  /**
   *
   * @param id
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
   *
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

}