import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { hinh } from '../model/sanpham';
import { sp } from '../model/sanpham';
import { SanphamService } from '../service/sanpham.service';
import { Router } from "@angular/router";
import { Location } from '@angular/common';
@Component({
  selector: 'app-reviewsp',
  templateUrl: './reviewsp.component.html',
  styleUrls: ['./reviewsp.component.scss']
})
export class ReviewspComponent implements OnInit {

  // @ViewChild('editor',{static: false}) private editor: ElementRef;;
  // description: string = "<p><b>Lorem ipsum</b> dolor sit amet, <s>consectetur adipiscing elit</s>, sed do eiusmod tempor <u>incididunt</u> ut labore et dolore <i>magna aliqua</i>.";

  // setStyle(style: string) {
  //   let bool = document.execCommand(style, false, null);
  // }

  // setStylezoom() {
  //   let bool = document.execCommand("fontSize", false, "5");
  // }

  // setStylesmall() {
  //   let bool = document.execCommand("fontSize", false, "3");
  // }

  // onChange() {
  //   console.log(this.editor.nativeElement["innerHTML"]);
  //   console.log(this.editor.nativeElement.value);
  // }

  addtext: Array<any> = [];
  urls = [];
  valuegt: Array<any> = [];
  idinput: string;
  i: number = 0;
  isImageSaved: boolean = false;
  public progress: number;
  responseimage: any = [];
  idlsp: number;
  ktsavedhinhsanpham: boolean = true;
  arrsp: sp[] = [];
  mota: Array<any> = [];
  @ViewChildren('maRef') maRefs: QueryList<ElementRef>;
  hoatdong: boolean = false;
  v: boolean = false;
  serverPath: string;
  gt: Array<hinh> = [];
  constructor(private location: Location, private router: Router, private http: HttpClient, private sanphamService: SanphamService) { }

  Addtextnd() {
    this.addtext.push("");
    console.log("h", this.urls);
  }

  Removeaddtext(id: number) {
    console.log(id);
    if (id < this.addtext.length - 1) {
      for (let i = id; i < this.addtext.length; i++) {
        if (i < this.addtext.length - 1) {
          let j = i + 1;
          document.getElementById("text" + i)["value"] = document.getElementById("text" + j)["value"];
        }
      }
    }
    this.addtext.splice(id, 1);
    this.urls.splice(id, 1);
    console.log(this.urls);
  }

  public uploadFileimage = (files) => {
    if (files.length === 0) {
      return;
    }
    this.idinput = "inputmt" + this.i;
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
    setTimeout(() => { this.urls.push(fileToUpload.name) }, 200);
    console.log("h", this.urls);
  }

  public createImgPath = (s: string) => {
    if (s == null) {
      this.serverPath = null;
    }
    if (s == undefined) {
      this.serverPath = "./assets/upanh.png";
    }
    else {
      if (!isNaN(this.idlsp)) {
        if (s != "") {
          this.serverPath = s;
        }
        else {
          this.serverPath = "./assets/upanh.png";
        }
      }
      else {
        this.serverPath = "https://localhost:44309/Resources/Images/" + s;
      }
    }
    return this.serverPath;
  }

  Remove(index: { id: number; }) {
    console.log(index);
    this.urls.splice(this.urls.indexOf(index), 1);
    console.log("xoa", this.urls);
  }

  ngOnInit() {
    this.hoatdong = JSON.parse(window.localStorage.getItem("editid1"));
    console.log(this.hoatdong);
    document.getElementById("btndx").style.display = "block";
    document.getElementById("btndmk").style.display = "block";
    if (this.hoatdong == false || this.hoatdong == null) {
      this.router.navigate(['appmainnv/login']);
    }
    this.idlsp = parseInt(window.localStorage.getItem("gtsp"));
    if (!isNaN(this.idlsp)) {
      this.loadctsp(this.idlsp);
    }
    else {
      if (window.localStorage.getItem("gtnewsp") == "new") {
        this.addtext.push("");
      }
      else {
        this.location.back();
      }
    }
  }

  onSubmit() {
    this.maRefs.forEach((maRef: ElementRef) => {
      this.valuegt.push(
        document.getElementById(maRef.nativeElement.id)["id"],
      );
    });
    for (let i = 0; i < this.valuegt.length; i = i + 2) {
      if (i < this.valuegt.length - 1) {
        const gt = new hinh(
          document.getElementById(this.valuegt[i + 1])["src"],
          document.getElementById(this.valuegt[i])["value"] 
        );
        this.gt.push(gt);
      }
    }
    const v = new sp(
      this.idlsp,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      this.gt,
      null,
      null,
      null
    );
    this.creategt(v);
  }

  creategt(tsp: sp) {
    this.sanphamService.creategtsp(tsp).subscribe(
      (data) => {
        if(data)
        {
          alert('Lưu thành công.');
          this.back();
        }
        else
        {
          alert('Gặp sự cố');
        }
      }
    );
  }

  loadctsp(id: number) {
    this.sanphamService.getctsp(id).subscribe((res: sp[] | null) => {
      this.arrsp = (res) ? res : [];
      console.log(res);
      if (res[0].gioithieu.length == 0 || res[0].gioithieu.length < 0) {
        this.urls.push("");
      }
      for (let i = 0; i < res[0].gioithieu.length; i++) {
        this.urls.push(res[0].gioithieu[i].hinhanh);
        var s = res[0].gioithieu[i].mota;
        this.addtext.push(res[0].gioithieu[i].mota);
      }
      this.isImageSaved = true;
    });
    console.log(this.addtext)
  }

  reset() {
    this.gt = [];
    this.addtext = [];
    this.addtext.push("");
    this.urls = [];
    console.log(this.gt, this.urls);
  }
  back() {
    this.location.back();
  }
}
