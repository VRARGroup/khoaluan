import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";
import * as $ from "jquery";
import { dg, dgphu } from '../model/danhgia';
// import { bl, blphu } from '../model/binhluan';
import { HttpClient } from '@angular/common/http';
import { SanphamService } from '../service/sanpham.service';
import { DanhgiaService } from '../service/danhgia.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { Observable, from } from 'rxjs';
import { LoaisanphamService } from '../service/loaisanpham.service';
import { sp } from '../model/sanpham';
import { hinh } from '../model/sanpham';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material';
import { dsq } from '../model/danhsachquyen';
import { DanhsachquyenService } from '../service/danhsachquyen.service';
import { GroupService } from '../service/group.service';
import { quyentruycap } from '../model/group';
import { grp } from '../model/group';
import { lsanpham } from '../model/loaisanpham';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-repbinhluan',
  templateUrl: './repbinhluan.component.html',
  styleUrls: ['./repbinhluan.component.scss']
})
export class RepbinhluanComponent implements OnInit {
  hoatdong: boolean;
  alllsp: lsanpham[] = [];
  spidlsp: sp[] = [];
  limitsp: sp[] = [];
  lspth: lsanpham[] = [];
  tensanpham: sp[] = [];
  tensanphamphu: sp[] = [];
  thuhieu: Array<string> = [];
  quyentc: Array<quyentruycap> = [];
  alldsq: dsq[] = [];
  idgrp: number;
  public idtk: number;
  _id_group: number;
  tendanhmuc: string = null;
  items_danhgia: dg[] = [];
  active_null_dg: boolean = false;
  active_null_bl: boolean = false;
  items_binhluan: dg[] = [];
  alllsp_danhgia: number[] = [];
  alllsp_danhgia_1day: dg[] = [];
  constructor(private location: Location, private formBuilder: FormBuilder, private router: Router, private loaisanphamService: LoaisanphamService, private sanphamService: SanphamService, private danhgiaService: DanhgiaService, private danhsachquyenService: DanhsachquyenService, private groupService: GroupService) { }

  ngOnInit() {
    $("#btndx").css("display", "block");
    this.hoatdong = JSON.parse(window.localStorage.getItem("editid1"));
    if (this.hoatdong == false || this.hoatdong == null) {
      window.localStorage.removeItem("truycaptraiphep");
      window.localStorage.setItem("truycaptraiphep", "out");
      this.router.navigate(['appmainnv/login']);
    }
    if (window.localStorage.getItem("teng").toUpperCase() != "ADMIN" && window.localStorage.getItem("teng").toUpperCase() != "NHÂN VIÊN") {
      this.location.back();
    }
    document.getElementById("btndx").style.display = "block";
    var d = JSON.parse(window.localStorage.getItem("danhsachquyentruycap"));
    this.quyentc = d;
    this.hoatdong = JSON.parse(window.localStorage.getItem("editid1"));
    this.idgrp = parseInt(window.localStorage.getItem("idg"));
    console.log(this.idgrp);
    document.getElementById("btndx").style.display = "block";
    if (this.hoatdong == false || this.hoatdong == null) {
      this.router.navigate(['appmainnv/login']);
    }
    else {
      this.loadlsp();
      this.loaddsq();
    }
  }

  quanlytk = false;
  quanlysp = false;
  quanlylsp = false;

  loaddsq() {
    this._id_group = parseInt(window.localStorage.getItem("idg"));
    this.groupService.getdetaillgrp(this._id_group).subscribe((res: grp[] | null) => {
      for (let i = 0; i < res[0].danhsachquyentruycap.length; i++) {

        this.danhsachquyenService.getdetaildanhsachquyen(res[0].danhsachquyentruycap[i]._id_quyen).subscribe((res: dsq[] | null) => {
          if (res[0].tenquyen.toUpperCase() == "QUẢN LÝ TÀI KHOẢN") {
            this.quanlytk = true;
          }
          if (res[0].tenquyen.toUpperCase() == "QUẢN LÝ SẢN PHẨM") {
            this.quanlysp = true;
          }
          if (res[0].tenquyen.toUpperCase() == "QUẢN LÝ LOẠI SẢN PHẨM") {
            this.quanlylsp = true;
          }
        });
      }
    });
  }

  loadlsp() {
    this.loaisanphamService.getlsp().subscribe((res: lsanpham[] | null) => {
      this.alllsp = (res) ? res : [];
    });
  }

  loadspid_lsp(id: number) {
    this.sanphamService.getsp_idlsp(id).subscribe((res: sp[] | null) => {
      this.spidlsp = (res) ? res : [];
    });
  }

  loaddetaillsp(id: number, tendanhmuc: string) {
    this.loaisanphamService.getdetaillsp(id).subscribe((res: lsanpham[] | null) => {
      this.lspth = (res) ? res : [];
    });
    this.loadtensp(id + ',' + 'v');
    this.tendanhmuc = tendanhmuc;
    this.p = 1;
    this.load_danhgia_1day();
  }

  load_danhgia_1day() {
    this.danhgiaService.get_danhgia_1day().subscribe((res: dg[] | null) => {
      this.alllsp_danhgia_1day = (res) ? res : [];
      if (this.alllsp_danhgia_1day.length > 0) {
        let i=0;
        this.lspth.forEach(element => {
          this.loadtensp(element._id+','+i);
          this.tensanpham.forEach(element => {

          });
          $('#lspth_' + element._id).after('<div style="background-color: red;color: #fff;border-radius: 10px;width: 22px;height: 22px;padding: 1px;position: absolute;z-index: 10;top: -8px;right: 5px;">' + this.alllsp_danhgia_1day.filter(x => x.danhgiaphu.length == 0 && x._id_sanpham == element._id).length + '</div>');
        });
      }
    });
  }
  loadtensp(tensp: string) {
    this.sanphamService.gettensp(tensp).subscribe((res: sp[] | null) => {
      this.tensanpham = (res) ? res : [];
      this.tensanphamphu = this.tensanpham;
      console.log("tensanpham", res);
    });
    this.p = 1;
    this.active_null_dg = false;
    this.active_null_bl = false;
  }

  loaddanhgia(cv: number): void {
    this.danhgiaService.getdg_idsp(cv).subscribe((res: dg[] | null) => {
      this.items_danhgia = (res) ? res : [];
    });
    this.danhgiaService.getdg_idsp(cv).subscribe((res: dg[] | null) => {
      this.items_binhluan = (res) ? res : [];
    });
    this.active_null_dg = this.active_null_bl = true;
    $("tbody tr").css('color', '#000');
    $("#tr_" + cv).css('color', 'red');
  };

  p: number = 1;

  gtsp(cv: number): void {
    window.localStorage.setItem("editspid", null);
    window.localStorage.removeItem("editspid");
    window.localStorage.setItem("editspid", cv.toString());
    console.log(cv.toString());
    this.router.navigate(['appmainnv/reviewsp']);
  };

  searchText: string = null;

  inputsearch() {

    let l: Array<sp> = [];
    l = this.tensanpham;
    let textkt: string = this.searchText;
    if (this.searchText != null) {
      if (this.tendanhmuc != null) {
        if (this.tendanhmuc.toUpperCase() != "TIVI") {
          if (this.searchText.toUpperCase().startsWith(this.tendanhmuc.toUpperCase()) == true) {
            textkt = this.searchText.toUpperCase().replace(this.tendanhmuc.toUpperCase(), "").trim();
          }
          l = this.tensanphamphu.filter(x => x.ten.toString().toUpperCase().replace(this.tendanhmuc.toUpperCase(), "").trim().startsWith(textkt.toString().toUpperCase()));
          console.log(l);
          this.tensanpham = l;
        }
        else {
          if (this.searchText.toUpperCase().startsWith(this.tendanhmuc.toUpperCase()) == true) {
            textkt = this.searchText.toUpperCase().replace(this.tendanhmuc.toUpperCase(), "").trim();
          }
          else {
            if (this.searchText.toUpperCase().startsWith("ANDROID" + " " + this.tendanhmuc.toUpperCase()) == true) {
              textkt = this.searchText.toUpperCase().replace("ANDROID" + " " + this.tendanhmuc, "").trim();
            }
            else {
              if (this.searchText.toUpperCase().startsWith("SMART" + " " + this.tendanhmuc.toUpperCase()) == true) {
                textkt = this.searchText.toUpperCase().replace("SMART" + " " + this.tendanhmuc.toUpperCase(), "").trim();
              }
            }
          }
          l = this.tensanphamphu.filter(x => x.ten.toString().toUpperCase().replace("ANDROID" + " " + this.tendanhmuc.toUpperCase(), "").trim().startsWith(textkt.toString().toUpperCase()));
          if (l.length == 0) {
            l = this.tensanphamphu.filter(x => x.ten.toString().toUpperCase().replace("SMART" + " " + this.tendanhmuc.toUpperCase(), "").trim().startsWith(textkt.toString().toUpperCase()));
          }
          this.tensanpham = l;
        }
      }
      else {
        alert("Bạn vui lòng chọn loại sản phẩm cần tìm kiếm !!!");
      }
    }
    else {
      console.log(this.tensanphamphu);
      this.tensanpham = this.tensanphamphu;
    }
  }
  arrayOne(n: number): any[] {
    return Array(n);
  }
  arrayTwo(n: number): any[] {
    return Array(5 - n);
  }
  show(id: number) {
    let items_danhgiaphu: dgphu[] = this.items_danhgia.find(x => x._id == id).danhgiaphu;
    return items_danhgiaphu;
  }
  show_bl(id: number) {
    let items_binhluanphu: dgphu[] = this.items_binhluan.find(x => x._id == id).danhgiaphu;
    return items_binhluanphu;
  }
  show_box_danhgiaphu(id: number) {
    if ($('#reply_box_danhgiaphu' + id).length > 0) {
      $('#reply_box_danhgiaphu' + id + " textarea").val("");
    } else {
      $('#reply_danhgiaphu' + id).after('<div id = "reply_box_danhgiaphu' + id + '" class="reply-box" style="display: inline-flex;"> <textarea style="border: 1px solid #ddd;border-radius: 4px;-webkit-border-radius: 4px;font-size: 14px;color: #999;padding: 8px;width: 50vw;margin-top: 0px;margin-bottom: 0px;height: 58px;margin-left: 30px;"></textarea><a style="padding: 9px 10px; border: 1px solid #288ad6; background: #fff;font-size: 13px;color: #288ad6;border-radius: 4px;height: 36px;margin-left: 10px;">Trã lời</a></div>');
    }
  }
  show_box_binhluanphu(id: number) {
    if ($('#reply_box_binhluanphu' + id).length > 0) {
      $('#reply_box_binhluanphu' + id + " textarea").val("");
    } else {
      $('#reply_binhluanphu' + id).after('<div id = "reply_box_binhluanphu' + id + '" class="reply-box" style="display: inline-flex;"> <textarea style="border: 1px solid #ddd;border-radius: 4px;-webkit-border-radius: 4px;font-size: 14px;color: #999;padding: 8px;width: 50vw;margin-top: 0px;margin-bottom: 0px;height: 58px;margin-left: 30px;"></textarea><a style="padding: 9px 10px; border: 1px solid #288ad6; background: #fff;font-size: 13px;color: #288ad6;border-radius: 4px;height: 36px;margin-left: 10px;">Trã lời</a></div>');
    }
  }
}
