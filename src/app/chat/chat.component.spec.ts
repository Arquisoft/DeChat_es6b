import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { Toast, ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { ChatService } from '../services/chat.service';
import * as assert from 'assert';

import { ChatComponent } from './chat.component';
import { RdfService } from '../services/rdf.service';

const timeout = 2100;
const webID = "https://pruebases6b.solid.community/profile/card#me";
const mywebID = "https://gomezivann.inrupt.net"


describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatService: ChatService;
  let rdfService: RdfService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), RouterTestingModule],
      declarations: [ ChatComponent ],
      providers: [ ChatService ]
    })
    .compileComponents();

    // chatService = TestBed.get(ChatService);
    // rdfService = TestBed.get(RdfService);
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ChatComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it ('new chat', async function() {
  //   // this.timeout(timeout);
  //   // let channel = await chatService.createNewChatChannel(webID, "chat de pruebas");
  //   // assert.notEqual(chatService.getRdfService().readFile(mywebID+"/private/dechat_es6b/"+channel.id), null);
  // });

});
