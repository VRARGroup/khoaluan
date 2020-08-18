export class nav {
    id_lsp: number;
    tenlsp: string;
    listthuonghieu:Array<string>;
    
    constructor(id_lsp: number,  tenlsp: string, listthuonghieu: Array<string>) {
        this.id_lsp = id_lsp;
        this.tenlsp = tenlsp;
        this.listthuonghieu = listthuonghieu;
    }
}