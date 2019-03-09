import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgForm } from '@angular/forms';
import {SolidProfile} from "../models/solid-profile.model";
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
    this.onSubmit();
  }

  async onSubmit () {
    // Ejemplo copiar
    //this.chatService.copyFile("https://gomezivann.solid.community/public/chat_test.ttl", "https://dcarballob01.solid.community/public/TESTTT.ttl");
    
    // Ejemplo escribir
    //this.chatService.writeMessage("https://gomezivann.solid.community/public/TEST_CHAT.ttl");

    // Ejemplo leer
    // this.chatService.readMessage("https://gomezivann.solid.community/public/TEST_CHAT.ttl.txt.txt.txt.txt")
    //   .then(file => { console.log(file)});

    // Ejemplo actualizar
    // this.chatService.updateFile("https://gomezivann.solid.community/public/TEST_CHAT.ttl.txt.txt.txt", "Mensaje prueba", "text/plain");
    // this.chatService.updateFile("https://gomezivann.solid.community/public/TEST_CHAT.ttl.txt.txt.txt", "Mensaje de prueba");

    // Ejemplo borrar
    //this.chatService.deleteFile("https://gomezivann.solid.community/public/TESTTT.ttl.txt");

    // Ejemplo leer carpeta
    /* this.chatService.readFolder("https://gomezivann.solid.community/public/").then(folder => {
      console.log(`Read ${folder.name}, it has ${folder.files.length} files. :` + folder.files)}); */


      // PRUEBAS GUARDAR OBJETO

      let canal = new ChatChannel("asdasda","Prueba");
      let msg1 = new Message("HOLA MUNDO!");
      let msg2 = new Message("HOLA SOLID!");
      canal.messages.push(msg1);
      canal.messages.push(msg2);

      let cn = JSON.stringify(canal);


      // ------ COMO JSON NORMAL ------

      //this.chatService.writeMessage("https://gomezivann.solid.community/public/test_cnttl", cn, "text/plain");

      // let temp = await this.chatService.readMessage("https://gomezivann.solid.community/public/test_cnttl.txt").then(file => { return(file) });
      // console.log(temp);

      // let recupCN:ChatChannel = JSON.parse(temp);
      // console.log("Título: " + recupCN.title);


      // ------ COMO LD + JSON ------

      /* this.chatService.writeMessage("https://gomezivann.inrupt.net/public/test_cnttl_json", cn, "application/ld+json");

      let temp = await this.chatService.readMessage("https://gomezivann.inrupt.net/public/test_cnttl_json.jsonld").then(file => { return(file) });
      console.log(temp);

      let recupCN:ChatChannel = JSON.parse(temp);
      console.log("Título: " + recupCN.title);
      console.log("Mensajes: "); 
      recupCN.messages.forEach(m => console.log(m.message)); */


      // setInterval(() => {
      //   msg1.makerWebId = "https://dcarballob01.solid.community";
      //   let newMSG = JSON.stringify(msg1);
      //   this.chatService.createFile("https://dcarballob01.solid.community/inbox/dechat_msg", newMSG, "application/ld+json");
      // }, 1000);


      

      // this.chatService.createNewChatChannel("https://davidcarballo.solid.community");
      // this.chatService.createNewChatChannel("https://dcarballob01.solid.community");


      // let temp = await this.chatService.readFile("https://dcarballob01.solid.community/private/dechat_es6b/76116c47-1dda-41f5-902b-6d585c1fb146.jsonld")
      //   .then(file => { return(file) });
      // let recupCN:ChatChannel = JSON.parse(temp);


      // for (let index = 0; index < 60; index++) {
      //   await this.chatService.sendMessage(recupCN, "HOLA MUNDO");
      // }
      

      // console.log("Título: " + recupCN.title);
      // console.log("Mensajes: "); 
      // recupCN.messages.forEach(m => console.log(m.message)); 



      // console.log(temp);

      // let msg3 = new Message("https://dcarballob01.solid.community", "HOLA INBOX!");
      // msg3.makerWebId = "https://dcarballob01.solid.community";
      // this.chatService.sendMessage(canal, msg3);
      // console.log(temp);
  }

}
