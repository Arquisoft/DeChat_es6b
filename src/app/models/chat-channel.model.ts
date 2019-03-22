import { Message } from './message.model';

export class ChatChannel {

    id: string;
    title: string;
    participants: string[] = new Array(); // Array de WebIds
    created: Date = new Date();
    messages: Message[] = new Array();

    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
}
