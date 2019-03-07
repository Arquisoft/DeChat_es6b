import { Injectable, Predicate } from '@angular/core';
import { SolidSession } from '../models/solid-session.model';
import { RdfService } from '../services/rdf.service';
import { AuthService } from '../services/solid.auth.service';
import { SolidProfile } from '../models/solid-profile.model';
import { ChatChannel } from '../models/chat-channel.model';
import { Message } from '../models/message.model';

import * as fileClient from "solid-file-client";
import * as uuid from 'uuid';
import { getBodyNode } from '@angular/animations/browser/src/render/shared';
import { IfStmt } from '@angular/compiler';


const CHAT_CHANNEL_CONTENT_TYPE = "application/ld+json";
const MESSAGE_CONTENT_TYPE = "application/ld+json";
const PRIVATE_CHAT_FOLDER = "/private/dechat_es6b";
const INBOX_FOLDER = "/inbox/";
const BASE_NAME_MESSAGES = "dechat_msg";
const PROFILE_CARD_FOLDER = "/profile/card#me";
const MESSAGE_FILE_FORMAT = "jsonld";


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatChannels: ChatChannel[] = new Array();
  uri: string;

  constructor(private rdf: RdfService, private auth: AuthService, ) { 
    this.startChat();
  }

  async startChat() {
    this.uri = await this.getWebIdBase();
    await this.checkDeChatFolder();
    await this.loadChatChannels();

    // Comprobar Inbox cada x tiempo
    setInterval(async () => {
      await this.checkInbox();
    } , 1500);
  }

  /**
   * Crea la carpeta para almacenar los canales de chat si no está creada
   */
  async checkDeChatFolder() {
    // Si no esta creada la carpeta para almacenar los canales de chat la creamos
    let checkFolder = await this.readFolder(this.uri + PRIVATE_CHAT_FOLDER);
    if (checkFolder === undefined) {
      this.createFolder(this.uri + PRIVATE_CHAT_FOLDER);
    }
  }

  /**
   * 
   */
  async loadChatChannels() {
    let folderContent = await this.readFolder(this.uri + PRIVATE_CHAT_FOLDER);

    console.log("Loading chat channels...");
    for (const file of folderContent.files) {
      let channelJsonld = await this.readMessage(file.url);
      let channel:ChatChannel = JSON.parse(channelJsonld);
      this.chatChannels.push(channel);
    }
  }

  /**
   * Example result: https://yourpod.solid.community
   */
  async getWebIdBase(): Promise<string> {
    let s = await fileClient.checkSession().then( session => { return(session.webId) }, err => console.log(err) );
    return s.replace(PROFILE_CARD_FOLDER, "");
  }  

  /**
   * Guarda el mensaje en el objeto chat, actualiza el chat en el POD propio y envía el mensaje al Inbox de los participantes del chat
   * 
   * @param chatChannel 
   * @param msg 
   */
  async sendMessage(chatChannel: ChatChannel, msg: Message) {
    if (this.chatChannels.includes(chatChannel)) {
      // Guardamos el mensaje
      msg.makerWebId = this.uri;
      chatChannel.messages.push(msg);

      // Actualizamos chat en POD propio
      this.updateFile(this.uri + PRIVATE_CHAT_FOLDER + "/" + chatChannel.id + "." + MESSAGE_FILE_FORMAT, JSON.stringify(chatChannel));

      // Enviamos el mensaje a todos los participantes del chat
      let newMsg = JSON.stringify(msg);
      chatChannel.participants.forEach(participant => {  // <<En este momento solo está implementado para cada persona distinta un chat distinto>>
        this.writeMessage(participant + INBOX_FOLDER + BASE_NAME_MESSAGES, newMsg, MESSAGE_CONTENT_TYPE);
      });
    }
  }

  /**
   * Busca nuevas notificaciones de mensajes en el inbox propio
   */
  async checkInbox() {
    let folderContent = await this.readFolder(this.uri + INBOX_FOLDER);

    console.log("Checking inbox...");
    for (const file of folderContent.files) {
      if (file.type == MESSAGE_CONTENT_TYPE && file.label.includes(BASE_NAME_MESSAGES)) {
        await this.processNewMessage(file.url);
        await this.deleteFile(file.url);
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
    let jsonld = await this.readMessage(urlFile);
    let newMessage:Message = JSON.parse(jsonld);

    // Añadimos el mensaje al canal correspondiente si ya existe
    let channel:ChatChannel = this.searchChatChannelByParticipantWebid(newMessage.makerWebId);
    if (channel != null) {
      channel.messages.push(newMessage);

      // Actualizamos chat en POD propio
      this.updateFile(this.uri + PRIVATE_CHAT_FOLDER + "/" + channel.id + "." + MESSAGE_FILE_FORMAT, JSON.stringify(channel));
    } else {
      // Si no hay canal asociado creamos uno
      let newChatChannel = new ChatChannel(this.getUniqueChatChannelID(), "Prueba_chat_inbox");
      newChatChannel.participants.push(newMessage.makerWebId);
      newChatChannel.messages.push(newMessage);
      this.chatChannels.push(newChatChannel);

      // Añadimos chat a POD propio
      this.writeMessage(this.uri + PRIVATE_CHAT_FOLDER + "/" + newChatChannel.id, JSON.stringify(newChatChannel), CHAT_CHANNEL_CONTENT_TYPE);
    }
  }

  /**
   * 
   * @param webId 
   * @param title 
   */
  public async createNewChatChannel(webId: string, title?: string, message?: Message): Promise<ChatChannel> {
    let channel:ChatChannel = this.searchChatChannelByParticipantWebid(webId);
    
    if (channel === null) {
      title = (title === undefined)? "Prueba_chat_inbox" : title;

      let newChatChannel = new ChatChannel(this.getUniqueChatChannelID(), title);
      if (message != undefined) { newChatChannel.messages.push(message); }
      newChatChannel.participants.push(webId);

      this.chatChannels.push(newChatChannel);
      this.writeMessage(this.uri + PRIVATE_CHAT_FOLDER + "/" + newChatChannel.id, JSON.stringify(newChatChannel), CHAT_CHANNEL_CONTENT_TYPE);

      return newChatChannel;
    }

    return null;
  }

  /**
   * <<MÉTODO SOLO VÁLIDO PARA CHATS INDIVIDUALES - ADAPTAR PARA IMPLEMENTACIÓN DE CHATS GRUPALES>>
   * 
   * @param webId 
   */
  public searchChatChannelByParticipantWebid(webId: string): ChatChannel {
    for (const channel of this.chatChannels) {
      if (channel.participants.includes(webId)) {
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






  /***************************************************************/

  /**
   * Crea un fichero vacío
   * 
   * @param newFile 
   */
  async writeMessage(newFile, content?, contentType?) {
    fileClient.createFile(newFile, content, contentType).then( fileCreated => {
      console.log(`Created file ${fileCreated}.`);
    }, err => console.log(err) );
  }

  /**
   * 
   * @param file 
   */
  async readMessage(file) {
    return fileClient.readFile(file).then(body => { return(body) }, err => console.log(err) );
  }

  /**
   * 
   * @param url 
   * @param newContent 
   * @param contentType 
   */
  async updateFile(url, newContent, contentType?: string) {
    fileClient.updateFile( url, newContent, contentType ).then( success => { console.log( `Updated ${url}.`) }, err => console.log(err) );
  }

  /**
   * 
   * @param url 
   */
  async deleteFile(url) {
    fileClient.deleteFile(url).then(success => {
      console.log(`Deleted ${url}.`);
    }, err => console.log(err) );
  }

  /**
   * URL FICHERO ORIGEN ---> URL FICHERO DESTINO
   * 
   * @param oldFile 
   * @param newFile 
   */
  async copyFile(oldFile,newFile) {
    fileClient.readFile(oldFile).then( content => {
      fileClient.createFile(newFile,content).then( res => {
            return(res);
        }, err => {throw new Error("copy upload error  "+err)});
    }, err => {throw new Error("copy download error  "+err)});
  }

  /**
   * 
   * @param url 
   */
  async createFolder(url: string) {
    fileClient.createFolder(url).then(success => {
      console.log(`Created folder ${url}.`);
    }, err => console.log(err) );
  }

  /**
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

}
