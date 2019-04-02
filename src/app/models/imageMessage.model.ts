import { Message } from "./message.model";

export class ImageMessage extends Message{

    content: File;
    

    constructor(makerWebId: string, message: string, content: File, sendTime: Date = new Date()) {
        super(makerWebId, message, sendTime);
        // this.id = id;
        this.content = content;
    }

    public toString(): String {
        return this.message;
        // return this.makerWebId + ": " + this.message + ". Enviado: " + this.sendTime.toDateString;
     }
}
