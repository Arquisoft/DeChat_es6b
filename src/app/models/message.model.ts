export class Message {

    // id: string;
    makerWebId: string;
    sendTime: Date;
    message: string;

    constructor(makerWebId: string, message: string, sendTime: Date = new Date()) {
        // this.id = id;
        this.makerWebId = makerWebId;
        this.message = message;
        this.sendTime = sendTime;
    }

    public toString(): String {
        return this.message;
        // return this.makerWebId + ": " + this.message + ". Enviado: " + this.sendTime.toDateString;
     }
}
