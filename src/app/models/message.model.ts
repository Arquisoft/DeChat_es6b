export class Message {

    id: string;
    makerWebId: string;
    sendTime: Date = new Date();
    message: string;

    constructor(id, makerWebId, message) {
        this.id = id;
        this.makerWebId = makerWebId;
        this.message = message;
    }
}