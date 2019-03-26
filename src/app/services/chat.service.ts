import { Injectable, Predicate } from '@angular/core';
import { SolidSession } from '../models/solid-session.model';
import { RdfService } from '../services/rdf.service';
import { AuthService } from '../services/solid.auth.service';
import { SolidProfile } from '../models/solid-profile.model';
import { ChatChannel } from '../models/chat-channel.model';
import { Message } from '../models/message.model';

import * as fileClient from 'solid-file-client';
import * as uuid from 'uuid';
import { getBodyNode } from '@angular/animations/browser/src/render/shared';
import { IfStmt } from '@angular/compiler';


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

  constructor(private rdf: RdfService, private auth: AuthService, ) {
    // this.startChat();
  }

  setChatChannels(chatChannels: ChatChannel[]){
    this.chatChannels=chatChannels;
  }

  /**
   *
   */
  async startChat() {
    this.webid = await this.getWebId();
    this.uri = this.webid.replace(PROFILE_CARD_FOLDER, "");

    await this.checkPrivateFolder()
      .then(async () => { await this.checkDeChatFolder() })
      .then(async () => { await this.loadChatChannels() });

    this.interval(async () => {
        await this.checkInbox();
    }, 1000);
  }

  /**
   * Crea la carpeta /private
   */
  async checkPrivateFolder() {
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
  async checkDeChatFolder() {
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
  async loadChatChannels() {
    console.log("Loading chat channels...");
    this.chatChannels = await this.rdf.loadChatChannels(this.uri + PRIVATE_CHAT_FOLDER);

    // Ordenamos los mensajes de cada canal de chat
    for (const c of this.chatChannels) {
      c.messages.sort(function(a, b) { return  +new Date(a.sendTime) - +new Date(b.sendTime) });
    }
  }

  /**
   * Example result: https://yourpod.solid.community
   */
  async getWebId(): Promise<string> {
    let s = await fileClient.checkSession().then( session => { return(session.webId) }, err => console.log(err) );
    return s;
  }

  /**
   * 
   * @param ms 
   */
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  getUri(): string {
    return this.uri;
  }

  /**
   * Guarda el mensaje en el objeto chat, actualiza el chat en el POD propio y envía el mensaje al Inbox de los participantes del chat
   *
   * @param chatChannel
   * @param msg
   */
  async sendMessage(chatChannel: ChatChannel, msg: string) {
      // Comprobamos que el canal exista
      let channel:ChatChannel = this.searchChatChannelById(chatChannel.id);
      if (channel != null) {
        // Creamos y guardamos el mensaje
        let tmpMakerWebId = await this.getWebId();
        let message = new Message(tmpMakerWebId, msg);
        chatChannel.messages.push(message);

        // Actualizamos canal de chat en POD propio
        await this.rdf.saveMessage(this.uri + PRIVATE_CHAT_FOLDER + "/" + chatChannel.id, message);

        // Enviamos el mensaje a todos los participantes del chat
        let newMsg = JSON.stringify(message);
        chatChannel.participants.forEach(async participant => {  // << En este momento solo está implementado para cada persona distinta un chat distinto >>
          let tmpParticipant = participant.replace(PROFILE_CARD_FOLDER, "");
          await this.rdf.createFile(tmpParticipant + INBOX_FOLDER + BASE_NAME_MESSAGES, newMsg, MESSAGE_CONTENT_TYPE);
        });
      }
  }

  /**
   * Busca nuevas notificaciones de mensajes en el inbox propio
   */
  async checkInbox() {
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
    let channel:ChatChannel = this.searchChatChannelByParticipantWebid(newMessage.makerWebId);
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
    let channel:ChatChannel = this.searchChatChannelByParticipantWebid(webId);
    let nameParticipant = await this.rdf.getVCardName(webId);

    if (channel == null) {
      title = (nameParticipant != undefined && nameParticipant.length > 0)? nameParticipant : title;
      let newChatChannel = new ChatChannel(this.getUniqueChatChannelID(), title);

      // Añadimos el chat a la lista de chats en memoria
      newChatChannel.participants.push(webId);
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
