import {Component, OnInit, ViewChild, AfterViewChecked, ElementRef, OnChanges} from '@angular/core';
import { ChatService } from '../services/chat.service';
import { UtilsService } from '../services/utils.service';

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

  constructor(private chatService: ChatService, private chatUtils: UtilsService) {
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
  
  async sendMessage() {
    const inputElement: HTMLInputElement = document.getElementById('input_text') as HTMLInputElement;
    const msg: string = inputElement.value;
    this.chatService.sendMessage(this.selectedChatChannel, msg);
  }

  async emptyText() {
    let inputElement: HTMLInputElement = document.getElementById('input_text') as HTMLInputElement;
    let msg: string = "";
    inputElement.value = msg;
  }

  async sendFile(event) {
    if (this.selectedChatChannel != null) {
      const file: File = event.target.files[0];
      this.chatService.sendFile(this.selectedChatChannel, '', file);
    }
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

  getChatChannels(): ChatChannel[] {
    return this.chatService.chatChannels;
  }

  /**
   * 
   */
  async addNewChatChannel() {
    const inputElement: HTMLInputElement = document.getElementById('input_add_webid') as HTMLInputElement;
    const webid: string = inputElement.value;
    if (webid.length > 0) {
      let channel = await this.chatService.createNewChatChannel(webid);
    }
  }
  
  /**
   * Método que busca un chat según el texto introducido en el input_search en la lista de chats activos 
   * NO es sensible a mayúsculas y minúsculas
   */
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

  // Método para cargar las imágenes
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

  // Elimina un chat de la lista y del POD del usuario
  deleteChat(channel: ChatChannel) {
    const index = this.chatService.chatChannels.indexOf(channel);
    this.chatService.delete(channel); //Pod
    this.chatService.chatChannels.splice(index, 1); //Lista
  }

  analyzeMessage(msg: string): string {
    return this.chatUtils.analyzeMessage(msg.toString());
  }

}
