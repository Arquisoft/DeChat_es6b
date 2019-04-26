require('chai');
import { ChatService } from '../src/app/services/chat.service';

var assert = require('assert');

const timeout = 2100;
const webID = "https://pruebases6b.solid.community/profile/card#me";
const mywebID = "https://gomezivann.inrupt.net"

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
        let channel = ChatService.createNewChatChannel(this.webId, "chat de pruebas");
        assert.notEqual(ChatService.getRdfService().readFile(mywebID+"/private/dechat_es6b/"+channel.id), null);
    });
    it ('search chat by web id', async function() {
        this.timeout(timeout);
        let channel = ChatService.searchChatChannelByParticipantWebid(this.webId);
        assert.equal(channel.title, "chat de pruebas");
    }); 
    it ('search chat by chat id', async function() {
        this.timeout(timeout);
        let channel = ChatService.searchChatChannelById();
        assert.equal(channel.title, "chat de pruebas");
    });
    it ('delete chat', async function() {
        this.timeout(timeout);
        let channel = ChatService.searchChatChannelByParticipantWebid(this.webId);
        ChatService.delete(channel);
        channel = ChatService.searchChatChannelByParticipantWebid(this.webId);
        assert.equal(channel, null);
    });
    it ('send message', async function() {
        this.timeout(timeout);
        let channel = ChatService.createNewChatChannel(this.webId, "chat de pruebas");
        this.ChatService.sendMessage(channel, "pruebas");
        assert.equal(channel.messages[0], "pruebas");
        ChatService.delete(channel);
    });
    it ('send file', async function() {
        this.timeout(timeout);
        let channel = ChatService.createNewChatChannel(this.webId, "chat de pruebas");
        let file = new File(['foo', 'bar'], 'foobar.txt')
        this.ChatService.sendFile(channel, "pruebas", file);
        assert.notEqual(ChatService.readFile(channel.messages[0]), null);
    });
});