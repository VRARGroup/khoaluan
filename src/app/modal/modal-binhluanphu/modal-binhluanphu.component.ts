import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import * as $ from "jquery";
import { dg } from '../../model/danhgia';
@Component({
  selector: 'app-modal-binhluanphu',
  templateUrl: './modal-binhluanphu.component.html',
  styleUrls: ['./modal-binhluanphu.component.scss']
})
export class ModalBinhluanphuComponent implements OnInit {

  idsp:number;
  idbl:number;
  textarea_count: number = 0;
  serverPath: String = "";
  urls = [];
  isImageSaved: boolean = false;
  public progress: number;
  responseimage: any = [];
  kthttp: string = "https://";
  hinhthuctesp: Array<any> = [];
  ktsavedhinhthuctesanpham: boolean = false;
  constructor(private router: Router, public dialogRef: MatDialogRef<ModalBinhluanphuComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {

  }
  ngOnInit() {
    $('#textarea_binhluansosao_modal').val(this.data.name);
    this.idsp = this.data.idsp;    
    this.idbl = this.data.idbl;
  }
  binhluan_save_modal() {

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
      this.serverPath = "https://localhost:44309/Resources/Images/" + s;
    }
    return this.serverPath;
  }

  textarea_text_change(value: string) {
    this.textarea_count = $('#textarea_danhgiasosao_modal').val().toString().length;
  }
}
