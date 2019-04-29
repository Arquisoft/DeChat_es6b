import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { Toast, ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

import { ChatService } from '../services/chat.service';
import { RdfService } from './rdf.service';
import * as assert from 'assert';
import { Message } from '../models/message.model';
import { Participant } from '../models/participant.model';


describe('ChatService', () => {
  let timeout = 2100;
  let chatService: ChatService;
  let rdfService: RdfService;

  let me = {
    "base": "https://dechates6b.solid.community",
    "webid": "https://dechates6b.solid.community/profile/card#me"
  };

  let other = {
    "base": "https://dechates6b2.solid.community",
    "webid": "https://dechates6b2.solid.community/profile/card#me"
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

    // Delete new channel
    await rdfService.deleteFile(me.base + "/private/dechat_es6b/" + channel.id);
    assert.equal(await rdfService.readFile(me.base + "/private/dechat_es6b/" + channel.id), null);
  });

  it ('search chat by web id', async function() {
    // this.timeout(timeout);
    await chatService.createNewChatChannel(other.webid, "chat de pruebas");
    let channel = chatService.searchChatChannelByParticipantWebid(other.webid);
    assert.notStrictEqual(channel.title.toString().toLowerCase(), "pruebases6b"); // Use the account name

    // Delete new channel
    await rdfService.deleteFile(me.base + "/private/dechat_es6b/" + channel.id);
    assert.equal(await rdfService.readFile(me.base + "/private/dechat_es6b/" + channel.id), null);
  });

  it ('search chat by chat id', async function() {
    // this.timeout(timeout);
    let newChannel = await chatService.createNewChatChannel(other.webid, "chat de pruebas");
    let channel = chatService.searchChatChannelById(newChannel.id);
    assert.notStrictEqual(channel.title.toString().toLowerCase(), "pruebases6b"); // Use the account name

    // Delete new channel
    await rdfService.deleteFile(me.base + "/private/dechat_es6b/" + channel.id);
    assert.equal(await rdfService.readFile(me.base + "/private/dechat_es6b/" + channel.id), null);
  });

  it ('delete chat', async function() {
    // this.timeout(timeout);
    let newChannel = await chatService.createNewChatChannel(other.webid, "chat de pruebas");

    let channel = chatService.searchChatChannelByParticipantWebid(other.webid);
    await chatService.delete(channel);
    channel = chatService.searchChatChannelByParticipantWebid(other.webid);

    assert.equal(channel, null);
    assert.equal(await rdfService.readFile(me.base + "/private/dechat_es6b/" + newChannel.id), null);
  });

  it ('send message', async function() {
    // this.timeout(timeout);
    let channel = await chatService.createNewChatChannel(other.webid, "chat de pruebas");

    await chatService.sendMessage(channel, "pruebas");
    assert.equal(channel.messages[0].message, "pruebas");
    
    // Delete new channel
    await rdfService.deleteFile(me.base + "/private/dechat_es6b/" + channel.id);
    assert.equal(await rdfService.readFile(me.base + "/private/dechat_es6b/" + channel.id), null);
  });

  it ('send file', async function() {
    // this.timeout(timeout);
    let channel = await chatService.createNewChatChannel(other.webid, "chat de pruebas");
    let image = await rdfService.readFile("https://dechates6b.solid.community/private/inrupt.png");

    let spyUpdateFile = spyOn(rdfService, 'updateFile').and.callFake(() => {});
    let spyAddOwnerToACL = spyOn(rdfService, 'addOwnerToACL').and.callFake(() => {});
    let spyAddReaderToACL = spyOn(rdfService, 'addReaderToACL').and.callFake(() => {});

    let file: File = new File([image], 'inrupt.png', { lastModified: 0, type: 'image/png' });
    await chatService.sendFile(channel, "pruebas", file);

    assert.notEqual(await rdfService.readFile(channel.messages[0].message), null);
    expect(spyUpdateFile).toHaveBeenCalled();
    expect(spyAddOwnerToACL).toHaveBeenCalled();
    expect(spyAddReaderToACL).toHaveBeenCalled();

    // Delete sent image
    await rdfService.deleteFile(channel.messages[0].message);
    assert.equal(await rdfService.readFile(channel.messages[0].message), null);

    // Delete new channel
    await rdfService.deleteFile(me.base + "/private/dechat_es6b/" + channel.id);
    assert.equal(await rdfService.readFile(me.base + "/private/dechat_es6b/" + channel.id), null);
  });

  it ('load chat channels', async function() {
    let channel = await chatService.createNewChatChannel(other.webid, "chat de pruebas");
    await chatService.sendMessage(channel, "pruebas");
    assert.equal(channel.messages[0].message, "pruebas");
    
    chatService.setChatChannels([]);
    await chatService.loadChatChannels();
    assert.notEqual(chatService.chatChannels.length, 0);

    // Delete new channel
    await rdfService.deleteFile(me.base + "/private/dechat_es6b/" + channel.id);
    assert.equal(await rdfService.readFile(me.base + "/private/dechat_es6b/" + channel.id), null);
  });

  it ('receive normal new contact message', async function() {
    let msg: Message = new Message(other.webid, "Prueba");
    await rdfService.createFile(me.base + "/inbox/test", JSON.stringify(msg), "application/ld+json");

    await chatService.checkInbox();
    assert.equal(chatService.chatChannels[0].messages[0].message, "Prueba");
    assert.equal(chatService.chatChannels[0].messages[0].makerWebId, other.webid);

    // Delete new channel
    await rdfService.deleteFile(me.base + "/private/dechat_es6b/" + chatService.chatChannels[0].id);
    assert.equal(await rdfService.readFile(me.base + "/private/dechat_es6b/" + chatService.chatChannels[0].id), null);
  });

  it ('create new chat group', async function() {
    let spyUpdateFile = spyOn(rdfService, 'updateFile').and.callFake(() => {});
    let spyAddOwnerToACL = spyOn(rdfService, 'addOwnerToACL').and.callFake(() => {});

    let channel = await chatService.createNewChatGroup("TEST");
    assert.notEqual(channel, null);
    assert.equal(channel.title, "TEST");

    expect(spyUpdateFile).toHaveBeenCalled();
    expect(spyAddOwnerToACL).toHaveBeenCalled();

    // Delete new channel and new group
    await rdfService.deleteFile(me.base + "/private/dechat_es6b/" + chatService.chatChannels[0].id);
    await rdfService.deleteFile(chatService.chatChannels[0].group);
    assert.equal(await rdfService.readFile(me.base + "/private/dechat_es6b/" + chatService.chatChannels[0].id), null);
    assert.equal(await rdfService.readFile(chatService.chatChannels[0].group), null);
  });

  it ('mark chat messages as read', async function() {
    let msg1: Message = new Message(other.webid, "Prueba1");
    let msg2: Message = new Message(other.webid, "Prueba2");
    let msg3: Message = new Message(other.webid, "Prueba3");

    await rdfService.createFile(me.base + "/inbox/test", JSON.stringify(msg1), "application/ld+json");
    await rdfService.createFile(me.base + "/inbox/test", JSON.stringify(msg2), "application/ld+json");
    await rdfService.createFile(me.base + "/inbox/test", JSON.stringify(msg3), "application/ld+json");

    await chatService.checkInbox();
    assert.equal(chatService.chatChannels[0].messages[0].status, Message.Status.PENDING);
    assert.equal(chatService.chatChannels[0].messages[1].status, Message.Status.PENDING);
    assert.equal(chatService.chatChannels[0].messages[2].status, Message.Status.PENDING);

    let spyUpdateMessageToRead = spyOn(rdfService, 'updateMessageToRead').and.callFake(() => {});
    await chatService.markPendingMessagesAsRead(chatService.chatChannels[0]);
    assert.equal(chatService.chatChannels[0].messages[0].status, Message.Status.READ);
    assert.equal(chatService.chatChannels[0].messages[1].status, Message.Status.READ);
    assert.equal(chatService.chatChannels[0].messages[2].status, Message.Status.READ);
    expect(spyUpdateMessageToRead).toHaveBeenCalled();
    
    // Delete new channel
    await rdfService.deleteFile(me.base + "/private/dechat_es6b/" + chatService.chatChannels[0].id);
    assert.equal(await rdfService.readFile(me.base + "/private/dechat_es6b/" + chatService.chatChannels[0].id), null);
  });

  it ('add participant to a group', async function() {
    let participants:Participant[] = [];

    let spyUpdateFile = spyOn(rdfService, 'updateFile').and.callFake(() => {});
    let spyAddOwnerToACL = spyOn(rdfService, 'addOwnerToACL').and.callFake(() => {});

    let channel = await chatService.createNewChatGroup("TEST");
    participants = await rdfService.getGroupChatParticipants(channel.group);
    assert.equal(participants.length, 1);

    await rdfService.addParticipantToGroup(channel.group, other.webid);
    await chatService.delay(timeout); // wait a while for the update to be done on the POD
    participants = await rdfService.getGroupChatParticipants(channel.group);
    assert.equal(participants.length, 2);

    expect(spyUpdateFile).toHaveBeenCalled();
    expect(spyAddOwnerToACL).toHaveBeenCalled();

    // Delete new channel and new group
    await rdfService.deleteFile(me.base + "/private/dechat_es6b/" + channel.id);
    await rdfService.deleteFile(channel.group);
    assert.equal(await rdfService.readFile(me.base + "/private/dechat_es6b/" + channel.id), null);
    assert.equal(await rdfService.readFile(channel.group), null);
  });

  it ('get title from a group chat', async function() {
    let spyUpdateFile = spyOn(rdfService, 'updateFile').and.callFake(() => {});
    let spyAddOwnerToACL = spyOn(rdfService, 'addOwnerToACL').and.callFake(() => {});

    let channel = await chatService.createNewChatGroup("TEST");
    let title = await rdfService.getChatGroupTitle(channel.group);
    assert.equal(title, "TEST");

    expect(spyUpdateFile).toHaveBeenCalled();
    expect(spyAddOwnerToACL).toHaveBeenCalled();

    // Delete new channel and new group
    await rdfService.deleteFile(me.base + "/private/dechat_es6b/" + channel.id);
    await rdfService.deleteFile(channel.group);
    assert.equal(await rdfService.readFile(me.base + "/private/dechat_es6b/" + channel.id), null);
    assert.equal(await rdfService.readFile(channel.group), null);
  });

  it ('send message to group', async function() {
    let spyUpdateFile = spyOn(rdfService, 'updateFile').and.callFake(() => {});
    let spyAddOwnerToACL = spyOn(rdfService, 'addOwnerToACL').and.callFake(() => {});

    let channel = await chatService.createNewChatGroup("TEST");
    await chatService.sendMessage(channel, "pruebasss");

    chatService.setChatChannels([]);
    await chatService.loadChatChannels();
    let loadChannel = chatService.searchChatChannelById(channel.id);
    assert.equal(loadChannel.messages[0].message, "pruebasss");

    expect(spyUpdateFile).toHaveBeenCalled();
    expect(spyAddOwnerToACL).toHaveBeenCalled();
    
    // Delete new channel and new group
    await rdfService.deleteFile(me.base + "/private/dechat_es6b/" + channel.id);
    await rdfService.deleteFile(channel.group);
    assert.equal(await rdfService.readFile(me.base + "/private/dechat_es6b/" + channel.id), null);
    assert.equal(await rdfService.readFile(channel.group), null);
  });

});