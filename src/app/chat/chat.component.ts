import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SolidProfile } from '../models/solid-profile.model';
import { RdfService } from '../services/rdf.service';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/solid.auth.service';

import { ChatChannel } from '../models/chat-channel.model';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  selectedChatChannel: ChatChannel;

  constructor(private rdf: RdfService,
    private route: ActivatedRoute, private auth: AuthService, private chatService: ChatService) {}

  ngOnInit() {
    this.init();
  }

  async init() {
    await this.chatService.startChat();
    //this.onSubmit();
  }

  getLastMessage(channel: ChatChannel): Message {
    return (channel.messages[channel.messages.length-1] != undefined)? (channel.messages[channel.messages.length-1]) : null;
  }

  getLastMessageText(channel: ChatChannel): string {
    return (this.getLastMessage(channel) != null)? this.getLastMessage(channel).message : "";
  }

  getDayAndMonthLastMessage(channel: ChatChannel) {
    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    return (this.getLastMessage(channel) != null)? months[new Date(this.getLastMessage(channel).sendTime).getUTCMonth()]
      + " " + (new Date(this.getLastMessage(channel).sendTime).getUTCDay()+1) : "";
  }

  getChatChannels(): ChatChannel[] {
    return this.chatService.chatChannels;
  }

  addNewChatChannel() {
    const inputElement: HTMLInputElement = document.getElementById('input_add_webid') as HTMLInputElement;
    const webid: string = inputElement.value;
    this.chatService.createNewChatChannel(webid);
  }
  
}