import { Message } from './message.model';

export class ChatChannel {

    id: string;
    title: string;
    created: Date;
    participants: string[]; // Array de WebIds
    messages: Message[];

    constructor(id: string, title: string, created: Date = new Date(),
            participants: string[] = new Array(), messages: Message[] = new Array()) {

        this.id = id;
        this.title = title;
        this.created = created
        this.participants = participants;
        this.messages = messages;
    }
}
