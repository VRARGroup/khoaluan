import { Component, OnInit, ViewChildren , QueryList ,ElementRef } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { hinh } from '../model/sanpham';
import { sp } from '../model/sanpham';
import { SanphamService } from '../service/sanpham.service';
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

  addtext:Array<any>=[];
  urls = [];
  valuegt:Array<any>=[];
  idinput: string;
  i:number=0;
  isImageSaved: boolean=false;
  public progress: number;
  responseimage: any=[];
  idlsp:number;
  ktsavedhinhsanpham: boolean=true;

  @ViewChildren('maRef') maRefs: QueryList<ElementRef>;

  Addtextnd()
  {
    this.addtext.push("");
    console.log("h",this.urls);
  }

  Removeaddtext(id:number)
  {
    console.log(id);
    if(id<this.addtext.length-1)
    {
      let i=id+1;
      document.getElementById("text"+id)["value"]=document.getElementById("text"+i)["value"];
      this.urls[id]=this.urls[i];
    }
    this.addtext.splice(id,1);
    this.urls.splice(id,1);
  }

  public uploadFileimage = (files) => {
    if (files.length === 0) {
      return;
    }
    this.idinput="inputmt"+this.i;
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

  v:boolean=false;
  serverPath: string;
  public createImgPath = (s:string) => {
    if(s==null)
    {
      this.serverPath=null;
    }
    if(s==undefined)
    {
      
      this.serverPath=null;
    }
    else
    {
      if(!isNaN(this.idlsp))
      {
        
        this.serverPath="https://localhost:44309/Resources/Images/"+s;
      }
      else
      {
        
        this.serverPath="https://localhost:44309/Resources/Images/"+s;
      }
    }
    console.log("h",this.urls);
    return this.serverPath;
  }

  Remove(index:{ id: number; }){
    console.log(index);
    this.urls.splice(this.urls.indexOf(index),1);
    console.log("xoa",this.urls);
  }

  constructor(private http: HttpClient, private sanphamService: SanphamService) { }

  ngOnInit() {
    this.idlsp=parseInt(window.localStorage.getItem("editspid"));
    if(!isNaN(this.idlsp))
    {
      this.addtext.push("");
    }
    else
    {
      this.addtext.push("");
    }
  }

  gt: Array<hinh>=[];
  onSubmit() {
    debugger
  this.maRefs.forEach((maRef: ElementRef) => {
    this.valuegt.push(
      document.getElementById(maRef.nativeElement.id)["id"],
      );
  });

  for(let i=0;i<this.valuegt.length;i=i+2)
  {
    if(i<this.valuegt.length-1)
    {
      const gt= new hinh(
        document.getElementById(this.valuegt[i])["value"], 
        document.getElementById(this.valuegt[i+1])["src"]
      );
      this.gt.push(gt);
    }
  }

  const v= new sp(
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


  creategt(tsp: sp)
  {
    this.sanphamService.creategtsp(tsp).subscribe(
      () => {
          alert('Lưu thành công');
      }
  );
  }
  
}
