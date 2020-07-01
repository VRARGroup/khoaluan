import { Component, OnInit, ViewChildren, ElementRef, QueryList, Output, EventEmitter  } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { LoaisanphamService } from '../service/loaisanpham.service';
import { lsanpham } from '../model/loaisanpham';
import { SanphamService } from '../service/sanpham.service';
import { SaveimgfolderService } from '../service/saveimgfolder.service';
import { sp } from '../model/sanpham';
import { hinh } from '../model/sanpham';
import {imgfolder} from '../model/image';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-taosanpham',
  templateUrl: './taosanpham.component.html',
  styleUrls: ['./taosanpham.component.scss']
})
export class TaosanphamComponent implements OnInit {
  public num =0;
  urls = [];
  mota = [];
  urlimagedd: object;
  public numsp = [{
    id:0
  }];
  tensp: string;
  giaban:number;
  giamgia:number;
  dacdiemnoibat:string;
  i:number=0;
  idinput: string;
  idbuton: string;
  valueiput:object[]=[];
  alllsp:lsanpham[] = [];
  arrsp:sp[]=[];
	sp:lsanpham[] = [];
	selected:any =23;
  selectedthuonghieu:string ='';
  selectedthuonghieu1:string ='';
  massage = null;
  idlsp:number;
	divList : any[];
	tskt: any=[];
  tsktname: any=[];
  ktnull: number=0;
  hinhtsp: Array<hinh>=[];
  imageError: string;
  isImageSaved: boolean=false;
  isImageSaveddd: boolean=false;
  ktsavedhinhsanpham: boolean=true;
  ktthaotacdelete:boolean=true;
  ktthaotacsave:boolean=true;
  khoa:string="";
  imagebase64: string;
  nameimage: string[]=[];
  nameimagedd: string;
  hinhdaidiensanpham:string;
  public progress: number;
  serverPath: string="";
  alldacdiemnoibat:Array<any>=[];
  valuedacdiem:string="";
  @Output() public onUploadFinished = new EventEmitter();
  @ViewChildren('maRef') maRefs: QueryList<ElementRef>
  @ViewChildren('keyname') keynames: QueryList<ElementRef>
  @ViewChildren('inputmt') inputmts: QueryList<ElementRef>
 
  	

  constructor(private http: HttpClient,private formBuilder: FormBuilder,private router: Router, private LoaisanphamService: LoaisanphamService, private sanphamService: SanphamService, private saveimgfolderService: SaveimgfolderService) { }

  ngOnInit() {
  
    this.loadlsp(); 
    
    this.idlsp = parseInt(window.localStorage.getItem("editspid"));
    if(!isNaN(this.idlsp))
    {
      this.loadctsp(this.idlsp);

      this.ktthaotacdelete=true;
      this.ktthaotacsave=false;
    }
    else
    {
      this.alldacdiemnoibat.push("");
      this.ktthaotacdelete=false;
    }
  }

  valueChange(event){
  	this.loaddetaillsp(this.selected);
  
  }

  valueChangethuonghieu(event){
    this.selectedthuonghieu1=this.selectedthuonghieu;
  }

  loadlsp() {
    this.LoaisanphamService.getlsp().subscribe((res: lsanpham[] | null) => {
    this.alllsp = (res) ? res : [];
    });
  }

  loadctsp(id: number) {  
    this.sanphamService.getctsp(id).subscribe((res: sp[] | null) => {
    this.arrsp = (res) ? res : [];
    console.log(res);
    console.log("thuonghieu",res[0].thuonghieu);
    this.selected=res[0]._id_loaisanpham;
    this.valueChange(this.selected);
    this.selectedthuonghieu=res[0].thuonghieu;
    this.valueChangethuonghieu(this.selectedthuonghieu);
    this.tensp=res[0].ten;
    this.giaban=res[0].giaban;
    this.giamgia=res[0].giamgia;
    this.dacdiemnoibat=res[0].dacdiemnoibat;
    var sa=this.dacdiemnoibat.split(",");
    for(let i=0;i<sa.length;i++)
    {
      this.alldacdiemnoibat.push(sa[i]);
    }
    console.log(sa)
    var s=res[0].hinhdaidien;
    this.urlimagedd=Object(res[0].hinhdaidien);
    this.isImageSaveddd=true;
    
    for(let i=0;i<res[0].hinh.length;i++)
    {
      this.urls.push(res[0].hinh[i].hinhanh);
      var s=res[0].hinh[i].mota;
      this.mota.push(res[0].hinh[i].mota);
    }
    this.isImageSaved=true;
         
   });
   
  }

  loaddetaillsp(id: number) {  
     this.LoaisanphamService.getdetaillsp(id).subscribe((res: lsanpham[] | null) => {
     this.sp = (res) ? res : [];
    });
  }

   keys(obj){
    return Object.keys(obj);
	}

	onSubmit() {
    this.getvalueimagedd();
    for(let i=0;i<this.urls.length;i++)
    {
      this.getvalue(i);
    }
    
    if(this.alldacdiemnoibat!=undefined && this.alldacdiemnoibat!=null)
    {
      this.valuedacdiem= document.getElementById("dacdiem0")["value"];
      for(let i=1;i<this.alldacdiemnoibat.length;i++)
      {
        this.valuedacdiem=this.valuedacdiem+","+document.getElementById("dacdiem"+i)["value"];
      }
      console.log("dd",this.valuedacdiem);
    }
    if(document.getElementById('tensp')["value"]!=="" && this.selectedthuonghieu1!=="" && document.getElementById('giasanpham')["value"]!=="" && document.getElementById('giamgia')["value"]!=="")
    {
      this.maRefs.forEach((maRef: ElementRef) => {
      if(document.getElementById(maRef.nativeElement.id)["value"]==="")
      {
        this.ktnull=1;
      }
      else
      {
        this.ktnull=0;
      }
      });
      if(this.ktnull==0)
      {
    		console.log("count",this.maRefs.length);

    		this.maRefs.forEach((maRef: ElementRef) => console.log(maRef.nativeElement.name));

    		this.keynames.forEach((keyname: ElementRef) => this.tsktname.push(keyname.nativeElement.id));	

        this.maRefs.forEach((maRef: ElementRef) => this.tskt.push(maRef.nativeElement.name,document.getElementById(maRef.nativeElement.id)["value"]));
        let giamgiasanpham:number=0;
        if(document.getElementById('giamgia')["value"]!=="")
        {
          giamgiasanpham=parseInt(document.getElementById('giamgia')["value"]);
        }
        
        console.log("hinh:",this.hinhtsp);
    		const tsp = new sp( 
        	200,
        	document.getElementById('tensp')["value"],
        	this.selectedthuonghieu1,
          this.hinhtsp,
        	this.valuedacdiem,
        	parseInt(document.getElementById('giasanpham')["value"]),
        	giamgiasanpham,
          0,
          null,
          this.hinhdaidiensanpham,
        	this.selected,
        	this.tskt,
        );
        	console.log("dskt",this.tskt);
          console.log("dskt",this.tsktname);
          console.log(tsp);
          this.Createsp(tsp);
          this.reset();
      }
      else
      {
        this.massage = 'vui long nhap du';
        alert('vui long nhap du cac thong so ky thuat');
      }
      }
      else
      {
        this.massage = 'vui long nhap du';
        alert('vui long nhap du');
      }
      return false;
	}

  kitravalueundefined(h:string)
  {
    return h;
  }
  kitraundefined(h:number, l:number, key: string, v: string)
  {
    try
    {
      if(!isNaN(this.idlsp))
      {
        if(this.khoa=="")
        {
          this.khoa=key;
        }
        if(this.khoa!=key)
        {
          this.khoa=key;
          this.i=0;
        }
        
        if(this.arrsp[0].thongsokythuat[l][key][this.i][v]===undefined || this.arrsp[0].thongsokythuat[l][key][this.i][v]==null)
        {
          return "";
        }
        else
        {
          const vh=this.i;
          this.i++;
          console.log(v);
          return this.arrsp[0].thongsokythuat[l][key][vh][v];
        }
      }
      else
      {
        return null;
      }
    }
    catch{
      return null;
    }
  }

  reset()
  {
    document.getElementById('tensp')["value"]="";
    this.selectedthuonghieu="";
    for(var i=0 ; i <= this.hinhtsp.length; i++)
    {
      this.hinhtsp.splice(i, i+1);
    }
    
    document.getElementById('dacdiem')["value"]="";
    document.getElementById('giasanpham')["value"]=""
    document.getElementById('giamgia')["value"]="";
    this.loaddetaillsp(this.selected);
    for(var i=0 ; i < this.tskt.length; i++)
    {
      this.tskt.splice(i, i+1);
    }
    this.i=0;
    this.Removeimgaehtml();
    this.Removeurlimagedd();

    console.log("hinh",this.hinhtsp);
    console.log(this.tskt);
  }

	Createsp(tsp: sp){
		this.sanphamService.createsp(tsp).subscribe(
        	() => {
          		this.massage = 'Lưu thành công';
              alert(this.massage);
        	}
      );
	}

  //   onSelectFile(event) {
  //   if (event.target.files && event.target.files[0]) {
  //       var filesAmount = event.target.files.length;
  //       for (let i = 0; i < filesAmount; i++) {
  //               var reader = new FileReader();

  //               reader.onload = (event:any) => {
  //                 console.log(event.target.result);
  //                 this.urls.push(event.target.result);
  //                 this.isImageSaved=true;
  //                 this.valueiput.push(event.target.result);
  //                 this.imagebase64=event.target.result;
  //               }
  //               this.nameimage.push(document.getElementById("uploadCaptureInputFile")["value"]);
  //               reader.readAsDataURL(event.target.files[i]);
  //               document.getElementById("uploadCaptureInputFile")["value"] = "";
  //       }
  //       //this.i++;
  //       console.log(this.nameimage);
  //       console.log(this.i);
  //       console.log("imgname",document.getElementById("uploadCaptureInputFile")["value"]);
  //   }
  //   console.log(event);
    
    
  // }

  // onSelectFileimagedd(event) {
  //   if (event.target.files && event.target.files[0]) {
  //       var filesAmount = event.target.files.length;
  //       for (let i = 0; i < filesAmount; i++) {
  //               var reader = new FileReader();

  //               reader.onload = (event:any) => {
  //                 console.log(event.target.result);
  //                 this.urlimagedd=event.target.result;
  //                 this.isImageSaveddd=true;
  //               }
  //               this.nameimagedd=document.getElementById("uploadimagedd")["value"];
  //               reader.readAsDataURL(event.target.files[i]);
  //               document.getElementById("uploadimagedd")["value"] = "";
  //       }
  //       //this.i++;
  //       console.log(this.nameimagedd);
  //       console.log(this.i);
  //       console.log("imgname",document.getElementById("uploadimagedd")["value"]);
  //   }
  //   console.log(event);
    
  // }

      Add(){
        this.num ++;
        this.numsp.push({id:this.num});
        console.log(this.numsp)
      }

      Remove(index:{ id: number; }){
        console.log(index);
        this.urls.splice(this.urls.indexOf(index),1);
        console.log("xoa",this.urls);
      }

      Removeurlimagedd(){
        this.urlimagedd=null;
        this.isImageSaveddd=false;
        this.hinhdaidiensanpham="";
      }


      Removeimgaehtml(){
        for(var i=0 ; i <= this.urls.length; i++)
        {
          this.urls.splice(i, 1);
          this.responseimage.splice(i,1);
        }
        this.urls.splice(0, 1);
        console.log("xoa", this.responseimage)
      }

      getvalueimagedd()
      {
        if(this.nameimagedd!==undefined && this.nameimagedd!==null && this.nameimagedd!=="")
        {
          var tendd=this.nameimagedd.replace("C:\\fakepath\\","");
          this.hinhdaidiensanpham="https://localhost:44309/Resources/Images/"+tendd.toString();
        }
      }

      getvalue(v: number)
      {
        this.idinput="inputmt"+v;
        this.idbuton="btn"+v;
        this.inputmts.forEach((inputmt: ElementRef) => console.log(inputmt.nativeElement.id,document.getElementById(inputmt.nativeElement.id)["value"]));
        console.log("id",this.idinput);
        const hinhsp=new hinh(
          "https://localhost:44309/Resources/Images/"+this.urls[v],
          document.getElementById(this.idinput)["value"]
        );
        this.hinhtsp.push(hinhsp);
        (document.getElementById(this.idinput) as HTMLInputElement).disabled = true;
        this.ktsavedhinhsanpham=true;
      }

      Deletesp(){
        if (confirm("Bạn có muốn xóa sản phẩm này ?")) {  
            this.sanphamService.deletesp(this.idlsp).subscribe(() => {
            this.massage = 'Xóa thành công';
            alert(this.massage);
            this.router.navigate(['appmainnv/appmainquanly']);
          });
        }
      }

      kiemtrakey(key: string)
      {
        
        if(key=="Thẻ nhớ ngoài")
        {
          return false;
        }
        else
          return true;
      }

      responsedd: any="";
      responseimage: any=[];

      public uploadFiledd = (files) => {
        if (files.length === 0) {
          return;
        }
       
        let fileToUpload = <File>files[0];
        this.urlimagedd=Object(fileToUpload.name);
        this.nameimagedd=fileToUpload.name;
        this.isImageSaveddd=true;
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        this.http.post('https://localhost:44309/api/saveimagefolder', formData, {reportProgress: true, observe: 'events'})
          .subscribe(event => {
            if (event.type === HttpEventType.UploadProgress)
              this.progress = Math.round(100 * event.loaded / event.total);
            else if (event.type === HttpEventType.Response) {
              this.massage = 'Upload success.';
              this.responsedd=event.body;
              
              console.log(this.responsedd)
            }
          });
          document.getElementById("uploadimagedd")["value"] = "";
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
              this.massage = 'Upload success.';
              this.responseimage.push(event.body);
              console.log(this.responseimage)
            }
          });
          document.getElementById("uploadCaptureInputFile")["value"] = "";
          console.log("h",this.urls);
         
      }

      public createImgPath = (s:string) => {
        if(s==undefined)
        {
          this.serverPath="https://localhost:44309/Resources/Images/"+this.serverPath;
        }
        else
        {
          if(!isNaN(this.idlsp))
          {
            this.serverPath=s;
          }
          else
          {
            this.serverPath="https://localhost:44309/Resources/Images/"+s;
          }
        }
        
        return this.serverPath;
      }

      Adddacdiemnoibat()
      {
        this.alldacdiemnoibat.push("");
        console.log(this.alldacdiemnoibat);
      }
}
