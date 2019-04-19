export class Message {

    id: string;
    makerWebId: string;
    sendTime: Date;
    message: string;
    status;

    constructor(makerWebId: string, message: string, sendTime: Date = new Date(), id?:string, status = Message.Status.PENDING) {
        this.id = id;
        this.makerWebId = makerWebId;
        this.message = message;
        this.sendTime = sendTime;
        this.status = status;
    }

}

export namespace Message {
    export  enum Status {
        PENDING,
        READ
    }
}