import { Component, OnInit, ViewChildren, ViewChild, ElementRef, QueryList, ChangeDetectorRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { Router } from "@angular/router";
import { LoaisanphamService } from '../service/loaisanpham.service';
import { lsanpham } from '../model/loaisanpham';
import { SanphamService } from '../service/sanpham.service';
import { sp } from '../model/sanpham';
import { hinh } from '../model/sanpham';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material';
import { dsq } from '../model/danhsachquyen';
import { DanhsachquyenService } from '../service/danhsachquyen.service';
import { GroupService } from '../service/group.service';
import { quyentruycap } from '../model/group';
import { grp } from '../model/group';

@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.scss']
})
export class ThongkeComponent implements OnInit {

  alllsp: lsanpham[] = [];
  spidlsp: sp[] = [];
  limitsp: sp[] = [];
  lspth: lsanpham[] = [];
  tensanpham: sp[] = [];
  tensanphamphu: sp[] = [];
  thuhieu: Array<string> = [];
  quyentc: Array<quyentruycap> = [];
  hoatdong: boolean = false;
  alldsq: dsq[] = [];
  idgrp: number;
  public idtk: number;
  _id_group: number;
  tendanhmuc: string = null;
  p: number = 1;
  quanlytk = false;
  quanlysp = false;
  quanlylsp = false;
  searchText: string = null;
  sosao: any[] = [];
  index: string = "";
  thongke_sp: any[] = [];
  thongke_lsp: any[] = [];
  constructor(private formBuilder: FormBuilder, private router: Router, private loaisanphamService: LoaisanphamService, private sanphamService: SanphamService,
    private danhsachquyenService: DanhsachquyenService, private groupService: GroupService) {   }

  ngOnInit() {
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
    $(".btn-group .button").css("background-color", "#fff");
    $(".btn-group .button").css("color", "#000");
    $("#btn_lsp_" + id + " .button").css("background-color", "#ec314d");
    $("#btn_lsp_" + id + " .button").css("color", "#fff");
  }

  loadtensp(tensp: string) {
    this.sanphamService.gettensp(tensp).subscribe((res: sp[] | null) => {
      this.tensanpham = (res) ? res : [];
      this.tensanphamphu = this.tensanpham;
      console.log("tensanpham", res);
    });
    this.searchText = null;
    this.p = 1;
    $(".btn-group-vertical .buttonth").css("background-color", "#fff");
    $(".btn-group-vertical .buttonth").css("color", "#000");
    $("#btn_sp_thuonghieu_" + tensp.replace(' ', '').replace(',', '').replace('(', '').replace(')', '') + " .buttonth").css("background-color", "#ec314d");
    $("#btn_sp_thuonghieu_" + tensp.replace(' ', '').replace(',', '').replace('(', '').replace(')', '') + " .buttonth").css("color", "#fff");
  }

  chitietsp(cv: number): void {
    if (this.quanlysp == true) {
      window.localStorage.setItem("tlspid", null);
      window.localStorage.removeItem("editspid");
      window.localStorage.setItem("editspid", cv.toString());
      console.log(cv.toString());
      this.router.navigate(['appmainnv/taosanpham']);
    }
  }

  gtsp(cv: number): void {
    window.localStorage.setItem("editspid", null);
    window.localStorage.removeItem("editspid");
    window.localStorage.setItem("editspid", cv.toString());
    console.log(cv.toString());
    this.router.navigate(['appmainnv/reviewsp']);
  }

  load_thong_ke_sp() {
    this.sanphamService.get_thong_ke_sp().subscribe((res: any[] | null) => {
      this.thongke_sp = (res) ? res : [];
    });

    $(".thongke-lsp").css("display", "none");
    $(".thongke-sp").css("display", "block");
    $(".thongke-loai").css("display", "none");
    $(".thongke-sosao").css("display", "none");
    $("#thongke_sp").css("background-color", "#fff");
    $("#thongke_sp").css("color", "#000");
    $("#thongke_spnoibat").css("background-color", "#ec314d");
    $("#thongke_spnoibat").css("color", "#fff");
    $("#thongke_sosao").css("background-color", "#fff");
    $("#thongke_sosao").css("color", "#000");
    this.index = "_SanPham_DanhGia";
  }

  load_thong_ke_loai_sp() {
    this.sanphamService.get_thong_ke_lsp().subscribe((res: any[] | null) => {
      this.thongke_lsp = (res) ? res : [];
    });

    $(".thongke-lsp").css("display", "block");
    $(".thongke-sp").css("display", "none");
    // $(".thongke-loai").css("display", "block");
    $(".thongke-sosao").css("display", "none");
    $("#thongke_spnoibat").css("background-color", "#fff");
    $("#thongke_spnoibat").css("color", "#000");
    $("#thongke_sp").css("background-color", "#ec314d");
    $("#thongke_sp").css("color", "#fff");
    $("#thongke_sosao").css("background-color", "#fff");
    $("#thongke_sosao").css("color", "#000");
    this.index = "_Loai_San_Pham";
  }

  load_thong_ke_sao() {
    $(".thongke-lsp").css("display", "none");
    $(".thongke-sp").css("display", "none");
    $(".thongke-loai").css("display", "none");
    $(".thongke-sosao").css("display", "block");
    $("#thongke_spnoibat").css("background-color", "#fff");
    $("#thongke_spnoibat").css("color", "#000");
    $("#thongke_sp").css("background-color", "#fff");
    $("#thongke_sp").css("color", "#000");
    $("#thongke_sosao").css("background-color", "#ec314d");
    $("#thongke_sosao").css("color", "#fff");
    this.sanphamService.load_thong_ke_sosao().subscribe((res: any[] | null) => {
      this.sosao = (res) ? res : [];
    });
    this.index = "_SoSao";
  }

  download() {
    var csvData;
    var name = "";
    if (this.index == "") {
      csvData = this.ConvertToCSV(this.tensanpham);
    }
    else if (this.index == "_SoSao") {
      csvData = this.ConvertToCSV(this.sosao);
    }
    else if (this.index == "_SanPham_DanhGia") {
      csvData = this.ConvertToCSV(this.thongke_sp);
    }
    else if (this.index == "_Loai_San_Pham") {
      csvData = this.ConvertToCSV(this.thongke_lsp);
    }
    var blob = new Blob(["\ufeff" + csvData], { type: 'text/csv;' });
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, "Thong_Ke.csv");
    } else {
      var a = document.createElement("a");
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'Thong_Ke' + this.index + '.csv';
      a.click();
      return 'success';
    }
  }

  ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";

    for (var index in objArray[0]) {
      row += index + ',';
    }
    if (this.index == "_SoSao") {
      str += "BẢNG THỐNG KÊ SỐ LƯỢNG SẢN PHẨM THEO SỐ SAO" + '\r\n \r\n';
      str += "Số Sao,Số Lượng Sản Phẩm" + '\r\n';
      row = "";
    }
    else if (this.index == "_SanPham_DanhGia") {
      str += "BẢNG THỐNG KÊ SỐ LƯỢNG ĐÁNH GIÁ CỦA SẢN PHẨM" + '\r\n \r\n';
      str += "Tên Sản Phẩm,Số Lượng Đánh Giá,Tổng Số Sao Đánh Giá" + '\r\n';
      row = "";
    }
    else if (this.index == "_Loai_San_Pham") {
      str += "BẢNG THỐNG KÊ SỐ LƯỢNG SẢN PHẨM CỦA LOẠI SẢN PHẨM" + '\r\n \r\n';
      str += "Tên Loại Sản Phẩm,Số Lượng Sản Phẩm,Tổng Số Thương Hiệu" + '\r\n';
      row = "";
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        line += typeof array[i][index] == 'object' || index == "dacdiemnoibat" ? '"' + JSON.stringify(array[i][index]).replace(/"/g, '""').replace(/,/g, '\,') + '",' : array[i][index].toString() + ',';
      }
      str += line + '\r\n';
    }
    return str;
  }

}
