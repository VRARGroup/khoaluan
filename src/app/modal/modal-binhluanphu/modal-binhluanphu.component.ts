import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import * as $ from "jquery";

import { bl } from '../../model/binhluan';
import { blphu } from '../../model/binhluan';
import { BinhluanService } from '../../service/binhluan.service';
import { parseJSON } from 'jquery';
@Component({
  selector: 'app-modal-binhluanphu',
  templateUrl: './modal-binhluanphu.component.html',
  styleUrls: ['./modal-binhluanphu.component.scss']
})
export class ModalBinhluanphuComponent implements OnInit {

  idsp: number;
  idbl: number;
  textarea_count: number = 0;
  serverPath: String = "";
  urls_blp = [];
  isImageSaved: boolean = false;
  public progress: number;
  responseimage: any = [];
  kthttp: string = "https://";
  hinhthuctebl_phu: Array<any> = [];
  ktsavedhinhthuctesanpham: boolean = false;
  blphu: Array<any> = [];
  constructor(private router: Router, public dialogRef: MatDialogRef<ModalBinhluanphuComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private binhluanService: BinhluanService) {

  }
  ngOnInit() {
    $('#textarea_binhluansosao_modal').val("@" + this.data.name + ":");
    this.idsp = this.data.idsp;
    this.idbl = this.data.idbl;
  }

  binhluan_save_modal() {
    if ($('#textarea_binhluanphu_modal').val().toString().length >= 15) {
      let gt = false;
      if ($("#binhluan_male").is(":checked")) {
        gt = true;
      }
      const bp = new blphu(
        $('#textarea_binhluanphu_modal').val().toString(), 0,
        $(".cfm-UserName").val().toString(), false, gt, $(".cfm-UserEmail").val().toString())
      this.blphu.push(bp);
      const b = new bl(
        this.idbl,
        null,
        gt,
        null,
        null,
        null,
        null,
        this.blphu,
        parseInt(this.idsp.toString())
      );
      this.binhluanService.insert_binhluan_phu(b).subscribe(
        (data) => {
          if(data!=null && data!=undefined)
          {
            alert('Thực hiện thành công');
          }
          else
          {
            alert('Gặp sự cố');
          }
        }
      );
      this.dialogRef.close(this.idbl);
    }
    else {
      alert("Vui lòng nhập đủ 15 ký tự bình luận !!!")
    }
  }

  openFile() {
    console.log('hell')
    $('#upload_file').click();
  }

  Remove_img_blp(id: number) {
    console.log("s", id);
    console.log("s", this.urls_blp.length);
    this.urls_blp.splice(id, 1);
    console.log("xoa", this.urls_blp);
  }

  getvalue(v: number) {
    this.kthttp = this.urls_blp[v];
    if (this.kthttp.startsWith("https://") == false) {
      this.hinhthuctebl_phu.push("https://localhost:44309/Resources/Images/" + this.urls_blp[v]);
      this.ktsavedhinhthuctesanpham = true;
    }
    else {
      this.hinhthuctebl_phu.push(this.urls_blp[v]);
      this.ktsavedhinhthuctesanpham = true;
    }
  }

  public uploadFileimage_blp = (files) => {
    if (files.length === 0) {
      return;
    }
    if (this.urls_blp.length < 4) {
      let fileToUpload = <File>files[0];
      this.urls_blp.push(fileToUpload.name);
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
      console.log("h", this.urls_blp);
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

  textarea_text_change(value: string) {
    this.textarea_count = $('#textarea_binhluanphu_modal').val().toString().length;
  }
}
