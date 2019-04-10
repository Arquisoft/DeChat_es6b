import { Message } from "./message.model";

export class FileMessage extends Message{

    content: File;
    

    constructor(makerWebId: string, message: string, content: File, sendTime: Date = new Date()) {
        super(makerWebId, message, sendTime);
        // this.id = id;
        this.content = content;
    }
    
}
