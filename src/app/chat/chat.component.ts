import {Component, OnInit, ViewChild, AfterViewChecked, ElementRef} from '@angular/core';
import * as $ from 'jquery';

import { ChatService } from '../services/chat.service';
import { RdfService } from '../services/rdf.service';
import { AuthService } from '../services/solid.auth.service';

import { ChatChannel } from '../models/chat-channel.model';
import { Message } from '../models/message.model';
import { Participant } from '../models/participant.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private scrollMe: ElementRef;

  defaultImage = "assets/images/default.jpg";
  selectedChatChannel: ChatChannel; 
  myProfile: Participant;

  constructor(private chatService: ChatService, private rdf: RdfService, private auth: AuthService) {
  }

  ngOnInit() {
    this.init();

    /* make side menu show up */
    $(".trigger").click(function() {
      $(".overlay, .menuWrap").fadeIn(180);
      $(".menu").animate({opacity: '1', left: '0px'}, 180);
    });

    /* make config menu show up */
    $(".cloud").click(function() {
      $(".config").animate({opacity: '1', right: '0px'}, 180);
      /* hide others */
      $(".menuWrap").fadeOut(180);
      $(".menu").animate({opacity: '0', left: '-320px'}, 180);
    });

    /* make newChannel option show up */
    $(".nc").click(function() {
      $(".newChannel").fadeIn(180);
      /* hide others */
      $(".menuWrap").fadeOut(180);
    });

    /* close newChannel option when adding */
    $("#button_add_channel").click(function () {
      $(".overlay, .newChannel").fadeOut(180);
    });

    // Show/Hide the other notification options
    $(".deskNotif").click(function(){
      $(".showSName, .showPreview, .playSounds").toggle();
    });

    /* close all overlay elements */
    $(".overlay").click(function () {
      $(".overlay, .menuWrap, .newChannel").fadeOut(180);
      $(".menu").animate({opacity: '0', left: '-320px'}, 180);
      $(".config").animate({opacity: '0', right: '-200vw'}, 180);
    });

    //This also hide everything, but when people press ESC
    $(document).keydown(function(e) {
      if (e.keyCode == 27) {
        $(".overlay, .menuWrap").fadeOut(180);
        $(".menu").animate({opacity: '0', left: '-320px'}, 180);
        $(".config").animate({opacity: '0', right: '-200vw'}, 180);
      }
    });

    /* small conversation menu */
    $(".otherOptions").click(function(){
      $(".moreMenu").slideToggle("fast");
    });

    /* moreMenu */
    $(".moreMenu button").click(function(){
      $(".moreMenu").slideToggle("fast");
    });

    /* clicking the search button from the conversation focus the search bar outside it, as on desktop */
    $( ".search" ).click(function() {
      $( ".searchChats" ).focus();
    });

    /* Show or Hide Emoji Panel */
    $(".emoji").click(function(){
      $(".emojiBar").fadeToggle(120);
    });

    /* if the user click the conversation or the type panel will also hide the emoji panel */
    $(".convHistory, .replyMessage").click(function(){
      $(".emojiBar").fadeOut(120);
    });
  }

  ngAfterViewChecked() {
    this.moveChatScrollToBottom();
  }
  
  async init() {
    await this.chatService.startChat();
    this.myProfile = await this.rdf.loadParticipantData(this.chatService.webid);
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
    // Enviar un mensaje solo si hay un chat seleccionado, si no no hace nada
    if (this.selectedChatChannel != null) {
      const inputElement: HTMLInputElement = document.getElementById('input_text') as HTMLInputElement;
      const msg: string = inputElement.value;
      this.chatService.sendMessage(this.selectedChatChannel, msg);
    }
  }

  async emptyText() {
    let inputElement: HTMLInputElement = document.getElementById('input_text') as HTMLInputElement;
    let msg: string = "";
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
      this.selectedChatChannel = channel;
    }
  }
  
  search() {
    const inputSearch: HTMLInputElement = document.getElementById('input_search') as HTMLInputElement;
    const name: string = inputSearch.value;
    this.searchChat(name);
  }

  /**
   * Método que busca un chat según el texto introducido en el input_search en la lista de chats activos 
   * NO es sensible a mayúsculas y minúsculas
   * La busqueda se ha de realizar siempre sobre TODOS los chats activos
   */
  private searchChat(name: string) {
    var newChatChannels: ChatChannel[] = new Array();
    for (let channel of this.chatService.allActiveChats) {
      if ( channel.title.toString().toLowerCase() === name.toLowerCase()  || channel.title.toString().toLowerCase().includes(name.toLowerCase()) )
        newChatChannels.push(channel);
    }

    if (newChatChannels.length > 0)
      this.chatService.setChatChannels(newChatChannels);
    else
      alert("No se han encontrado coincidencias con ningún chat activo.");
  }

  /**
   * Muestra el botón go_back y oculta el trigger cuando gana el foco input_search
   */
  triggerGoBackHidden(triggerValue:boolean, go_backValue: boolean){
    const triggerHtml: HTMLButtonElement  = document.getElementsByClassName('trigger').item(0) as HTMLButtonElement;
    triggerHtml.hidden=triggerValue;
    const go_backHtml: HTMLButtonElement  = document.getElementsByClassName('go_back').item(0) as HTMLButtonElement;
    go_backHtml.hidden=go_backValue;
  }

  /**
   * PERDIDA DE FOCO DEL INPUT_CHAT
   * 
   * IF:
   *      no habia escrito nada en el input de busqueda de chats
   *      && la lista de chats actual es de la misma longitud que la que contiene todos los chats activos (son iguales)
   * ENTONCES:
   *      ocultar go_back y volver a mostrar trigger
   */
  inputLostFocus() {
    const inputSearch: HTMLInputElement = document.getElementById('input_search') as HTMLInputElement;
    if(inputSearch.value==="" && this.chatService.allActiveChats.length == this.chatService.chatChannels.length)
      this.triggerGoBackHidden(false, true);
  }

  /**
   * Recupera todos los chats del usuario activo
   */
  restoreAllActiveChats() {
    this.triggerGoBackHidden(false, true);
    const inputSearch: HTMLInputElement = document.getElementById('input_search') as HTMLInputElement;
    inputSearch.value = "";
    this.chatService.setChatChannels(this.chatService.allActiveChats);
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

  // Elimina un chat de la lista y del POD del usuario
  deleteChat() {
    if (this.selectedChatChannel) {
      let channel = this.selectedChatChannel;
      
      const index = this.chatService.chatChannels.indexOf(channel);
      this.chatService.delete(channel); //Pod
      this.chatService.chatChannels.splice(index, 1); //Lista

      // Si el chat mostrado actualmente es el que se borra, vaciamos los mensajes
      if (this.selectedChatChannel===channel)
        this.selectedChatChannel=null;
    }
  }

  logout() {
    this.auth.solidSignOut();
  }

}
