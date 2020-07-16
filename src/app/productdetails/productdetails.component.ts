import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";
import { SanphamService } from '../service/sanpham.service';
import { LoaisanphamService } from '../service/loaisanpham.service';
import { DanhgiaService } from '../service/danhgia.service';
import { sp } from '../model/sanpham';
import { DomSanitizer } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { fadeInItems } from '@angular/material';
import * as $ from "jquery";
import { debug } from 'console';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Location } from '@angular/common';
import { dg } from '../model/danhgia';
import { dgphu } from '../model/danhgia';

import { ModalThongsokythuatComponent } from '../modal/modal-thongsokythuat/modal-thongsokythuat.component';
import { ModalDanhgiaComponent } from '../modal/modal-danhgia/modal-danhgia.component';
import { ModalDanhGiaPhuComponent } from '../modal/modal-danhgiaphu/modal-danhgiaphu.component';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})
export class ProductdetailsComponent implements OnInit {

  // @ViewChild('div') div:ElementRef;
  items: sp[] = [];
  // specials:any[] = [];
  htmlContent: string;
  same_products: sp[] = [];
  giamgia: number;
  same_price_products: sp[] = [];
  textarea_count: number = 0;
  sosao: number = 0;
  valuetext: string = null;
  serverPath: String = "";
  urls = [];
  isImageSaved: boolean = false;
  public progress: number;
  responseimage: any = [];
  kthttp: string = "https://";
  hinhthuctesp: Array<any> = [];
  ktsavedhinhthuctesanpham: boolean = false;
  idsp: number = null;
  resulf_danhgia: any[] = [];
  star: number = 0;
  items_danhgia: dg[];
  items_danhgiaphu: dgphu[];
  constructor(public route: ActivatedRoute, private location: Location, private http: HttpClient, private router: Router, private sanphamService: SanphamService, private danhgiaService: DanhgiaService, private _sanitizer: DomSanitizer, public dialog: MatDialog, private loaisanphamService: LoaisanphamService) {
  }
  ngOnInit() {
    let id_sanpham = this.route.snapshot.params.id;
    this.idsp = id_sanpham;
    console.log(this.idsp);
    if (isNaN(id_sanpham))
      this.router.navigate(["appmain/products"]);
    this.get_product_details(id_sanpham);
    document.getElementById('dropdown-menu').style.display = "";
    document.getElementById('html').style.backgroundColor = "#fff";
    document.getElementById('html').style.backgroundImage = "none";
    document.getElementById('html').style.backgroundColor = "#fff";
    window.scroll(0, 0);
    this.loaddanhgia()
    console.log(this.idsp);


    // setTimeout(() => {
    //   if(id_sanpham == null || id_sanpham == undefined)
    //     this.router.navigate(["appmain/products"]);

    //   }, 800);
  }

  show_thongsokythuat(name, thongsokythuat): void {
    const dialogRef = this.dialog.open(ModalThongsokythuatComponent, {
      width: 'auto',
      height: '100vh',
      data: {
        name: name,
        thongsokythuat: thongsokythuat,
      }
    });
  }
  show_modal_danhgia(name): void {
    const dialogRef = this.dialog.open(ModalDanhgiaComponent, {
      width: 'auto',
      height: '99vh',
      data: {
        idsp: this.idsp,
        name: name,
        resulf_danhgia: this.resulf_danhgia,
      }
    });
  }

  get_product_details(id: number) {
    this.sanphamService.get_product_details(id).subscribe((res: sp[] | null) => {
      this.items = (res) ? res : [];
      this.get_same_products(id);
      this.get_same_price_products(id);
      this.check_tieuchidanhgia(this.items[0]._id_loaisanpham);
    });
  }

  keys(obj) {
    return Object.keys(obj);
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }
  arrayTwo(n: number): any[] {
    return Array(5 - n);
  }

  customOptions: OwlOptions = {
    loop: false,
    autoplay: true,
    center: false,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 3,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    }
  }

  get_same_products(id_sanpham: number) {
    this.sanphamService.get_same_products(id_sanpham).subscribe((res: sp[] | null) => {
      this.same_products = (res) ? res : [];
    });
  }
  render_sp(id_sanpham: any): void {
    window.localStorage.removeItem("sp");
    window.localStorage.setItem("sp", id_sanpham.toString());

    // this.router.navigate(["appmain/productdetails"]);
    window.location.href = "appmain/productdetails";
  }
  get_same_price_products(id_sanpham: number) {
    this.sanphamService.get_same_price_products(id_sanpham).subscribe((res: sp[] | null) => {
      this.same_price_products = (res) ? res : [];
    });
  }
  customOptions_same: OwlOptions = {
    loop: false,
    autoplay: false,
    center: false,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 5,
      },
    }
  }
  show_article_image() {
    document.getElementById('article_image').style.height = "100%";
    document.getElementById('more_info_gioithieu').style.display = "none";
  }
  show_dacdiemnoibat_image() {
    document.getElementById('info_dacdiemnoibat').style.height = "100%";
    document.getElementById('more_info_dacdiemnoibat').style.display = "none";
  }
  show_hide_danhgiasosao() {
    if (document.getElementById('comment_1').style.height == "100%") {
      if (this.resulf_danhgia.length > 0) {
        document.getElementById("comment_1").style.height = this.resulf_danhgia.length * 36 + 60 + "px";
      }
      else {
        document.getElementById("comment_1").style.height = "192px";
      }
      document.getElementById('show_hide_danhgiasosao').style.backgroundColor = "#288ad6";
      document.getElementById('show_hide_danhgiasosao').innerText = "Đánh giá ngay";
    }
    else {
      document.getElementById('comment_1').style.height = "100%";
      document.getElementById('show_hide_danhgiasosao').style.backgroundColor = "red";
      document.getElementById('show_hide_danhgiasosao').innerText = "Hủy";
    }
  }
  textarea_text_change(value: string) {
    this.textarea_count = $('#textarea_danhgiasosao').val().toString().length;
    this.valuetext = $('#textarea_danhgiasosao').val().toString();
    console.log(this.valuetext);
  }
  mouseover_star(star: any) {
    if (star == 1) {
      $('#star_1').css("color", "#fc9639");
      $('#star_2').css("color", "#000");
      $('#star_3').css("color", "#000");
      $('#star_4').css("color", "#000");
      $('#star_5').css("color", "#000");
    }
    if (star == 2) {
      $('#star_1').css("color", "#fc9639");
      $('#star_2').css("color", "#fc9639");
      $('#star_3').css("color", "#000");
      $('#star_4').css("color", "#000");
      $('#star_5').css("color", "#000");
    }
    if (star == 3) {
      $('#star_1').css("color", "#fc9639");
      $('#star_2').css("color", "#fc9639");
      $('#star_3').css("color", "#fc9639");
      $('#star_4').css("color", "#000");
      $('#star_5').css("color", "#000");
    }
    if (star == 4) {
      $('#star_1').css("color", "#fc9639");
      $('#star_2').css("color", "#fc9639");
      $('#star_3').css("color", "#fc9639");
      $('#star_4').css("color", "#fc9639");
      $('#star_5').css("color", "#000");
    }
    if (star == 5) {
      $('#star_1').css("color", "#fc9639");
      $('#star_2').css("color", "#fc9639");
      $('#star_3').css("color", "#fc9639");
      $('#star_4').css("color", "#fc9639");
      $('#star_5').css("color", "#fc9639");
    }
  }
  choose_star(star: any) {
    this.star = star;
  }
  mouseleave_star() {
    let star = this.star;
    if (star == 1) {
      $('#star_1').css("color", "#fc9639");
      $('#star_2').css("color", "#000");
      $('#star_3').css("color", "#000");
      $('#star_4').css("color", "#000");
      $('#star_5').css("color", "#000");
    }
    if (star == 2) {
      $('#star_1').css("color", "#fc9639");
      $('#star_2').css("color", "#fc9639");
      $('#star_3').css("color", "#000");
      $('#star_4').css("color", "#000");
      $('#star_5').css("color", "#000");
    }
    if (star == 3) {
      $('#star_1').css("color", "#fc9639");
      $('#star_2').css("color", "#fc9639");
      $('#star_3').css("color", "#fc9639");
      $('#star_4').css("color", "#000");
      $('#star_5').css("color", "#000");
    }
    if (star == 4) {
      $('#star_1').css("color", "#fc9639");
      $('#star_2').css("color", "#fc9639");
      $('#star_3').css("color", "#fc9639");
      $('#star_4').css("color", "#fc9639");
      $('#star_5').css("color", "#000");
    }
    if (star == 5) {
      $('#star_1').css("color", "#fc9639");
      $('#star_2').css("color", "#fc9639");
      $('#star_3').css("color", "#fc9639");
      $('#star_4').css("color", "#fc9639");
      $('#star_5').css("color", "#fc9639");
    }
    this.sosao = star;
  }

  openFile() {
    console.log('hell')
    document.getElementById('uploadCaptureInputFile').click();
  }

  check_tieuchidanhgia(_id_loaisanpham: number) {
    this.loaisanphamService.check_tieuchidanhgia(_id_loaisanpham).subscribe((res: any | null) => {
      this.resulf_danhgia = (res) ? res : [];

      if (this.resulf_danhgia.length > 0 && this.resulf_danhgia.length < 5) {
        $("#comment_1_1").css("display", "none");
        $("#comment_1").css("height", "235px");
      } else if (this.resulf_danhgia.length > 0) {
        $("#comment_1_1").css("display", "none");
        $("#comment_1").css("height", this.resulf_danhgia.length * 36 + 60 + "px");
      }
      else {
        $("#comment_1_2").css("display", "none");
      }
    });
  }
  resize(class_textare: any) {
    $(class_textare).css("height", 'auto');
    $(class_textare).css("height", $(class_textare)[0].scrollHeight + 'px');
  }
  textarea() {
    $(".comment-3-textarea").css("display", "none");
    $(".comment-3-textarea-show").css("display", "");
  }
  render_textarea() {
    $(".comment-3-textarea").css("display", "none");
    $(".comment-3-textarea-show").css("display", "");
    $(".comment-3-textarea-show")[0].scrollIntoView();
    $(".textarea_danhgia").focus();
  }

  getvalue(v: number) {
    this.kthttp = this.urls[v];
    if (this.kthttp.startsWith("https://") == false) {
      this.hinhthuctesp.push("https://localhost:44309/Resources/Images/" + this.urls[v]);
      this.ktsavedhinhthuctesanpham = true;
    }
    else {
      this.hinhthuctesp.push(this.urls[v]);
      this.ktsavedhinhthuctesanpham = true;
    }
  }

  public uploadFileimage = (files) => {
    if (files.length === 0) {
      return;
    }
    if (this.urls.length < 4) {
      let fileToUpload = <File>files[0];
      this.urls.push(fileToUpload.name);
      this.isImageSaved = true;
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      this.http.post('https://localhost:44309/api/saveimagefolder', formData, { reportProgress: true, observe: 'events' })
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            this.responseimage.push(event.body);
            console.log(this.responseimage)
          }
        });
      document.getElementById("uploadCaptureInputFile")["value"] = "";
      console.log("h", this.urls);
    }
  }

  createImgPath = (s: string) => {

    if (s === undefined) {
      this.serverPath = "https://localhost:44309/Resources/Images/" + this.serverPath;
    }
    if (s == "") {
      this.serverPath = "./assets/upanh.png";
    }
    else {

      if (this.idsp != null && !isNaN(this.idsp)) {
        var s1 = s.toString().startsWith("https://");
        if (s1 == true) {
          this.serverPath = s;
        }
        else {
          this.serverPath = "https://localhost:44309/Resources/Images/" + s;
        }
      }
      else {
        if (s != null) {
          this.serverPath = "https://localhost:44309/Resources/Images/" + s;
        }
      }
    }

    return this.serverPath;
  }

  guidanhgiangay() {
    if ($("#hoten").val().toString().trim() != null && $('#sdt').val().toString().trim() != null && $('#email').val().toString().trim() != null) {
      for (let i = 0; i < this.urls.length; i++) {
        this.getvalue(i);
      }
      const d = new dg(
        0,
        this.sosao,
        document.getElementById("hoten")["value"],
        document.getElementById("sdt")["value"],
        document.getElementById("email")["value"],
        this.valuetext,
        this.hinhthuctesp,
        0,
        null,
        null,
        parseInt(this.idsp.toString())
      );
      console.log("danhgia", d);
      this.Createdg(d);
      this.hinhthuctesp = [];
      this.show_hide_danhgiasosao();
    }
  }

  Remove(id: number) {
    console.log("s", id);
    console.log("s", this.urls.length);
    this.urls.splice(id, 1);
    console.log("xoa", this.urls);
  }

  Createdg(d: dg) {
    try {
      this.danhgiaService.creatdg(d).subscribe(
        () => {
          alert('Lưu thành công');
        }
      );
    }
    catch
    {
      alert("Error");
      this.router.navigate(['appmain']);
    }
  }

  show_danhgia_thaoluan(id: number) {
    // $('.list-rep-comment-info'+id).css("display","");
    $('#rep-comment-info' + id).css("display", "block");
    $('#rep-comment-info-input' + id).css("display", "block");
    console.log(this.show(id));
  }

  show(id: number) {
    let items_danhgiaphu: dgphu[] = this.items_danhgia.find(x => x._id == id).danhgiaphu;
    return items_danhgiaphu;
  }

  loaddanhgia() {
    this.danhgiaService.getdg_idsp(this.idsp).subscribe((res: dg[] | null) => {
      this.items_danhgia = (res) ? res : [];
    });
  }

  show_insert_danhgiaphu(id: number) {
    var noidungdanhgia = $('#input' + id).val().toString();
    if (noidungdanhgia.length == 0) {
      alert("Vui lòng nhập nội dung!");
    }
    else {
      const dialogRef = this.dialog.open(ModalDanhGiaPhuComponent, {
        width: '80vh',
        height: 'auto',
        data: {
          idsp: this.idsp,
          noidungdanhgia: noidungdanhgia,
        }
      });
    }
  }
}