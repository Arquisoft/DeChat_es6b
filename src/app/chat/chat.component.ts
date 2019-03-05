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

  constructor(private rdf: RdfService,
    private route: ActivatedRoute, private auth: AuthService, private chatService: ChatService) {}

  ngOnInit() {
    this.onSubmit();
  }
  
  async onSubmit () {
    // Ejemplo copiar
    //this.chatService.copyFile("https://carballo09.solid.community/public/chat_test.ttl", "https://dcarballob01.solid.community/public/TESTTT.ttl");
    
    // Ejemplo escribir
    //this.chatService.writeMessage("https://dcarballob01.solid.community/public/TEST_CHAT.ttl");

    // Ejemplo leer
    // this.chatService.readMessage("https://dcarballob01.solid.community/public/TEST_CHAT.ttl.txt.txt.txt.txt")
    //   .then(file => { console.log(file)});

    // Ejemplo actualizar
    // this.chatService.updateFile("https://dcarballob01.solid.community/public/TEST_CHAT.ttl.txt.txt.txt", "Mensaje prueba", "text/plain");
    // this.chatService.updateFile("https://dcarballob01.solid.community/public/TEST_CHAT.ttl.txt.txt.txt", "Mensaje de prueba");

    // Ejemplo borrar
    //this.chatService.deleteFile("https://dcarballob01.solid.community/public/TESTTT.ttl.txt");

    // Ejemplo leer carpeta
    /* this.chatService.readFolder("https://dcarballob01.solid.community/public/").then(folder => {
      console.log(`Read ${folder.name}, it has ${folder.files.length} files. :` + folder.files)}); */


      // PRUEBAS GUARDAR OBJETO

      let canal = new ChatChannel("asdasd", "Prueba");
      let msg1 = new Message("fgdfgd", "https://dcarballob01.solid.community", "HOLA MUNDO!");
      let msg2 = new Message("fgdfgd", "https://dcarballob01.solid.community", "HOLA SOLID!");
      canal.messages.push(msg1);
      canal.messages.push(msg2);

      let cn = JSON.stringify(canal);


      // ------ COMO JSON NORMAL ------

      //this.chatService.writeMessage("https://dcarballob01.solid.community/public/test_cnttl", cn, "text/plain");

      // let temp = await this.chatService.readMessage("https://dcarballob01.solid.community/public/test_cnttl.txt").then(file => { return(file) });
      // console.log(temp);

      // let recupCN:ChatChannel = JSON.parse(temp);
      // console.log("Título: " + recupCN.title);


      // ------ COMO LD + JSON ------

      this.chatService.writeMessage("https://dcarballob01.solid.community/public/test_cnttl_json", cn, "application/ld+json");

      let temp = await this.chatService.readMessage("https://dcarballob01.solid.community/public/test_cnttl_json.jsonld").then(file => { return(file) });
      console.log(temp);

      let recupCN:ChatChannel = JSON.parse(temp);
      console.log("Título: " + recupCN.title);
      console.log("Mensajes: "); 
      recupCN.messages.forEach(m => console.log(m.message));
  }

}
