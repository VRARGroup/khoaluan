import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { DanhgiaService } from '../../service/danhgia.service';
import * as $ from "jquery";
import { dg } from '../../model/danhgia';
@Component({
  selector: 'app-modal-danhgia',
  templateUrl: './modal-danhgia.component.html',
  styleUrls: ['./modal-danhgia.component.scss']
})
export class ModalDanhgiaComponent implements OnInit {

  resulf_danhgia: any[];
  name: string;
  textarea_count: number = 0;
  star: number = 0;
  serverPath: String = "";
  urls = [];
  isImageSaved: boolean = false;
  public progress: number;
  responseimage: any = [];
  kthttp: string = "https://";
  hinhthuctesp: Array<any> = [];
  ktsavedhinhthuctesanpham: boolean = false;
  idsp: number = null;
  tieuchidanhgia: Array<boolean> = [];
  constructor(private danhgiaService: DanhgiaService, private router: Router, public dialogRef: MatDialogRef<ModalDanhgiaComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) { }
  ngOnInit() {
    this.name = this.data.name;
    this.resulf_danhgia = this.data.resulf_danhgia;
    this.idsp = this.data.idsp;
    console.log(this.idsp);
    for (let i = 0; i < this.resulf_danhgia.length; i++) {
      this.tieuchidanhgia.push(true);
    }
    console.log(this.tieuchidanhgia);
  }

  textarea_text_change(value: string) {
    this.textarea_count = $('#textarea_danhgiasosao_modal').val().toString().length;
  }

  mouseover_star(star: any) {
    if (star == 1) {
      $('#star_11').css("color", "#fc9639");
      $('#star_22').css("color", "#000");
      $('#star_33').css("color", "#000");
      $('#star_44').css("color", "#000");
      $('#star_55').css("color", "#000");
    }
    if (star == 2) {
      $('#star_11').css("color", "#fc9639");
      $('#star_22').css("color", "#fc9639");
      $('#star_33').css("color", "#000");
      $('#star_44').css("color", "#000");
      $('#star_55').css("color", "#000");
    }
    if (star == 3) {
      $('#star_11').css("color", "#fc9639");
      $('#star_22').css("color", "#fc9639");
      $('#star_33').css("color", "#fc9639");
      $('#star_44').css("color", "#000");
      $('#star_55').css("color", "#000");
    }
    if (star == 4) {
      $('#star_11').css("color", "#fc9639");
      $('#star_22').css("color", "#fc9639");
      $('#star_33').css("color", "#fc9639");
      $('#star_44').css("color", "#fc9639");
      $('#star_55').css("color", "#000");
    }
    if (star == 5) {
      $('#star_11').css("color", "#fc9639");
      $('#star_22').css("color", "#fc9639");
      $('#star_33').css("color", "#fc9639");
      $('#star_44').css("color", "#fc9639");
      $('#star_55').css("color", "#fc9639");
    }
  }
  choose_star(star: any) {
    this.star = star;
  }
  mouseleave_star() {
    let star = this.star;
    if (star == 1) {
      $('#star_11').css("color", "#fc9639");
      $('#star_22').css("color", "#000");
      $('#star_33').css("color", "#000");
      $('#star_44').css("color", "#000");
      $('#star_55').css("color", "#000");
    }
    if (star == 2) {
      $('#star_11').css("color", "#fc9639");
      $('#star_22').css("color", "#fc9639");
      $('#star_33').css("color", "#000");
      $('#star_44').css("color", "#000");
      $('#star_55').css("color", "#000");
    }
    if (star == 3) {
      $('#star_11').css("color", "#fc9639");
      $('#star_22').css("color", "#fc9639");
      $('#star_33').css("color", "#fc9639");
      $('#star_44').css("color", "#000");
      $('#star_55').css("color", "#000");
    }
    if (star == 4) {
      $('#star_11').css("color", "#fc9639");
      $('#star_22').css("color", "#fc9639");
      $('#star_33').css("color", "#fc9639");
      $('#star_44').css("color", "#fc9639");
      $('#star_55').css("color", "#000");
    }
    if (star == 5) {
      $('#star_11').css("color", "#fc9639");
      $('#star_22').css("color", "#fc9639");
      $('#star_33').css("color", "#fc9639");
      $('#star_44').css("color", "#fc9639");
      $('#star_55').css("color", "#fc9639");
    }
  }

  openFile() {
    console.log('hell')
    $('#upload_file').click();
  }

  Remove(id: number) {
    console.log("s", id);
    console.log("s", this.urls.length);
    this.urls.splice(id, 1);
    console.log("xoa", this.urls);
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
            console.log(this.responseimage)
          }
        });
      setTimeout(() => { this.urls.push(fileToUpload.name) }, 500);
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
      this.serverPath = "https://localhost:44309/Resources/Images/" + s;
    }
    return this.serverPath;
  }

  tieuchidanhgia_y(i: number) {
    this.tieuchidanhgia.splice(i, 1);
    this.tieuchidanhgia.splice(i, 0, true);
    $('#y' + i).css("box-shadow", "inset 1px 1px 6px -1px rgb(33 29 29)");
    $('#n' + i).css("box-shadow", "inset 0px 0px 0px 0px");
    console.log(this.tieuchidanhgia);
  }

  tieuchidanhgia_n(i: number) {
    this.tieuchidanhgia.splice(i, 1);
    this.tieuchidanhgia.splice(i, 0, false);
    $('#n' + i).css("box-shadow", "inset 1px 1px 6px -1px rgb(33 29 29)");
    $('#y' + i).css("box-shadow", "inset 0px 0px 0px 0px");
    console.log(this.tieuchidanhgia);
  }

  guidanhgiangay() {
    try {
      if(this.star>0)
      {
        if ($('#textarea_danhgiasosao_modal').val().toString().length >= 15) {
          if ($("#hotenm").val().toString().trim().length > 0 && $('#sdtm').val().toString().length > 0 && $('#emailm').val().toString().length > 0) {
            let v:boolean=true;
            var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            var mobile = $('#mobile').val();
            if (vnf_regex.test($('#sdtm').val().toString().trim()) == false) {
              v=false;
              alert("Số điện thoại không đúng định dạng !!!");
              return;
            }
            else
            {
              v=true;
            }
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            if($('#email').val().toString().trim() !="")
            {
              if(re.test($('#email').val().toString()))
              {
                v=true;
              }
              else
              {
                v=false;
                alert("Email không đúng định dạnh !!!");
                return;
              }
            }
            if (v==true) {
              for (let i = 0; i < this.urls.length; i++) {
                this.getvalue(i);
              }
              const d = new dg(
                0,
                this.star,
                $("#hotenm").val().toString(),
                $('#sdtm').val().toString(),
                $('#emailm').val().toString(),
                $('#textarea_danhgiasosao_modal').val().toString(),
                this.hinhthuctesp,
                0,
                null,
                this.tieuchidanhgia,
                parseInt(this.idsp.toString()),
                false
              );
              console.log("danhgia", d);
              this.Createdg(d);
              this.hinhthuctesp = [];
              this.dialogRef.close(d)
            }
          }
          else {
            alert("Vui lòng nhập họ tên, số điện thoại và email");
          }
      }
      else {
        alert("Nội dung phải đủ 15 ký tự trở lên !!!");
      }
    }
    else{
      const html = '<span for="hdfStar" style="display: block;font-size: 13px; color: #d0021b; vertical-align: -webkit-baseline-middle;margin-left: 10px;">Vui lòng chọn sao để đánh giá</span>'
      const macth_list=document.getElementById("macth_list");
      macth_list.innerHTML = html;
    }
    }
    catch
    {
    }
  }

  Createdg(d: dg) {
    try {
      this.danhgiaService.creatdg(d).subscribe(
        () => {
          alert('Cảm ơn bạn đã đánh giá, thông tin đánh giá của bạn sẽ được duyệt trong 24h !!!');
        }
      );
    }
    catch
    {
      this.router.navigate(['appmain']);
    }
  }

}
