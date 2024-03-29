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
    tieuchidanhgia:Array<boolean>;
    _id_sanpham:number;
    ngaydanhgia:Date;
    kiemduyet:boolean;
    constructor(_id: number,  sosao: number, ten: string, sdt:string, email:string, noidung:string, hinh:Array<string>, luotthich:number, danhgiaphu:Array<dgphu>, tieuchidanhgia:Array<boolean>, _id_sanpham:number,  kiemduyet:boolean) {
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
        this.kiemduyet = kiemduyet;
    }
}

export class dgphu {
    noidung:string;
    luotthich:number;
    ten: string;
    chucdanh : boolean;
    gioitinh: boolean;
    email:string;
    ngaydanhgiaphu:Date;
    kiemduyetphu:boolean;
    constructor(noidung:string, luotthich:number, ten: string, chucdanh : boolean, gioitinh: boolean, email:string, kiemduyetphu:boolean) {
        this.noidung = noidung;
        this.luotthich = luotthich;
        this.ten = ten;
        this.chucdanh = chucdanh;
        this.gioitinh = gioitinh;
        this.email = email;
        this.kiemduyetphu = kiemduyetphu;
    }
}