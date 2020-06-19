export class lsanpham {
    _id: number;
    tendanhmuc: string;
    thuonghieu: Array<string>;
    dactrung: Array<object>;
    tieuchidanhgia: Array<string>;
   
    constructor( _id: number,  tendanhmuc: string, thuonghieu: Array<string>, dactrung: Array<object>, tieuchidanhgia: Array<string>) {
    	this._id = _id;
        this.tendanhmuc=tendanhmuc;
    	this.thuonghieu=thuonghieu;
        this.dactrung=dactrung;
        this.tieuchidanhgia=tieuchidanhgia;
    }
}