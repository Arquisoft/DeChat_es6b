require('chai');
import { ChatService } from '../src/app/services/chat.service';

var assert = require('assert');

const timeout = 2100;
const webID = "https://pruebases6b.solid.community/profile/card#mey";
//const password = "Podpruebas_6b";

describe('Chat service logic', function() {
    it ('new chat', async function() {
        this.timeout(timeout);
        ChatService.createNewChatChannel(this.webId, "chat de pruebas");
        const channel = ChatService.searchChatChannelByParticipantWebid(this.webId);
        assert.equal(channel.title, "chat de pruebas");
    });
    it ('search chat', async function() {
        this.timeout(timeout);
        const channel = ChatService.searchChatChannelByParticipantWebid(this.webId);
        assert.equal(channel.title, "chat de pruebas");
    }); 
    it ('delete chat', async function() {
        this.timeout(timeout);
        const channel = ChatService.searchChatChannelByParticipantWebid(this.webId);
        ChatService.delete(channel);
        channel = ChatService.searchChatChannelByParticipantWebid(this.webId);
        assert.equal(channel, null);
    });
});