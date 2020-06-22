import { Component, OnInit, ViewChildren, ElementRef, QueryList  } from '@angular/core';
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

@Component({
  selector: 'app-taosanpham',
  templateUrl: './taosanpham.component.html',
  styleUrls: ['./taosanpham.component.scss']
})
export class TaosanphamComponent implements OnInit {
  public num =0;
  urls = []; 
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
  valueiput:object;
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
  cardImageBase64: string;
  khoa:string="";
  imagebase64: string;
  nameimage: string;
  @ViewChildren('maRef') maRefs: QueryList<ElementRef>
  @ViewChildren('keyname') keynames: QueryList<ElementRef>
  @ViewChildren('inputmt') inputmts: QueryList<ElementRef>
  	

  constructor(private formBuilder: FormBuilder,private router: Router, private LoaisanphamService: LoaisanphamService, private sanphamService: SanphamService, private saveimgfolderService: SaveimgfolderService) { }

  ngOnInit() {   
    this.loadlsp(); 
    this.idlsp = parseInt(window.localStorage.getItem("editspid"));
    if(!isNaN(this.idlsp))
    {
      this.loadctsp(this.idlsp);
    }
    else
    {
      
    }
  	//console.log(this.alllsp);
  }

  valueChange(event){
  	//console.log("selected value",event.target.value ,'value of selected',this.selected);
  	this.loaddetaillsp(this.selected);
  
  }

  valueChangethuonghieu(event){
    //console.log("selected value",event.target.value ,'value of selected',this.selectedthuonghieu);
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
   });
   
  }

  loaddetaillsp(id: number) {  
     this.LoaisanphamService.getdetaillsp(id).subscribe((res: lsanpham[] | null) => {
     this.sp = (res) ? res : [];
    });
  }

   keys(obj){
   	//console.log(obj);
    return Object.keys(obj);
	}

	onSubmit() {
    
    if(document.getElementById('tensp')["value"]!=="" && this.selectedthuonghieu1!=="" && document.getElementById('dacdiem')["value"]!=="" && document.getElementById('giasanpham')["value"]!=="" && document.getElementById('giamgia')["value"]!=="")
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

        
        console.log("hinh:",this.hinhtsp);
    		const tsp = new sp( 
        	200,
        	document.getElementById('tensp')["value"],
        	this.selectedthuonghieu1,
          this.hinhtsp,
        	document.getElementById('dacdiem')["value"],
        	parseInt(document.getElementById('giasanpham')["value"]),
        	parseInt(document.getElementById('giamgia')["value"]),
        	0,
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
	}

  kitravalueundefined(h:string)
  {
    return h;
  }
  kitraundefined(h:number, l:number, key: string, v: string)
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
      if(this.arrsp[0].thongsokythuat[l][key][this.i][v]==undefined || this.arrsp[0].thongsokythuat[l][key][this.i][v]==null)
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

    onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  console.log(event.target.result);
                  this.urls.push(event.target.result);
                  this.isImageSaved=true;
                  this.valueiput=event.target.result;
                  this.imagebase64=event.target.result;
                }
                this.nameimage=document.getElementById("uploadCaptureInputFile")["value"];
                reader.readAsDataURL(event.target.files[i]);
                document.getElementById("uploadCaptureInputFile")["value"] = "";
        }
        //this.i++;
        console.log(this.nameimage);
        console.log(this.i);
        console.log("imgname",document.getElementById("uploadCaptureInputFile")["value"]);
    }
    console.log(event);
    
  }

  saveimageinfolder(v: imgfolder)
  {
    
    this.saveimgfolderService.saveimagefolder(v).subscribe(
      () => {
          this.massage = 'Lưu thành công';
          alert(this.massage);
      }
    );
  }

      Add(){
        this.num ++;
        this.numsp.push({id:this.num});
        console.log(this.numsp)
      }

      Remove(index:{ id: number; }){
        console.log(index);
        //this.numsp.splice(this.numsp.indexOf(index),1);
        this.urls.splice(this.urls.indexOf(index),1);
        console.log("xoa",this.urls);
      }


      Removeimgaehtml(){
        for(var i=0 ; i <= this.urls.length; i++)
        {
          this.urls.splice(i, 1);
        }
        this.urls.splice(0, 1);
      }

      getvalue()
      {
        this.idinput="inputmt"+this.i;
        this.idbuton="btn"+this.i;
        this.inputmts.forEach((inputmt: ElementRef) => console.log(inputmt.nativeElement.id,document.getElementById(inputmt.nativeElement.id)["value"]));
        console.log("id",this.idinput);
        console.log("kqmt",document.getElementById(this.idinput)["value"]);
        var tendd=this.nameimage.replace("C:\\fakepath\\","");

        const hinhsavefolder= new imgfolder(
          this.valueiput,
          tendd.toString()
        );
        this.saveimageinfolder(hinhsavefolder);
        const hinhsp=new hinh(
          this.valueiput,
          document.getElementById(this.idinput)["value"]
        );
        this.hinhtsp.push(hinhsp);
        (document.getElementById(this.idbuton) as HTMLInputElement).disabled = true;
        (document.getElementById(this.idinput) as HTMLInputElement).disabled = true;
        this.i++;
      }
}
