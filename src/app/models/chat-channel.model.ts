import { Message } from '../models/message.model';

export class ChatChannel {

    id: string;
    title: string;
    participants: string[]; // Array de WebIds
    messages: Message[];

    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
}