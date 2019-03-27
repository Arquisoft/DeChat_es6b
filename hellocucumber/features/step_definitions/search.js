
import { ChatService } from '../services/chat.service';

const assert = require('assert');
const { Given, When, Then } = require('cucumber');

Given("I am logged and in the chat view", () => {
    PO_LoginView.login("GomezIvann", "lo que sea");
});

