import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { SanphamService } from '../service/sanpham.service';
import { sp } from '../model/sanpham';
import { DomSanitizer } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { fadeInItems } from '@angular/material';
import * as $ from "jquery";
import { debug } from 'console';
import { ModalThongsokythuatComponent } from '../modal/modal-thongsokythuat/modal-thongsokythuat.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Location } from '@angular/common';
import { dg } from '../model/danhgia';
import { DanhgiaService } from '../service/danhgia.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})
export class ProductdetailsComponent implements OnInit {

  // @ViewChild('div') div:ElementRef;
  items:sp[] = [];
  // specials:any[] = [];
  htmlContent:string;
  same_products:sp[] = [];
  giamgia:number;
  same_price_products:sp[] = [];
  textarea_count:number = 0;
  sosao:number=0;
  valuetext:string=null;
  serverPath: String="";
  urls = [];
  isImageSaved: boolean=false;
  public progress: number;
  responseimage: any=[];
  kthttp:string="https://";
  hinhthuctesp:Array<any>=[];
  ktsavedhinhthuctesanpham:boolean=false;
  idsp:number=null;

  constructor(private location: Location, private http: HttpClient, private router: Router, private sanphamService: SanphamService, private danhgiaService: DanhgiaService, private _sanitizer: DomSanitizer,public dialog: MatDialog) {
  	 	
  }

  show_thongsokythuat(name,thongsokythuat): void {
    const dialogRef = this.dialog.open(ModalThongsokythuatComponent, {
      width: 'auto',
      height: '100vh',
      data: {
        name:name,
        thongsokythuat: thongsokythuat,
      }
    });
  }

  ngOnInit() {
    this.idsp=parseInt(window.localStorage.getItem("sp"));
    let id_sanpham = parseInt(window.localStorage.getItem("sp"));
    if(id_sanpham==null)
      window.location.href="appmain/products";
    this.get_product_details(id_sanpham);
    
    document.getElementById('dropdown-menu').style.display = "";
    document.getElementById('html').style.backgroundColor = "#fff";
    window.scroll(0,0);

   
    setTimeout(() => {
      this.get_same_products(id_sanpham);
      this.get_same_price_products(id_sanpham);
      
      if(id_sanpham == null || id_sanpham == undefined)
      this.router.navigate(["appmain/products"]);
      }, 800);
    }

  get_product_details(id: number){
    this.sanphamService.get_product_details(id).subscribe((res: sp[] | null) => {
      this.items = (res) ? res : [];
    });
  }

  keys(obj){
    console.log(obj);
   return Object.keys(obj);
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }
  arrayTwo(n: number): any[] {
    return Array(5-n);
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

  get_same_products(id_sanpham: number){
    this.sanphamService.get_same_products(id_sanpham).subscribe((res: sp[] | null) => {
      this.same_products = (res) ? res : [];
    });
  }
  render_sp(id_sanpham: any):void {
		window.localStorage.removeItem("sp");
		window.localStorage.setItem("sp",id_sanpham.toString());

    // this.router.navigate(["appmain/productdetails"]);
    window.location.href="appmain/productdetails";
  }
  get_same_price_products(id_sanpham: number){
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
  show_article_image(){
    document.getElementById('article_image').style.height = "100%";
    document.getElementById('more_info_gioithieu').style.display = "none";
  } 
  show_dacdiemnoibat_image(){
    document.getElementById('info_dacdiemnoibat').style.height = "100%";
    document.getElementById('more_info_dacdiemnoibat').style.display = "none";
  }
  show_hide_danhgiasosao(){
    if(document.getElementById('comment_1').style.height == "100%" )
    {
      document.getElementById('comment_1').style.height = "192px";
      document.getElementById('show_hide_danhgiasosao').style.backgroundColor = "#288ad6";
      document.getElementById('show_hide_danhgiasosao').innerText = "Đánh giá ngay";
    }
    else
    {
      document.getElementById('comment_1').style.height = "100%";
      document.getElementById('show_hide_danhgiasosao').style.backgroundColor = "red";
      document.getElementById('show_hide_danhgiasosao').innerText = "Hủy";
    }
  }
  textarea_text_change(value:string){
    this.textarea_count = $('#textarea_danhgiasosao').val().toString().length;
    this.valuetext = $('#textarea_danhgiasosao').val().toString();
    console.log(this.valuetext);
  }
  mouseover_star_1(){
    document.getElementById('star_1').style.color = '#fc9639';
    document.getElementById('star_2').style.color = '#000';
    document.getElementById('star_3').style.color = '#000';
    document.getElementById('star_4').style.color = '#000';
    document.getElementById('star_5').style.color = '#000';
    this.sosao=1;
    console.log("ss",this.sosao);
  }
  mouseover_star_2(){
    document.getElementById('star_1').style.color = '#fc9639';
    document.getElementById('star_2').style.color = '#fc9639';
    document.getElementById('star_3').style.color = '#000';
    document.getElementById('star_4').style.color = '#000';
    document.getElementById('star_5').style.color = '#000';
    this.sosao=2;
    console.log("ss",this.sosao);
  }
  mouseover_star_3(){
    document.getElementById('star_1').style.color = '#fc9639';
    document.getElementById('star_2').style.color = '#fc9639';
    document.getElementById('star_3').style.color = '#fc9639';
    document.getElementById('star_4').style.color = '#000';
    document.getElementById('star_5').style.color = '#000';
    this.sosao=3;
    console.log("ss",this.sosao);
  }
  mouseover_star_4(){
    document.getElementById('star_1').style.color = '#fc9639';
    document.getElementById('star_2').style.color = '#fc9639';
    document.getElementById('star_3').style.color = '#fc9639';
    document.getElementById('star_4').style.color = '#fc9639';
    document.getElementById('star_5').style.color = '#000';
    this.sosao=4;
    console.log("ss",this.sosao);
  }
  mouseover_star_5(){
    document.getElementById('star_1').style.color = '#fc9639';
    document.getElementById('star_2').style.color = '#fc9639';
    document.getElementById('star_3').style.color = '#fc9639';
    document.getElementById('star_4').style.color = '#fc9639';
    document.getElementById('star_5').style.color = '#fc9639';
    this.sosao=5;
    console.log("ss",this.sosao);
  }

  openFile(){
    console.log('hell')
    document.getElementById('uploadCaptureInputFile').click();
  }

  getvalue(v: number)
  {
    this.kthttp=this.urls[v];
    if(this.kthttp.startsWith("https://")==false)
    {
      this.hinhthuctesp.push("https://localhost:44309/Resources/Images/"+this.urls[v]);
      this.ktsavedhinhthuctesanpham=true;
    }
    else
    {
      this.hinhthuctesp.push(this.urls[v]);
      this.ktsavedhinhthuctesanpham=true;
    }
  }

  public uploadFileimage = (files) => {
    if (files.length === 0) {
      return;
    }
    if(this.urls.length<4)
    {
      let fileToUpload = <File>files[0];
      this.urls.push(fileToUpload.name);
      this.isImageSaved=true;
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      this.http.post('https://localhost:44309/api/saveimagefolder', formData, {reportProgress: true, observe: 'events'})
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            this.responseimage.push(event.body);
            console.log(this.responseimage)
          }
        });
        document.getElementById("uploadCaptureInputFile")["value"] = "";
        console.log("h",this.urls);
    }
  }

  createImgPath = (s:string) => {
        
    if(s===undefined)
    {
      this.serverPath="https://localhost:44309/Resources/Images/"+this.serverPath;
    }
    if(s=="")
    { 
      this.serverPath="./assets/upanh.png";
    }
    else
    {
      
      if(this.idsp!=null && !isNaN(this.idsp))
      {
        var s1=s.toString().startsWith("https://");
        if(s1==true)
        {
          this.serverPath=s;
        }
        else
        {
          this.serverPath="https://localhost:44309/Resources/Images/"+s;
        }
      }
      else
      {
        if(s!=null)
        {
          this.serverPath="https://localhost:44309/Resources/Images/"+s;
        }
      }
    }
    
    return this.serverPath;
  }

  guidanhgiangay()
  {
    for(let i=0;i<this.urls.length;i++)
    {
      this.getvalue(i);
    }
    const d=new dg(
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
      this.idsp
    );
    console.log("danhgia",d);
    this.Createdg(d);
    this.hinhthuctesp=[];
  }

  Remove(id:number){
    console.log("s",id);
    console.log("s",this.urls.length);
    this.urls.splice(id,1);
    console.log("xoa",this.urls);
  }

  Createdg(d: dg){
    try
    {
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


}