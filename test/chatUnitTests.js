import { TestBed } from '@angular/core/testing';
import { ChatService } from '../src/app/services/chat.service';
import * as assert from 'assert';

const timeout = 2100;
const webID = "https://pruebases6b.solid.community/profile/card#me";
const mywebID = "https://gomezivann.inrupt.net"

let chatService;

describe('Chat service logic', function() {
    beforeEach( async () => {
        TestBed.configureTestingModule({
            declarations: [],    
            providers: [ChatService]
         }).compileComponents();
    });
   
    beforeEach( () => {
        chatService = TestBed.get(ChatService);
    });

    beforeEach(() => TestBed.configureTestingModule({}));
    
    it ('new chat', async function() {
        this.timeout(timeout);
        let channel = chatService.createNewChatChannel(webID, "chat de pruebas");
        assert.notEqual(chatService.getRdfService().readFile(mywebID+"/private/dechat_es6b/"+channel.id), null);
    });
    it ('search chat by web id', async function() {
        this.timeout(timeout);
        let channel = chatService.searchChatChannelByParticipantWebid(webID);
        assert.equal(channel.title, "chat de pruebas");
    }); 
    it ('search chat by chat id', async function() {
        this.timeout(timeout);
        let channel = chatService.searchChatChannelById();
        assert.equal(channel.title, "chat de pruebas");
    });
    it ('delete chat', async function() {
        this.timeout(timeout);
        let channel = chatService.searchChatChannelByParticipantWebid(webID);
        chatService.delete(channel);
        channel = chatService.searchChatChannelByParticipantWebid(webID);
        assert.equal(channel, null);
    });
    it ('send message', async function() {
        this.timeout(timeout);
        let channel = chatService.createNewChatChannel(webID, "chat de pruebas");
        this.ChatService.sendMessage(channel, "pruebas");
        assert.equal(channel.messages[0], "pruebas");
        chatService.delete(channel);
    });
    it ('send file', async function() {
        this.timeout(timeout);
        let channel = chatService.createNewChatChannel(webID, "chat de pruebas");
        let file = new File(['foo', 'bar'], 'foobar.txt')
        this.ChatService.sendFile(channel, "pruebas", file);
        assert.notEqual(ChatService.readFile(channel.messages[0]), null);
    });
});