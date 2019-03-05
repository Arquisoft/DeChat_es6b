import { Injectable } from '@angular/core';
import { SolidSession } from '../models/solid-session.model';
import { RdfService } from '../services/rdf.service';
import { AuthService } from '../services/solid.auth.service';
import { SolidProfile } from '../models/solid-profile.model';
import { ChatChannel } from '../models/chat-channel.model';
import { Message } from '../models/message.model';

import * as fileClient from "solid-file-client";
import { getBodyNode } from '@angular/animations/browser/src/render/shared';
import { IfStmt } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private rdf: RdfService, private auth: AuthService, ) { 
    this.checkDeChatFolder();
  }




  /**
   * Crea la carpeta para almacenar los canales de chat si no está creada
   */
  async checkDeChatFolder() {
    // Obtenemos el WebId base para las rutas
    var uri = await this.getWebIdBase();

    // Si no esta creada la carpeta para almacenar los canales de chat la creamos
    var checkFolder = await this.readFolder(uri + "/private/dechat_es6b");
    if (checkFolder === undefined) {
      this.createFolder(uri + "/private/dechat_es6b");
    }
  }

  /**
   * Example result: https://yourpod.solid.community/
   */
  async getWebIdBase(): Promise<string> {
    var s = await fileClient.checkSession().then( session => { return(session.webId) }, err => console.log(err) );
    return s.replace("/profile/card#me", "");
  }  

  /**
   * Guarda el mensaje en el objeto chat, actualiza el chat en el POD propio y envía el mensaje al Inbox de la url de destino
   * 
   * @param urlInboxDestination Example: https://yourpod.solid.community/inbox/
   * @param chatChannel 
   * @param msg 
   */
  async sendMessage(urlInboxDestination: string, chatChannel: ChatChannel, msg: Message) {
    // Guardamos mensaje
    chatChannel.messages.push(msg);

    // Actualizamos chat en POD propio
    var uri = await this.getWebIdBase();
    let newChatChannel = JSON.stringify(chatChannel);
    this.updateFile(uri+"/private/dechat_es6b/"+chatChannel.id+".jsonld", newChatChannel);

    // Enviamos mensaje
    let newMsg = JSON.stringify(msg);
    this.writeMessage(urlInboxDestination+"dechat_msg", newMsg, "application/ld+json");
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
