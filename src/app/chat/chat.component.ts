import {Component, OnInit, ViewChild, AfterViewChecked, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

import { ChatService } from '../services/chat.service';
import { UtilsService } from '../services/utils.service';
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
  @ViewChild('send_file') private send_file: ElementRef;
  scrollBottom = false;

  userListPopup;
  userListGroup: Participant[] = [];

  defaultImage = "assets/images/default.jpg";
  defaultGroupImage = "assets/images/groups.png";

  selectedChatChannel: ChatChannel; 
  myProfile: Participant;

  assignedColors = {};


  constructor(private chatService: ChatService, private rdf: RdfService, 
				private auth: AuthService, private chatUtils: UtilsService, private router: Router) {

  }

  ngOnInit() {
    // Si no estamos autenticados vamos al login
    if (!localStorage.getItem('solid-auth-client')) {
      this.router.navigateByUrl('/login');
    }

    // Si estamos autenticados iniciamos el chat
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

    /* make newGroupChannel option show up */
    $(".ng").click(function() {
      $(".newGroupChannel").fadeIn(180);
      /* hide others */
      $(".menuWrap").fadeOut(180);
    });

     /* make contacts option show up */
    this.loadFriends();
    $(".cn").click(function() {
      $(".contacts").fadeIn(180);
      /* hide others */
      $(".menuWrap").fadeOut(180);
    });

    /* close newGroupChannel option when adding */
    $("#button_add_group_channel").click(function () {
      $(".overlay, .newGroupChannel").fadeOut(180);
    });

    /* close addParticipantToGroup option when adding */
    $("#button_add_part_group_channel").click(function () {
      $(".overlay, .addParticipantToGroup").fadeOut(180);
    });

    /* close removeParticipantFromGroup option when adding */
    $("#button_remove_part_group_channel").click(function () {
      $(".overlay, .removeParticipantFromGroup").fadeOut(180);
    });

    /* close contacts option after showing them */
    $("#button_contacts").click(function () {
      $(".overlay, .contacts").fadeOut(180);
    });

    /* close contacts option after showing them */
    $("#button_show_participants").click(function () {
      $(".overlay, .groupParticipants").fadeOut(180);
    });

    // Show/Hide the other notification options
    $(".deskNotif").click(function(){
      $(".showSName, .showPreview, .playSounds").toggle();
    });

    /* close all overlay elements */
    $(".overlay").click(function () {
      $(".overlay, .menuWrap, .newChannel, .newGroupChannel, .contacts, .addParticipantToGroup, .removeParticipantFromGroup, .groupParticipants").fadeOut(180);
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

    // Show emojis panel and hide the others
    $("#panelEmoji").click(function(){
      $(".gifList").hide();
      $(".emojiList").show();
    });

    // Show gifs panel and hide the others
    $("#panelGIFs").click(function(){
      $(".emojiList").hide();
      $(".gifList").show();
    });

    /* small conversation menu */
    $(".otherOptions").click(function(){
      $(".moreMenu").slideToggle("fast");
    });

    /* moreMenu */
    $(".moreMenu button").click(function(){
      $(".moreMenu").slideToggle("fast");
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

  
  // ADD THE NEW CODE FROM HERE PLEASE

  async loadFriends(){
    this.userListPopup = [];
    await this.chatService.getFriends(this.userListPopup);
  }

  getChatService() {
    return this.chatService;
  }
  
  async sendMessage() {
    // Enviar un mensaje solo si hay un chat seleccionado, si no no hace nada
    if (this.selectedChatChannel != null) {
      const inputElement: HTMLInputElement = document.getElementById('input_text') as HTMLInputElement;
      const msg: string = inputElement.value;
      if (inputElement.value.length > 0) 
        this.chatService.sendMessage(this.selectedChatChannel, msg);
      this.scrollBottom = true;
    }
  }

  async emptyText() {
    let inputElement: HTMLInputElement = document.getElementById('input_text') as HTMLInputElement;
    let msg: string = "";
    inputElement.value = msg;
  }

  putTextInInput(text: string) {
    let inputElement: HTMLInputElement = document.getElementById('input_text') as HTMLInputElement;
    inputElement.value += text;
  }
  
  async sendFile(event) {
    if (this.selectedChatChannel != null) {
      const file: File = event.target.files[0];
      this.chatService.sendFile(this.selectedChatChannel, '', file);
      this.send_file.nativeElement.value = ""; // restart input file
      this.scrollBottom = true;
    }
  }

  async setSelectedChatChannel(selectedChatChannel: ChatChannel){
    this.selectedChatChannel = selectedChatChannel;
    await this.chatService.markPendingMessagesAsRead(this.selectedChatChannel);
    this.scrollBottom = true;
  }

  getMessagesSelectedChatChannel() {
    return (this.selectedChatChannel == undefined)? new Array() : this.selectedChatChannel.messages;
  }

  getLastMessageText(channel: ChatChannel): string {
    return (channel.getLastMessage() != null)? channel.getLastMessage().message : "";
  }

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

  async addNewGroupChatChannel() {
    const inputElement: HTMLInputElement = document.getElementById('input_group_name') as HTMLInputElement;
    const groupName: string = inputElement.value;
    if (groupName.length > 0) {
      let channel = await this.chatService.createNewChatGroup(groupName);
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
      if ( channel.title.toString().toLowerCase() === name.toLowerCase()  || channel.title.toString().toLowerCase().includes(name.toLowerCase()))
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

  // Método para cargar las imágenes, en este momento, para los chats grupales en este momento
  // se usa una por defecto
  public getImagenChat(channel: ChatChannel) {
    if (!channel.group || channel.group.toString().length == 0) {
      // if (channel.participants[0]) {
        return (channel.participants[0].imageURL.length > 0)? channel.participants[0].imageURL : this.defaultImage;
      // } else {
      //   return this.defaultImage;
      // }
    } else {
      return this.defaultGroupImage;
    }
  }

  public getOwnImage() {
    return (this.myProfile.imageURL != undefined && this.myProfile.imageURL.length > 0)? 
        this.myProfile.imageURL : this.defaultImage;
  }

  // Ajusta el scroll del chat a la parte inferior de este
  moveChatScrollToBottom() {
    if (this.scrollBottom) {
      this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
      this.scrollBottom = false;
    }

    // Ajustar a la parta inferior si estamos próximos
    if ((this.scrollMe.nativeElement.scrollHeight - this.scrollMe.nativeElement.scrollTop) <= 1000 ) {
      this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight
    }
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

  async logout() {
    await this.rdf.logout();
    await this.auth.solidSignOut();
  }
  
  /**
   * Busca patrones en el mensaje, si hay alguna coincidencia
   * la sustituye por el código HTML correspondiente.
   * 
   * @param msg 
   */
  analyzeMessage(msg: Message): string {
    return this.chatUtils.analyzeMessage(msg);
  }

  goToWebProfile() {
    window.open(this.chatService.webid, "_blank");
  }

  /**
   * 
   */
  async addParticipantToGroup() {
    const inputElement: HTMLInputElement = document.getElementById('input_add_part_group_webid') as HTMLInputElement;
    const webid: string = inputElement.value;
    if (webid.length > 0 && (this.selectedChatChannel.group
                            && this.selectedChatChannel.group.toString().length > 0)) {

      await this.rdf.addParticipantToGroup(this.selectedChatChannel.group, webid);
    }
  }

  /**
   * 
   */
  async removeParticipantFromGroup() {
    const inputElement: HTMLInputElement = document.getElementById('input_remove_part_group_webid') as HTMLInputElement;
    const webid: string = inputElement.value;
    if (webid.length > 0 && (this.selectedChatChannel.group
                            && this.selectedChatChannel.group.toString().length > 0)) {

      await this.rdf.removeParticipantFromGroup(this.selectedChatChannel.group, webid);
    }
  }

  showAddParticipant() {
    $(".addParticipantToGroup").fadeIn(180);
    $(".overlay").fadeIn(180);
    /* hide others */
    $(".moreMenu").slideToggle("fast");
    $(".menuWrap").fadeOut(180);
  }

  showRemoveParticipant() {
    $(".removeParticipantFromGroup").fadeIn(180);
    $(".overlay").fadeIn(180);
    /* hide others */
    $(".moreMenu").slideToggle("fast");
    $(".menuWrap").fadeOut(180);
  }

  async showListParticipants() {
    if (this.selectedChatChannel) {
      this.userListGroup = await this.chatService.getUserListGroup(this.selectedChatChannel);
      $(".groupParticipants").fadeIn(180);
      $(".overlay").fadeIn(180);
      /* hide others */
      $(".moreMenu").slideToggle("fast");
      $(".menuWrap").fadeOut(180);
    }
  }

  /**
   * 
   */
  isGroupChannel(): boolean {
    if (this.selectedChatChannel)
      return (this.selectedChatChannel.group && this.selectedChatChannel.group.toString().length > 0);
  }

  /**
   * 
   * @param webid 
   */
  getParticipantUri(webid: string): string {
    return webid.match(this.chatUtils.regexUrlDomain)[0].split('/').pop();
  }

  /**
   * 
   * @param webid 
   */
  getUniqueColorForWebid(webid: string): string {
    if (!this.assignedColors[webid])
      this.assignedColors[webid] = this.chatUtils.getRandomDarkColor();

      return this.assignedColors[webid];
  }

}