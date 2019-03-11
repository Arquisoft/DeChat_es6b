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
  waitForCheckInbox = false;

  stoppedExternally = false;
  stopExternally = () => { this.stoppedExternally = true }
  startExternally = () => { this.stoppedExternally = false }

  constructor(private rdf: RdfService, private auth: AuthService, ) { 
    //this.startChat();
  }

  /**
   * 
   */
  async startChat() {
    this.uri = await this.getWebIdBase();
    await this.checkDeChatFolder();
    await this.loadChatChannels();

    this.interval(async (i, stop) => {
      if (!this.stoppedExternally) {
        //stop();
        this.waitForCheckInbox = true;
        await this.checkInbox();
        this.waitForCheckInbox = false;
      }
    }, 1000);
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
      let channelJsonld = await this.readFile(file.url);
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
   * 
   * @param ms 
   */
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  /**
   * Guarda el mensaje en el objeto chat, actualiza el chat en el POD propio y envía el mensaje al Inbox de los participantes del chat
   * 
   * @param chatChannel 
   * @param msg 
   */
  async sendMessage(chatChannel: ChatChannel, msg: string) {
    try {
      // Detenemos la comprobación del inbox temporalmente
      this.stopExternally();

      // Comprobamos que el canal exista
      let channel:ChatChannel = this.searchChatChannelById(chatChannel.id);
      if (channel != null) {
        // Creamos y guardamos el mensaje
        let message = new Message(msg);

        message.makerWebId = this.uri;
        chatChannel.messages.push(message);

        // Si entró en el checkInbox() esperamos a que finalice para evitar problemas, 
        // ya que puede ocurrir que intentemos actualizar algo que el checkInbox() ha borrado en ese momento
        while (this.waitForCheckInbox) {
          await this.delay(300);
        }

        // Actualizamos canal de chat en POD propio
        await this.updateFile(this.uri + PRIVATE_CHAT_FOLDER + "/" + chatChannel.id + "." + MESSAGE_FILE_FORMAT, JSON.stringify(chatChannel));

        // Enviamos el mensaje a todos los participantes del chat
        let newMsg = JSON.stringify(message);
        chatChannel.participants.forEach(async participant => {  // <<En este momento solo está implementado para cada persona distinta un chat distinto>>
          await this.createFile(participant + INBOX_FOLDER + BASE_NAME_MESSAGES, newMsg, MESSAGE_CONTENT_TYPE);
        });
      }
    } finally {
      // Reanudamos la comprobación del inbox
      this.startExternally();
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
    let jsonld = await this.readFile(urlFile);
    let newMessage:Message = JSON.parse(jsonld);

    // Añadimos el mensaje al canal correspondiente si ya existe
    let channel:ChatChannel = this.searchChatChannelByParticipantWebid(newMessage.makerWebId);
    if (channel != null) {
      channel.messages.push(newMessage);
      channel.messages.sort(function(a, b) { return  +new Date(a.sendTime) - +new Date(b.sendTime) });

      // Actualizamos chat en POD propio
      await this.updateFile(this.uri + PRIVATE_CHAT_FOLDER + "/" + channel.id + "." + MESSAGE_FILE_FORMAT, JSON.stringify(channel));
    } else {
      // Si no hay canal asociado creamos uno
      let newChatChannel = new ChatChannel(this.getUniqueChatChannelID(), "Prueba_chat_inbox");
      newChatChannel.participants.push(newMessage.makerWebId);
      newChatChannel.messages.push(newMessage);
      this.chatChannels.push(newChatChannel);

      // Añadimos chat a POD propio
      await this.createFile(this.uri + PRIVATE_CHAT_FOLDER + "/" + newChatChannel.id, JSON.stringify(newChatChannel), CHAT_CHANNEL_CONTENT_TYPE);
    }
  }

  /**
   * Método destinado a permitir añadir nuevos canales de chat desde la inferfaz
   * 
   * @param webId 
   * @param title 
   */
  public async createNewChatChannel(webId: string, title?: string, message?: Message): Promise<ChatChannel> {
    let channel:ChatChannel = this.searchChatChannelByParticipantWebid(webId);

    if (channel == null) {
      title = (title == undefined)? "Prueba_chat_inbox" : title;
      let newChatChannel = new ChatChannel(this.getUniqueChatChannelID(), title);
      if (message != undefined) { newChatChannel.messages.push(message); }

      newChatChannel.participants.push(webId);
      this.chatChannels.push(newChatChannel);
      
      this.createFile(this.uri + PRIVATE_CHAT_FOLDER + "/" + newChatChannel.id, JSON.stringify(newChatChannel), CHAT_CHANNEL_CONTENT_TYPE);

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






  /***************************************************************/

  /**
   * Crea un fichero vacío
   * 
   * @param newFile 
   */
  async createFile(newFile, content?, contentType?) {
    fileClient.createFile(newFile, content, contentType)
      .then( fileCreated => { console.log(`Created file ${fileCreated}.`); }, err => console.log(err) );
  }

  /**
   * 
   * @param file 
   */
  async readFile(file) {
    return fileClient.readFile(file).then(body => { return(body) }, err => console.log(err) );
  }

  /**
   * 
   * @param url 
   * @param newContent 
   * @param contentType 
   */
  async updateFile(url, newContent, contentType?: string) {
    await fileClient.updateFile( url, newContent, contentType )
      .then( success => { console.log( `Updated ${url}.`) }, err => console.log(err) );
  }

  /**
   * 
   * @param url 
   */
  async deleteFile(url) {
    await fileClient.deleteFile(url)
      .then(success => { console.log(`Deleted ${url}.`); }, err => console.log(err) );
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
    await fileClient.createFolder(url)
      .then(success => { console.log(`Created folder ${url}.`); }, err => console.log(err) );
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




  


// ---------------------- INTERVAL-PROMISE LIBRARY ---------------------- //

    /**
   * @param {function} func - function to execute
   * @param {number|function(number):number} intervalLength - length in ms to wait before executing again
   * @param {{iterations: Infinity|number, stopOnError: boolean}} [options]
   * 
   * @returns {Promise} Promise object with no result
   */
  interval(func, intervalLength, options = {}) {    

    this.validateArgs(func, intervalLength, options)

    const defaults = {
        iterations: Infinity,
        stopOnError: true
    }
    const settings = Object.assign(defaults, options)

    return new Promise((rootPromiseResolve, rootPromiseReject) => {

        const callFunction = currentIteration => {
            
            // Set up a way to track if a "stop" was requested by the user function
            let stopRequested = false
            const stop = () => {
                stopRequested = true
            }
        
            // Set up a function to call the next iteration. This is abstracted so it can be called by .then(), or in .catch(), if options allow.
            const callNext = () => {
                // If we've hit the desired number of iterations, or stop was called, resolve the root promise and return
                if (currentIteration === settings.iterations || stopRequested) {
                    rootPromiseResolve()
                    return
                }
        
                // Otherwise, call the next iteration
                callFunction(currentIteration + 1)
            }

            // Calculate our interval length
            const calculatedIntervalLength = (typeof intervalLength === 'function') ? intervalLength(currentIteration) : intervalLength
            
            // If the interval length was calculated, validate the result
            if (typeof intervalLength === 'function') {
                if (!Number.isInteger(calculatedIntervalLength) || calculatedIntervalLength < 0) {
                    rootPromiseReject(new Error('Function for "intervalLength" argument must return a non-negative integer.'))
                    return 
                }
            }
                
            // Call the user function after the desired interval length. After, call the next iteration (and/or handle error)
            setTimeout(() => {

                const returnVal = func(currentIteration, stop)

                if (!(returnVal instanceof Promise)) {
                    rootPromiseReject(new Error('Return value of "func" must be a Promise.'))
                    return
                }

                returnVal.then(callNext).catch(err => {
                    if (!settings.stopOnError) {
                        callNext()
                        return
                    }
        
                    rootPromiseReject(err)
                })
            }, calculatedIntervalLength)
        }

        callFunction(1)        
    })
  }

  /**
  * A helper function to validate the arguments passed to interval(...)
  * 
  * @param {*} func 
  * @param {*} intervalLength 
  * @param {*} options
  */
  validateArgs(func, intervalLength, options) {

    // Validate "func"
    if (typeof func !== 'function') {
        throw new TypeError('Argument 1, "func", must be a function.')
    }

    // Validate "intervalLength"
    if (typeof intervalLength === 'number') {
        if (!Number.isInteger(intervalLength) || intervalLength < 0) {
            throw new TypeError('Argument 2, "intervalLength", must be a non-negative integer or a function that returns a non-negative integer.')
        }
    } else if (typeof intervalLength !== 'function') {
        throw new TypeError('Argument 2, "intervalLength", must be a non-negative integer or a function that returns a non-negative integer.')
    }

    // Validate options...
    if (typeof options !== 'object') {
        throw new TypeError('Argument 3, "options", must be an object.')
    }

    // Validate passed keys
    const allowedKeys = ['iterations', 'stopOnError']

    Object.keys(options).forEach(key => {
        if (!allowedKeys.includes(key)) {
            throw new TypeError('Option "' + key + '" is not a valid option.')
        }
    })
    
    // validate "iterations" option (if passed)
    if (options.hasOwnProperty('iterations')) {
        if (options.iterations !== Infinity && (!Number.isInteger(options.iterations) || options.iterations < 1)) {
            throw new TypeError('Option "iterations" must be Infinity or an integer greater than 0.')
        }
    }
    
    // validate "stopOnError" option (if passed)
    if (options.hasOwnProperty('stopOnError')) {
        if (typeof options.stopOnError !== 'boolean') {
            throw new TypeError('Option "stopOnError" must be a boolean.')
        }
    }
  }

}
