import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { Toast, ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

import { ChatService } from '../services/chat.service';
import * as assert from 'assert';


describe('ChatService', () => {

  let credentials = {
    "idp"      : "https://solid.community",
    "username" : "dechates6b",                  
    "password" : "dechates6b",
    "base"     : "https://dechates6b.solid.community",
    "test"     : "/public/test/"   
  }

  let timeout = 2100;
  let webID = "https://pruebases6b.solid.community/profile/card#me";
  let mywebID = "https://gomezivann.inrupt.net"
  let chatService: ChatService;

  beforeEach(async( async () => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), RouterTestingModule],
      declarations: [],
      providers: [ ChatService ]
    })
    .compileComponents();

    chatService = TestBed.get(ChatService);
  }));

  it('should be created', () => {
    expect(chatService).toBeTruthy();
  });

  it ('new chat', async function() {
    // this.timeout(timeout);
    // let channel = await chatService.createNewChatChannel(webID, "chat de pruebas");
    // assert.notEqual(chatService.getRdfService().readFile(mywebID+"/private/dechat_es6b/"+channel.id), null);
  });

});

