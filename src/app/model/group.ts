export class grp {
    _id: number;
    tengroup: string;
    danhsachquyentruycap: Array<quyentruycap>;
    constructor(_id: number, tengroup: string, danhsachquyentruycap: Array<quyentruycap>) {
        this._id = _id;
        this.tengroup = tengroup;
        this.danhsachquyentruycap = danhsachquyentruycap;
    }
}

export class quyentruycap
{
    _id_quyen: number;

    constructor(_id_quyen: number) {
        this._id_quyen=_id_quyen;
    }
}