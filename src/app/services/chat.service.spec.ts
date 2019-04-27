import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { Toast, ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

import { ChatService } from '../services/chat.service';
import { RdfService } from './rdf.service';
import * as assert from 'assert';


describe('ChatService', () => {
  let timeout = 2100;
  let chatService: ChatService;
  let rdfService: RdfService;

  let me = {
    "base": "https://dechates6b.solid.community",
    "webid": "https://dechates6b.solid.communityprofile/card#me"
  };

  let other = {
    "base": "https://pruebases6b.solid.community",
    "webid": "https://pruebases6b.solid.community/profile/card#me"
  };

  beforeEach(async( async () => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), RouterTestingModule],
      declarations: [],
      providers: [ ChatService ]
    })
    .compileComponents();

    rdfService = TestBed.get(RdfService);
    chatService = TestBed.get(ChatService);

    chatService.webid = me.webid;
    chatService.uri = me.base;
  }));

  it('should be created', () => {
    expect(chatService).toBeTruthy();
  });

  it ('new chat', async function() {
    // this.timeout(timeout);
    let channel = await chatService.createNewChatChannel(other.webid, "chat de pruebas");
    assert.notEqual(await chatService.getRdfService().readFile(me.base + "/private/dechat_es6b/" + channel.id), null);

    // Remove new channel
    await rdfService.deleteFile(me.base + "/private/dechat_es6b/" + channel.id);
    assert.equal(await rdfService.readFile(me.base + "/private/dechat_es6b/" + channel.id), null);
  });

  it ('search chat by web id', async function() {
    // this.timeout(timeout);
    await chatService.createNewChatChannel(other.webid, "chat de pruebas");
    let channel = chatService.searchChatChannelByParticipantWebid(other.webid);
    assert.notStrictEqual(channel.title.toString().toLowerCase(), "pruebases6b"); // Use the account name

    // Remove new channel
    await rdfService.deleteFile(me.base + "/private/dechat_es6b/" + channel.id);
    assert.equal(await rdfService.readFile(me.base + "/private/dechat_es6b/" + channel.id), null);
  }); 

});

