export class tk {
    _id: number;
    username: string;
    password: string;
    tennv: string;
    hoatdong: boolean;
    giayphep: boolean;
    _id_group: number;
    constructor(_id: number, username: string, password: string, tennv: string, hoatdong: boolean, giayphep: boolean, _id_group: number) {
        this._id = _id;
        this.username = username;
        this.password = password;
        this.tennv = tennv;
        this.hoatdong = hoatdong;
        this.giayphep = giayphep;
        this._id_group = _id_group;
    }
}