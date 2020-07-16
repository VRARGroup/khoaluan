import { Component, OnInit, Inject } from '@angular/core';
import { DanhgiaService } from 'src/app/service/danhgia.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { dg } from '../../model/danhgia';
import { dgphu } from '../../model/danhgia';
import * as $ from "jquery";

@Component({
  selector: 'app-modal-danhgiaphu',
  templateUrl: './modal-danhgiaphu.component.html',
  styleUrls: ['./modal-danhgiaphu.component.scss']
})
export class ModalDanhgiaphuComponent implements OnInit {

  idsp: number;
  noidungdanhgia: any;
  iddg: number;
  dgp: Array<any> = [];
  constructor(private danhgiaService: DanhgiaService, private router: Router, public dialogRef: MatDialogRef<ModalDanhgiaphuComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) { }

  ngOnInit() {
    this.idsp= this.data.idsp;
    this.noidungdanhgia = this.data.noidungdanhgia;
    this.iddg = this.data.iddg;
  }
  danhgia_save_modal() {
    let gt=false;
    if($("#danhgia_male").is(":checked"))
    {
      gt=true;
    }
    const dp = new dgphu(this.noidungdanhgia, 0, $("#hotendgp").val().toString(), false, gt, $("#emaildgp").val().toString())
    console.log(dp)
    this.dgp.push(dp);

    const d = new dg(
      this.iddg,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      this.dgp,
      null,
      parseInt(this.idsp.toString())
    );
    this.danhgiaService.insert_binhluan_danhgia(d).subscribe(
      () => {
        alert('Thực hiện thành công');
      }
    );
    this.dialogRef.close();
  }
}
