import { Message } from '../models/message.model';

export class ChatChannel {

    id: string;
    title: string;
    participants: string[] = new Array(); // Array de WebIds
    messages: Message[] = new Array();;

    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
}