import {Component, getModuleFactory, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgForm } from '@angular/forms';
import {SolidProfile} from '../models/solid-profile.model';
import { RdfService } from '../services/rdf.service';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/solid.auth.service';

import { ChatChannel } from '../models/chat-channel.model';
import { Message } from '../models/message.model';
import { templateJitUrl } from '@angular/compiler';
import { stringify } from 'querystring';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  defaultImage = "assets/images/default.jpg";

  selectedChatChannel: ChatChannel;
  imagesChannels = {};
  imagesParticipants = {};
  

  constructor(private rdf: RdfService, private route: ActivatedRoute, 
              private auth: AuthService, private chatService: ChatService) {
  }

  ngOnInit() {
      this.init();
  }
  
  async init() {
    await this.chatService.startChat();
    await this.setupImages();
  }

  getChatService() {
    return this.chatService;
  }

  messageTime(msg: Message): string {
    let messageTime = msg.sendTime;
    let h = messageTime.getHours();
    let m = messageTime.getMinutes();
    let s = messageTime.getSeconds();
    return h + ":" + m + ":" + s;
  }
  
  async sendMessage() {
    const inputElement: HTMLInputElement = document.getElementById('input_text') as HTMLInputElement;
    const msg: string = inputElement.value;
    this.chatService.sendMessage(this.selectedChatChannel, msg);
  }

  async emptyText() {
    let inputElement: HTMLInputElement = document.getElementById('input_text') as HTMLInputElement;
    let msg: string = inputElement.value;
    msg = "";
    inputElement.value = msg;
  }

  setSelectedChatChannel(selectedChatChannel: ChatChannel){
    this.selectedChatChannel = selectedChatChannel;
  }

  getMessagesSelectedChatChannel() {
    return (this.selectedChatChannel == undefined)? new Array() : this.selectedChatChannel.messages;
    
  }

  getLastMessage(channel: ChatChannel): Message {
    return (channel.messages[channel.messages.length-1] != undefined)? (channel.messages[channel.messages.length-1]) : null;
  }

  getLastMessageText(channel: ChatChannel): string {
    return (this.getLastMessage(channel) != null)? this.getLastMessage(channel).message : "";
  }

  /* getDayAndMonthLastMessage(channel: ChatChannel) {
    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    return (this.getLastMessage(channel) != null)? months[new Date(this.getLastMessage(channel).sendTime).getUTCMonth()]
      + " " + (new Date(this.getLastMessage(channel).sendTime).getUTCDay()+1) : "";
  } */

  getChatChannels(): ChatChannel[] {
    return this.chatService.chatChannels;
  }

  async addNewChatChannel() {
    const inputElement: HTMLInputElement = document.getElementById('input_add_webid') as HTMLInputElement;
    const webid: string = inputElement.value;
    if (webid.length > 0) {
      let channel = await this.chatService.createNewChatChannel(webid);

      // Cargamos la imagen del nuevo canal
      this.addImageToImages(channel);
    }
  }
  
  search() {
    const inputElement: HTMLInputElement = document.getElementById('input_search') as HTMLInputElement;
    const name: string = inputElement.value;

    var newChatChannels: ChatChannel[] = new Array();
    for (let channel of this.chatService.chatChannels) {
      if ( channel.title.toLowerCase() === name.toLowerCase()  || channel.title.includes(name) )
        newChatChannels.push(channel);
    }
    this.chatService.setChatChannels(newChatChannels);
  }

  // Método que carga las imágenes de los canales al inicio y las guarda en un HashMap
  async setupImages() {
    for (const channel of this.chatService.chatChannels) {
      this.addImageToImages(channel);
    }
  }

  // Método auxiliar para añadir las imágenes a los HashMap "imagesChannels" e "imagesParticipants"
  async addImageToImages(channel: ChatChannel) {
    if (channel.participants[0]) {
      let imageChannelURL = await this.rdf.getVCardImage(channel.participants[0]);
      this.imagesChannels[channel.id] = (imageChannelURL.length > 0) ? imageChannelURL : this.defaultImage;

      // Recorremos los participantes y añadimos sus imágenes a "imagesParticipants"
      for (const participant of channel.participants) {
        let imageParticipantURL = await this.rdf.getVCardImage(participant);
        this.imagesParticipants[participant] = (imageParticipantURL.length > 0) ? imageParticipantURL : this.defaultImage;
      }
    }
  }

}
