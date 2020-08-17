export class email {
    toname: string;
    toemail:string;
    subject:string;
    messager:string;
    
    constructor(toname: string,toemail:string,subject:string,messager:string) {
        this.toname=toname;
        this.toemail=toemail;
        this.subject=subject;
        this.messager=messager;
    }
}