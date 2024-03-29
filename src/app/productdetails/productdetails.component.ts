import { Component, OnInit, HostListener } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { SanphamService } from '../service/sanpham.service';
import { LoaisanphamService } from '../service/loaisanpham.service';
import { DanhgiaService } from '../service/danhgia.service';
import { BinhluanService } from '../service/binhluan.service';
import { SignalRService } from "../service/signal-r.service";
import { EmailService } from '../service/email.service';

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
import { bl } from '../model/binhluan';
import { blphu } from '../model/binhluan';
import { Validators } from '@angular/forms';
import { email } from '../model/email';

import { ModalThongsokythuatComponent } from '../modal/modal-thongsokythuat/modal-thongsokythuat.component';
import { ModalDanhgiaComponent } from '../modal/modal-danhgia/modal-danhgia.component';
import { ModalDanhgiaphuComponent } from '../modal/modal-danhgiaphu/modal-danhgiaphu.component';
import { ModalBinhluanphuComponent } from '../modal/modal-binhluanphu/modal-binhluanphu.component';
import { data } from 'jquery';

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
  item_comments: bl[];
  signalList: bl;
  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 10;
  checkreal_time:boolean=true;
  checkreal_time_loaddanhgia:boolean=true;
  emaill:email[]=[];
  constructor(public route: ActivatedRoute, private location: Location, private http: HttpClient, private router: Router, private sanphamService: SanphamService, private danhgiaService: DanhgiaService, private _sanitizer: DomSanitizer, public dialog: MatDialog, private loaisanphamService: LoaisanphamService, private binhluanService: BinhluanService, private emailService: EmailService,private signalRService: SignalRService) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if ((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrollHeight) {
      this.showScroll = true;
    }
    else if (this.showScroll && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < this.hideScrollHeight) {
      this.showScroll = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
    //$(".comment-3-textarea")[0].scrollIntoView();
  }

  ngOnInit() {
    let id_sanpham = this.route.snapshot.params.id;
    if (isNaN(id_sanpham))
      id_sanpham = parseInt(window.localStorage.getItem("sp"));
    this.idsp = id_sanpham;
    if (isNaN(id_sanpham))
      this.router.navigate(["appmain/products"]);
    this.get_product_details(id_sanpham);
    document.getElementById('dropdown-menu').style.display = "";
    document.getElementById('html').style.backgroundColor = "#fff";
    document.getElementById('html').style.backgroundImage = "none";
    document.getElementById('html').style.backgroundColor = "#fff";
    window.scroll(0, 0);
    this.loaddanhgia();
    this.loadbinhluan();
    console.log(this.idsp);
    setTimeout(function () {
      console.log("vinh")
    }, 100);

    // setTimeout(() => {
    //   if(id_sanpham == null || id_sanpham == undefined)
    //     this.router.navigate(["appmain/products"]);

    //   }, 800);
    this.signalRService.signalReceived.subscribe((signal: bl) => {
      if(this.checkreal_time==false)
      {
        this.checkreal_time=true;
        return;
      }
      if (signal != null && signal != undefined) {
        
        if(signal["x"]=="xóa bình luận phụ")
        {
          $("#blp_"+signal["id"]+"_"+signal["i"]).remove();
          
          this.showbinhluanphu(parseInt(signal["id"]),this.item_comments).splice(parseInt(signal["i"]),1);          
          return;
        }
        console.log(signal);
        if(signal.kiemduyet==true)
        {
          this.item_comments.push(signal);
          return;
        }
        let arr: Array<blphu> = []
        arr.push(signal.binhluanphu[0]);
        if (signal.ten != null && signal.ten != undefined) {
          signal.kiemduyet=true;
          var c = this.item_comments.indexOf(signal);
          this.item_comments.splice(c, 1);
          
          return;
        }
        if(signal.ten == null && signal.ten == undefined)
        {
          signal.kiemduyet=true;
          this.showbinhluanphu(signal._id, this.item_comments).push(arr[0]);
          return;
        }
        console.log(this.p);
      }
    });

    this.signalRService.signaldgReceived.subscribe((signal: dg) => {
      if(this.checkreal_time==false)
      {
        this.checkreal_time=true;
        return;
      }
      if (signal != null && signal != undefined) {
        if(signal["x"]=="xóa đánh giá phụ")
        {
          $("#dgp_"+signal["id"]+"_"+signal["i"]).remove();
          this.show(parseInt(signal["id"])).splice(parseInt(signal["i"]),1);
          return;
        }
        console.log(signal);
        if(signal.kiemduyet==true)
        {
          this.items_danhgia.push(signal);
          this.checkreal_time_loaddanhgia=false;
          this.loaddanhgia();
          return;
        }
        
        let arr: Array<dgphu> = []
        arr.push(signal.danhgiaphu[0]);
        if (signal.ten != null && signal.ten != undefined) {
          signal.kiemduyet=true;
          var c = this.items_danhgia.indexOf(signal);
          this.items_danhgia.splice(c, 1);
          return;
        }
        if(signal.ten == null && signal.ten == undefined)
        {
          signal.kiemduyet=true
          this.show(signal._id).push(arr[0]);
          return;
        }
        console.log(this.p);
      }
    });

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
  kl: boolean = true;
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
    dialogRef.afterClosed().subscribe((submit) => {
      if (submit) {
        let a: dg[] = [];
        a.push(submit);
        this.kl = false;
        setTimeout(() => { this.loaddanhgia() }, 200);
        this.get_product_details(this.idsp);
      } else {
        console.log("null")
      }
    })
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
  render_sp(id_sanpham): void {
    this.router.navigate(['/appmain/productdetails', id_sanpham]).then(() => {
      window.location.reload();
    });
    // window.localStorage.removeItem("sp");
    // window.localStorage.setItem("sp", id_sanpham.toString());

    // // this.router.navigate(["appmain/productdetails"]);
    // window.location.href = "appmain/productdetails";
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
    if (document.getElementById('show_hide_danhgiasosao').innerHTML == "Hủy") {
      this.hinhthuctesp = [];
      $("#hoten").val("").toString();
      $('#sdt').val("").toString();
      $('#email').val("").toString();
      $('#textarea_danhgiasosao').val("").toString(),
        this.star = 0;
      this.mouseover_star(this.star);
      this.urls = [];
    }
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
    if (star == 0) {
      $('#star_1').css("color", "#000");
      $('#star_2').css("color", "#000");
      $('#star_3').css("color", "#000");
      $('#star_4').css("color", "#000");
      $('#star_5').css("color", "#000");
    }
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
        $("#comment_1").css("height", this.resulf_danhgia.length * 36 + 80 + "px");
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

      this.isImageSaved = true;
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      this.http.post('https://localhost:44309/api/saveimagefolder', formData, { reportProgress: true, observe: 'events' })
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            this.responseimage.push(event.body);
          }
        });
      setTimeout(() => { this.urls.push(fileToUpload.name) }, 500);
      document.getElementById("uploadCaptureInputFile")["value"] = "";
      console.log("h", this.urls);
    }
  }

  counth: number = 0;
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
    this.counth++
    return this.serverPath;
  }

  guidanhgiangay() {
    this.checkreal_time=false;
    if (this.star > 0) {
      if (this.textarea_count >= 15) {

        if ($('#hoten').val().toString().trim() != "" && $('#sdt').val().toString().trim() != "") {
          let v: boolean = true;
          var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
          var mobile = $('#mobile').val();
          if (vnf_regex.test($('#sdt').val().toString().trim()) == false) {
            v = false;
            alert("Số điện thoại không đúng định dạng !!!");
            return;
          }
          else {
            v = true;
          }

          const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if ($('#email').val().toString().trim() != "") {
            if (re.test($('#email').val().toString())) {
              v = true;
            }
            else {
              v = false;
              alert("Email không đúng định dạng !!!");
              return;
            }
          }
          if (v == true) {
            for (let i = 0; i < this.urls.length; i++) {
              this.getvalue(i);
            }
            let tcdg: Array<boolean> = [];
            const d = new dg(
              0,
              this.sosao,
              $("#hoten").val().toString(),
              $('#sdt').val().toString(),
              $('#email').val().toString(),
              this.valuetext,
              this.hinhthuctesp,
              0,
              null,
              tcdg,
              parseInt(this.idsp.toString()),
              false
            );
            console.log("danhgia", d);
            this.Createdg(d);
            const e = new email(
              "vinh",
              "",
              $("#hoten").val().toString()+" "+"vừa đánh giá sản phẩm"+" "+this.items[0].ten,
              ""
            )
            this.sendemail(e);
            this.hinhthuctesp = [];
            $("#hoten").val("").toString();
            $('#sdt').val("").toString();
            $('#email').val("").toString();
            $('#textarea_danhgiasosao').val("").toString(),
            this.star = 0;
            this.urls = [];
            this.show_hide_danhgiasosao();
            this.get_product_details(this.idsp);
            //setTimeout(() => { this.loaddanhgia() }, 200);

          }
          else {
            alert("Email nhập không hợp lệ vui lòng kiểm tra lại !!!")
            $("#email").css("border", "1px solid red");
          }
        }
        else {
          alert("Vui lòng nhập đầy đủ thông tin cá nhân !!!")
        }
      }
      else {
        alert("Nội dung phải đủ 15 ký tự trở lên !!!")
      }
    }
    else {
      const html = '<span for="hdfStar" style="display: block;font-size: 13px; color: #d0021b; vertical-align: -webkit-baseline-middle;margin-left: 10px;">Vui lòng chọn sao để đánh giá</span>'
      const macth_list = document.getElementById("macth_list");
      macth_list.innerHTML = html;
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
          alert('Cảm ơn bạn đã đánh giá. Thông tin đánh giá của bạn sẽ được kiểm duyệt trong 24h.');
        }
      );
    }
    catch
    {
      this.router.navigate(['appmain']);
    }
  }

  sendemail(e: email) {
    try {
      this.emailService.sendmail(e).subscribe(
        () => {
          return;
        }
      );
    }
    catch
    {
      return;
    }
  }

  iddg: number;
  show_danhgia_thaoluan(id: number) {
    // $('.list-rep-comment-info'+id).css("display","");
    $('#rep-comment-info' + id).css("display", "block");
    $('#rep-comment-info-input' + id).css("display", "block");
    this.iddg = id;
  }

  items_danhgiaphu_dl: dgphu[];
  show(id: number) {
    let s:dgphu[] = (this.items_danhgia.find(x => x._id == id).danhgiaphu);
    this.items_danhgiaphu_dl = s;
    return this.items_danhgiaphu_dl;
  }

  countstar1: number = 0;
  countstar2: number = 0;
  countstar3: number = 0;
  countstar4: number = 0;
  countstar5: number = 0;
  sumstar1: number = 0;
  sumstar2: number = 0;
  sumstar3: number = 0;
  sumstar4: number = 0;
  sumstar5: number = 0;
  countstar: number = 0;
  numberstar: number = 0;
  counttcdg: Array<number> = [];
  loaddanhgia() {
    this.danhgiaService.getdg_idsp(this.idsp).subscribe((res: dg[] | null) => {
      if(this.checkreal_time_loaddanhgia==true)
      {
        this.items_danhgia = (res) ? res : [];
      }
      var j = res.find(x => true);
      if (res != null && res.length>0) {
        if (j.sosao != null && !isNaN(j.sosao) && j.tieuchidanhgia.length != null && !isNaN(j.tieuchidanhgia.length)) {
          this.countstar = res.length;
          this.countstar1 = res.filter(x => x.sosao == 1).length;
          this.countstar2 = res.filter(x => x.sosao == 2).length;
          this.countstar3 = res.filter(x => x.sosao == 3).length;
          this.countstar4 = res.filter(x => x.sosao == 4).length;
          this.countstar5 = res.filter(x => x.sosao == 5).length;
          this.numberstar = Math.round(((this.countstar1 + this.countstar2 + this.countstar3 + this.countstar4 + this.countstar5) / this.countstar) * 10) / 10;
          for (let i of res[0].tieuchidanhgia) {
            this.counttcdg.push(0);

          }
          for (let i of res) {
            if (i.tieuchidanhgia != null || i.tieuchidanhgia != undefined) {
              for (let j in i.tieuchidanhgia) {
                if (i.tieuchidanhgia[j] == true) {
                  this.counttcdg[j] = this.counttcdg[j] + 1;
                }
              }
            }
          }
          for (let k in this.counttcdg) {
            this.counttcdg[k] = Math.round((this.counttcdg[k] / res.length) * 100);
          }
          this.sumstar1 = Math.round((((res.filter(x => x.sosao === 1).reduce((sum, current) => sum + 1, 0)) / this.countstar) * 100) * 10) / 10;
          this.sumstar2 = Math.round((((res.filter(x => x.sosao === 2).reduce((sum, current) => sum + 1, 0)) / this.countstar) * 100) * 10) / 10;
          this.sumstar3 = Math.round((((res.filter(x => x.sosao === 3).reduce((sum, current) => sum + 1, 0)) / this.countstar) * 100) * 10) / 10;
          this.sumstar4 = Math.round((((res.filter(x => x.sosao === 4).reduce((sum, current) => sum + 1, 0)) / this.countstar) * 100) * 10) / 10;
          this.sumstar5 = Math.round((((res.filter(x => x.sosao === 5).reduce((sum, current) => sum + 1, 0)) / this.countstar) * 100) * 10) / 10;
          console.log(this.counttcdg)
        }
      }
    });
  }

  show_insert_danhgiaphu(id: number) {
    var noidungdanhgia = $('#input' + id).val().toString();
    if (noidungdanhgia.length == 0) {
      alert("Vui lòng nhập nội dung!");
    }
    else {
      const dialogRef = this.dialog.open(ModalDanhgiaphuComponent, {
        width: '50vw',
        height: 'auto',
        data: {
          idsp: this.idsp,
          iddg: id,
          noidungdanhgia: noidungdanhgia,
        }
      });
      dialogRef.afterClosed().subscribe((submit) => {
        if (submit) {
          // let a: dgphu[] = [];
          // a.push(submit);
          // this.show(this.iddg).push(a[0]);
          // $('#input' + id).val("").toString()
        } else {
          console.log("null")
        }
      })
    }
  }

  show_insert_binhluanphu(idbl: number, name: string) {
    const dialogRef = this.dialog.open(ModalBinhluanphuComponent, {
      width: '50vw',
      height: 'auto',
      data: {
        idsp: this.idsp,
        idbl: idbl,
        name: name,
      }
    });
    dialogRef.afterClosed().subscribe((submit) => {
      if (submit) {
        //this.loadbinhluan();
      } else {
        console.log("null")
      }
    })

  }

  Createbl(b: bl) {
    try {
      let al = null;
      this.binhluanService.creatbl(b).subscribe(
        (data) => {
          if (data != null && data != undefined) {
            alert("Cảm ơn bạn đã bình luận. Thông tin bình luận của bạn sẽ được kiểm duyệt trong 24h.");
          }
        }
      );
      $(".comment-3-textarea-show").css("display", "none");
      $(".comment-3-textarea").css("display", "block");
    }
    catch
    {
      this.router.navigate(['appmain']);
    }
  }

  hinhthuctesp_bl: Array<any> = [];
  getvaluebl(v: number) {

    this.kthttp = this.urls_bl[v];
    if (this.kthttp.startsWith("https://") == false) {
      this.hinhthuctesp_bl.push("https://localhost:44309/Resources/Images/" + this.urls_bl[v]);
      this.ktsavedhinhthuctesanpham = true;
    }
    else {
      this.hinhthuctesp_bl.push(this.urls_bl[v]);
      this.ktsavedhinhthuctesanpham = true;
    }
  }

  Removeimgbl(id: number) {
    console.log("s", id);
    console.log("s", this.urls_bl.length);
    this.urls_bl.splice(id, 1);
    console.log("xoa", this.urls_bl);
  }

  isImageSavedbl: boolean = false;
  urls_bl = [];
  responseimagebl: any = [];
  public uploadFileimage_bl = (files) => {
    if (files.length === 0) {
      return;
    }
    if (this.urls_bl.length < 5) {
      let fileToUpload = <File>files[0];

      this.isImageSavedbl = true;
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      this.http.post('https://localhost:44309/api/saveimagefolder', formData, { reportProgress: true, observe: 'events' })
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            this.responseimagebl.push(event.body);
          }
        });
      setTimeout(() => { this.urls_bl.push(fileToUpload.name) }, 300);
      document.getElementById("uploadCaptureInputFile")["value"] = "";
      console.log("h", this.urls_bl);
    }

  }

  openFile_bl() {
    document.getElementById('uploadCaptureInputFile_bl').click();
  }

  insertbl() {
    this.checkreal_time=false;
    if ($('.textarea_danhgia').val().toString().length <= 1000) {
      if ($('.textarea_danhgia').val().toString().trim() != "" && $('.textarea_danhgia').val().toString() != null) {
        if ($('#ht').val().toString().trim() != "" && $('#emailbl').val().toString().trim() != "") {
          let gt = false;
          if ($("#male").is(":checked")) {
            gt = true;
          }
          const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (re.test($('#emailbl').val().toString())) {

            for (let i = 0; i < this.urls_bl.length; i++) {
              this.getvaluebl(i);
            }
            console.log(this.hinhthuctesp_bl);
            const b = new bl(
              0,
              $("#ht").val().toString(),
              gt,
              $('#emailbl').val().toString(),
              $('.textarea_danhgia').val().toString(),
              this.hinhthuctesp_bl,
              0,
              null,
              parseInt(this.idsp.toString()),
              false
            );
            console.log("binhluan", b);
            this.Createbl(b);
            const e = new email(
              "vinh",
              "",
              $("#ht").val().toString()+" "+"vừa bình luận sản phẩm"+" "+this.items[0].ten,
              ""
            )
            this.sendemail(e);
            this.hinhthuctesp_bl;
            $("#ht").val("").toString();
            gt;
            $('#emailbl').val("").toString();
            $('.textarea_danhgia').val("").toString();


            this.hinhthuctesp_bl = [];
            //setTimeout(() => { this.loadbinhluan() }, 200);

          }
          else {
            alert("Email nhập không hợp lệ vui lòng kiểm tra lại !!!")
            $("#emailbl").css("border", "1px solid red");
          }
        }
        else {
          alert("Vui lòng nhập đầy đủ thông tin cá nhân !!!")
        }
      }
      else {
        alert("Vui lòng nhập thông tin bình luận !!!");
      }
    }
    else {
      alert("Bạn đã nhập nội dung vượt giới hạn !!!");
    }
  }

  countbl: number = 0;
  p: number = 1;
  pdg: number = 1;
  loadbinhluan() {
    this.binhluanService.getallbl_idsp(this.idsp).subscribe((res: bl[] | null) => {
      this.item_comments = (res) ? res : [];
      this.countbl = res.length;
    });

  }

  items_binhluanphu_dl: blphu[]
  showbinhluanphu(id: number, arr: bl[]) {
    if (arr.length > 0) {
      this.items_binhluanphu_dl = (arr.find(x => x._id == id).binhluanphu);
    }
    return this.items_binhluanphu_dl;
  }

  clickkohailong(id: number) {
    $('#khl_dg' + id).css("display", "block");
  }
  close(id: number) {
    $('#khl_dg' + id).css("display", "none");
  }

  customdate(d: string) {
    var f = d.split('-');
    return f[0] + "/" + f[1] + "/" + f[2];
  }

  rename_same_product(ten: string) {
    let name = "";
    if (ten.includes("GB") || ten.includes("Gb") || ten.includes("gb")) {
      var vl = ten.split(" ");
      for(let element of vl){
        if (element.includes("GB") || element.includes("Gb") || element.includes("gb")){
          name = element;
          break;
        }
      }
    }
    if (ten.includes("inch") || ten.includes("Inch")) {
      var vl1 = ten.split(" ")
      let num= vl1.indexOf("inch");
      name = vl1[num-1] +" inch";
    }
    if (ten.includes("HP") || ten.includes("HP")) {
      var vl1 = ten.split(" ")
      let num= vl1.indexOf("HP");
      name = vl1[num-1] +" HP";
    }
    return name;
  }
}
