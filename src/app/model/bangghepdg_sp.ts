import { dg, dgphu } from '../model/danhgia';
export class bangghepdg_sp extends dg {
    _id_loaisp: number;
    constructor(_id: number,  sosao: number, ten: string, sdt:string, email:string, noidung:string, hinh:Array<string>, luotthich:number, danhgiaphu:Array<dgphu>, tieuchidanhgia:Array<boolean>, _id_sanpham:number) {
      super(_id, sosao, ten, sdt, email, noidung, hinh, luotthich, danhgiaphu, tieuchidanhgia, _id_sanpham)
    }
}

export class bangghepdgphu_sp extends dgphu {
    constructor(noidung:string, luotthich:number, ten: string, chucdanh : boolean, gioitinh: boolean, email:string) {
      super(noidung, luotthich, ten, chucdanh, gioitinh, email)
    }
}