import { Message } from './message.model';
import { Participant } from './participant.model';

export class ChatChannel {

    id: string;
    title: string;
    created: Date;
    participants: Participant[];
    messages: Message[];

    constructor(id: string, title: string, created: Date = new Date(),
            messages: Message[] = new Array(), participants: Participant[] = new Array()) {

        this.id = id;
        this.title = title;
        this.created = created;
        this.messages = messages;
        this.participants = participants;
    }
}
