export class sp {
    _id: number;
    ten: string;
    thuonghieu: string;
    hinh: Array<hinh>;
    dacdiemnoibat: string;
    giaban: number;
    giamgia: number;
    sosao: number;
    _id_loaisanpham: number;
    thongsokythuat:Array<object>;
   
    constructor( _id: number,  ten: string, thuonghieu: string,  hinh: Array<hinh>, dacdiemnoibat: string,  giaban: number, giamgia: number, sosao: number, _id_loaisanpham: number, thongsokythuat:Array<object>) {
    	this._id = _id;
        this.ten=ten;
    	this.thuonghieu=thuonghieu;
    	this.hinh=hinh;
        this.dacdiemnoibat = dacdiemnoibat;
        this.giaban=giaban;
        this.giamgia=giamgia;
        this.sosao=sosao;
        this._id_loaisanpham=_id_loaisanpham;
        this.thongsokythuat=thongsokythuat;
    }
}

export class hinh
{
    hinhanh: string;
    mota: string;

    constructor(hinhanh: string, mota: string) {
        this.hinhanh = hinhanh;
        this.mota=mota;
    }
}