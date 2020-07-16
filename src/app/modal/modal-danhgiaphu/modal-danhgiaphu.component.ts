import { Component, OnInit, Inject } from '@angular/core';
import { DanhgiaService } from 'src/app/service/danhgia.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal-danhgiaphu',
  templateUrl: './modal-danhgiaphu.component.html',
  styleUrls: ['./modal-danhgiaphu.component.scss']
})
export class ModalDanhGiaPhuComponent implements OnInit {

  idsp: number;
  noidungdanhgia: any;
  dgp: Array<any> = [];
  constructor(private danhgiaService: DanhgiaService, private router: Router, public dialogRef: MatDialogRef<ModalDanhGiaPhuComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) { }

  ngOnInit() {
    this.idsp= this.data.idsp;
    this.noidungdanhgia = this.data.noidungdanhgia;
  }
  danhgia_save_modal() {
    // const dp = new dgphu($('#input' + id).val().toString(), 0, "vinh", false, true, "@")
    // console.log(dp)
    // this.dgp.push(dp);

    // const d = new dg(
    //   id,
    //   null,
    //   null,
    //   null,
    //   null,
    //   null,
    //   null,
    //   null,
    //   this.dgp,
    //   null,
    //   0
    // );
    // this.danhgiaService.insert_binhluan_danhgia(d).subscribe(
    //   () => {
    //     alert('Thực hiện thành công');
    //   }
    // );
  }
}
