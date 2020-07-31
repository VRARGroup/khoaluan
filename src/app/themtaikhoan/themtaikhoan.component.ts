import { Component, OnInit } from '@angular/core';
import { dsq } from '../model/danhsachquyen';
import { tk } from '../model/taikhoan';
import { DanhsachquyenService } from '../service/danhsachquyen.service';
import { Location } from '@angular/common';
import { Router } from "@angular/router";
import { TaikhoanService } from '../service/taikhoan.service';
import { Console } from 'console';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GroupService } from '../service/group.service';
import { grp } from '../model/group';
import { quyentruycap } from '../model/group';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import * as $ from "jquery";

@Component({
  selector: 'app-themtaikhoan',
  templateUrl: './themtaikhoan.component.html',
  styleUrls: ['./themtaikhoan.component.scss']
})
export class ThemtaikhoanComponent implements OnInit {

  allgroup: grp[];
  alldsq: dsq[];
  dtlgrp: Array<any> = [];
  dtldsq: Array<dsq> = [];
  detaildsq: dsq[];
  alltk: tk[];
  alltk_quyen: Array<tk> = [];
  idtk: number;
  hideselected: boolean = false;
  hdt: boolean = false;
  hdf: boolean = false;
  gpf: boolean = false;
  gpt: boolean = false;
  ctk: boolean = false;
  ctc: boolean = false;
  hideselectddb: boolean = true;
  ktthaotacdelete: boolean = false;
  hoatdong: boolean = false;
  selected: number = 9999;
  constructor(@Inject(DOCUMENT) private document: Document, private location: Location, private router: Router, private taikhoanService: TaikhoanService, private danhsachquyenService: DanhsachquyenService, private groupService: GroupService) { }

  ngOnInit() {
    $(".bak").css("height", ($(".card").height() + 10));
    $(".bak").css("width", ($(".card").width()));
    this.hoatdong = JSON.parse(window.localStorage.getItem("editid1"));
    console.log(this.hoatdong);
    document.getElementById("btndx").style.display = "block";
    document.getElementById("btndmk").style.display = "block";
    if (this.hoatdong == false || this.hoatdong == null) {
      this.router.navigate(['appmainnv/login']);
    }
    this.idtk = parseInt(window.localStorage.getItem("idtkq"));
    this.loaddsq();
    this.loadgroup();
    if (!isNaN(this.idtk)) {
      this.loadtaikhoan();
      document.getElementById("delete_tk").style.display = "";
    }
    else {
      if (window.localStorage.getItem("themuser") == "newuser") {
        document.getElementById("delete_tk").style.display = "none";
        this.hdf = true;
        this.gpt = true;
        $('#selectid').css("display", "none");
        $('#labelnq').css("display", "none");
      }
      else {
        this.location.back();
      }
    }
  }

  loadtaikhoan() {
    this.taikhoanService.getcttk_id(this.idtk).subscribe((res: tk[] | null) => {
      this.alltk = (res) ? res : [];
      this.selected = res[0]._id_group;
      $('#username').val(res[0].username);
      $('#pass').val(res[0].password);
      $('#tennv').val(res[0].tennv);
      if (res[0].hoatdong == true) {
        this.hdt = true;
      }
      else {
        this.hdf = true;
      }
      if (res[0].giayphep == true) {
        this.gpt = true;
      }
      else {
        this.gpf = true;
      }
    });
  }

  loaddsq() {
    this.danhsachquyenService.getdanhsachquyen().subscribe((res: dsq[] | null) => {
      this.alldsq = (res) ? res : [];
    });
  }

  loadgroup() {
    this.groupService.getgrp().subscribe((res: grp[] | null) => {
      this.allgroup = (res) ? res : [];
    });
  }

  kiemtraquytc(id: number) {
    for (let i = 0; i < this.alldsq.length; i++) {
      if (this.alldsq[i]._id == id) {
        return this.alldsq[i].tenquyen;
      }
      else
        return null;
    }
  }

  chantk() {
    if (this.gpt == true) {
      this.gpt = false;
      this.gpf = true;
      this.ctk = false;
    }
    else {
      if (this.gpf == true) {
        this.gpt = true;
        this.gpf = false;
        this.ctk = true;
      }
    }
  }
  
  onSubmit() {
    if (!isNaN(this.idtk)) {
      const d = new tk(
        this.idtk,
        document.getElementById("username")["value"],
        document.getElementById("pass")["value"],
        document.getElementById("tennv")["value"],
        false,
        this.ctk,
        this.selected
      );
      console.log(d);
      this.Updatetk(d);
      $('#back').click();
    }
    else {
      const d = new tk(
        0,
        document.getElementById("username")["value"],
        document.getElementById("pass")["value"],
        document.getElementById("tennv")["value"],
        false,
        this.ctk,
        this.selected
      );
      console.log(d);
      this.Createtk(d);
    }
    this.reset();
  }

  Updatetk(t: tk) {
    try {
      this.taikhoanService.updatetk(t).subscribe(
        () => {
          alert('Thực hiện thành công');
        }
      );
    }
    catch
    {
      alert("Error");
      this.router.navigate(['appmainnv/appmainquanly']);
    }
  }

  reset() {
    document.getElementById("username")["value"] = "";
    document.getElementById("pass")["value"] = "";
    document.getElementById("tennv")["value"] = "";
    this.idtk = null;
  }

  Createtk(t: tk) {
    try {
      this.taikhoanService.createtk(t).subscribe(
        () => {
          alert('Lưu thành công.');
        }
      );
    }
    catch
    {
      alert("Error");
      this.router.navigate(['appmainnv/quyentk']);
    }
  }

  Deletetk() {
    try {
      this.taikhoanService.deletetk(this.idtk).subscribe(
        () => {
          this.router.navigate(['appmainnv/quyentk']);
        }
      );
      this.idtk = null;
    }
    catch
    {
      alert("Error");
      this.router.navigate(['appmainnv/quyentk']);
    }
  }

  back() {
    this.location.back();
  }

  valueChange(event) {
    this.selected;
  }
}
