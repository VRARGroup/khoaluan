export class lsanpham {
    _id: number;
    tendanhmuc: string;
    thuonghieu: string;
    dactrung: Array<object>;
   
    constructor( _id: number,  tendanhmuc: string, thuonghieu: string, dactrung: Array<object>) {
    	this._id = _id;
        this.tendanhmuc=tendanhmuc;
    	this.thuonghieu=thuonghieu;
    	this.dactrung=dactrung;
    }
}