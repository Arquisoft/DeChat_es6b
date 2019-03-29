import {Component, OnInit, ViewChild, AfterViewChecked, ElementRef} from '@angular/core';
import { ChatService } from '../services/chat.service';

import { ChatChannel } from '../models/chat-channel.model';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private scrollMe: ElementRef;

  defaultImage = "assets/images/default.jpg";
  selectedChatChannel: ChatChannel; 

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
      this.init();
  }

  ngAfterViewChecked() {
    this.moveChatScrollToBottom();
  }
  
  async init() {
    await this.chatService.startChat();
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
    }
  }
  
  search() {
    const inputElement: HTMLInputElement = document.getElementById('input_search') as HTMLInputElement;
    const name: string = inputElement.value;

    var newChatChannels: ChatChannel[] = new Array();
    for (let channel of this.chatService.chatChannels) {
      if ( channel.title.toString().toLowerCase() === name.toString().toLowerCase()  || channel.title.includes(name) )
        newChatChannels.push(channel);
    }
    this.chatService.setChatChannels(newChatChannels);
  }

  // Método para cargar las imágenes, en este momento, se usa la misma imagen para el canal de chat
  // y dentro del chat, es decir, la del participante (cambiar cuando se implementen los chats grupales)
  public getImagenChat(channel: ChatChannel) {
    if (channel.participants[0]) {
      return (channel.participants[0].imageURL.length > 0) ? channel.participants[0].imageURL : this.defaultImage;
    } else {
      return this.defaultImage;
    }
  }

  // Ajusta el scroll del chat a la parte inferior de este
  moveChatScrollToBottom() {
    this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
  }

}
