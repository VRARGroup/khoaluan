export class dg {
    _id: number;
    sosao: number;
    ten: string;
    sdt:string;
    email:string;
    noidung:string;
    hinh:Array<string>;
    luotthich:number;
    danhgiaphu:Array<dgphu>;
    tieuchidanhgia:Array<object>;
    _id_sanpham:number;
    constructor(_id: number,  sosao: number, ten: string, sdt:string, email:string, noidung:string, hinh:Array<string>, luotthich:number, danhgiaphu:Array<dgphu>, tieuchidanhgia:Array<object>, _id_sanpham:number) {
        this._id = _id;
        this.sosao = sosao;
        this.ten = ten;
        this.sdt =sdt;
        this.email = email;
        this.noidung = noidung;
        this.hinh = hinh;
        this.luotthich = luotthich;
        this.danhgiaphu = danhgiaphu;
        this.tieuchidanhgia = tieuchidanhgia;
        this._id_sanpham = _id_sanpham;
    }
}

export class dgphu {
    noidung:string;
    luotthich:number;
    ten: string;
    gioitinh: boolean;
    email:string;
    constructor(noidung:string, luotthich:number, ten: string, gioitinh: boolean, email:string) {
        this.noidung = noidung;
        this.luotthich = luotthich;
        this.ten = ten;
        this.gioitinh = gioitinh;
        this.email = email;
    }
}