export class bl {
    _id: number;
    ten: string;
    gioitinh:boolean;
    email:string;
    noidung:string;
    hinh:Array<string>;
    luotthich:number;
    binhluanphu:Array<blphu>;
    tieuchidanhgia:Array<boolean>;
    _id_sanpham:number;
    ngaybinhluan:Date;
    kiemduyet:boolean;
    constructor(_id: number,  ten: string, gioitinh:boolean, email:string, noidung:string, hinh:Array<string>, luotthich:number, binhluanphu:Array<blphu>, _id_sanpham:number, kiemduyet:boolean) {
        this._id = _id;
        this.ten = ten;
        this.gioitinh =gioitinh;
        this.email = email;
        this.noidung = noidung;
        this.hinh = hinh;
        this.luotthich = luotthich;
        this.binhluanphu = binhluanphu;
        this._id_sanpham = _id_sanpham;
        this.kiemduyet = kiemduyet;
    }
}

export class blphu {
    noidung:string;
    hinh:Array<string>;
    luotthich:number;
    ten: string;
    chucdanh : boolean;
    gioitinh: boolean;
    email:string;
    ngaybinhluanphu:Date;
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