export class Message {

    id: string;
    makerWebId: string;
    sendTime: Date = new Date();
    message: string;

    constructor(id, message) {
        this.id = id;
        this.message = message;
    }
}