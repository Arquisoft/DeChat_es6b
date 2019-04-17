import { Message } from './message.model';
import { Participant } from './participant.model';

export class ChatChannel {

    id: string;
    title: string;
    group: string;  // URI del fichero del grupo
    created: Date;
    participants: Participant[];
    messages: Message[];    

    constructor(id: string, title: string, group?: string, created: Date = new Date(),
            messages: Message[] = new Array(), participants: Participant[] = new Array()) {

        this.id = id;
        this.title = title;
        this.group = group;
        this.created = created;
        this.messages = messages;
        this.participants = participants;
    }

    getLastMessage(): Message {
        return (this.messages[this.messages.length-1] != undefined)? (this.messages[this.messages.length-1]) : null;
    }
}
