export class Message {

    // id: string;
    makerWebId: string;
    sendTime: Date = new Date();
    message: string;

    constructor(makerWebId: string, message: string) {
        // this.id = id;
        this.makerWebId = makerWebId;
        this.message = message;
    }

    public toString(): String {
        return this.message;
        // return this.makerWebId + ": " + this.message + ". Enviado: " + this.sendTime.toDateString;
     }
}
