import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SolidProfile } from '../models/solid-profile.model';
import { RdfService } from '../services/rdf.service';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/solid.auth.service';

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
    // this.chatService.readMessage("https://dcarballob01.solid.community/public/TEST_CHAT.ttl.txt.txt")
    //   .then(file => { console.log(file)});

    // Ejemplo actualizar
    // this.chatService.updateFile("https://dcarballob01.solid.community/public/TEST_CHAT.ttl.txt.txt.txt", "Mensaje prueba", "text/plain");
    // this.chatService.updateFile("https://dcarballob01.solid.community/public/TEST_CHAT.ttl.txt.txt.txt", "Mensaje de prueba");

    // Ejemplo borrar
    //this.chatService.deleteFile("https://dcarballob01.solid.community/public/TESTTT.ttl.txt");

    // Ejemplo leer carpeta
    /* this.chatService.readFolder("https://dcarballob01.solid.community/public/").then(folder => {
      console.log(`Read ${folder.name}, it has ${folder.files.length} files. :` + folder.files)}); */
  }

}
