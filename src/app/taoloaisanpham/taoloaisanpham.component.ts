import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { LoaisanphamService } from '../service/loaisanpham.service';
import { lsanpham } from '../model/loaisanpham';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Key } from 'protractor';
import { KeyValuePipe } from '@angular/common';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import {Location} from '@angular/common';

@Component({
  selector: 'app-taoloaisanpham',
  templateUrl: './taoloaisanpham.component.html',
  styleUrls: ['./taoloaisanpham.component.scss']
})
export class TaoloaisanphamComponent implements OnInit {
  public num =0;
  tenloaisp:string;
  massage = null;
  inputth:string;
  input:string;
  text:string;
  ktthaotacdelete:boolean=true;
  ktthaotacsave:boolean=true;
  ktnulldactrung:number=0;
  ktnullthuonghieu:number=0;
  ktnulltcdg:number=0;
  dactrung: any=[];
  tieuchidanhgia: any=[];
  thieu: Array<string>=[];
  ls:lsanpham[]=[];
  allth: Array<any>=[];
  alldt: Array<any>=[];
  allctdt: Array<any>=[];
  allslctdt: Array<any>=[];
  alltcdg: Array<any>=[];
  idlsp:number;
  public numsp = [{
    id:0
  }];
  public numspth = [{
    id:0
  }];
  @ViewChildren('maRef') maRefs: QueryList<ElementRef>;
  @ViewChildren('monlun') monluns: QueryList<ElementRef>;
  @ViewChildren('tieuchig') tieuchigs: QueryList<ElementRef>;
  hoatdong:boolean=false;
  constructor(private location:Location, private router: Router, private LoaisanphamService: LoaisanphamService) { }

  ngOnInit() {
    this.hoatdong=JSON.parse(window.localStorage.getItem("editid1"));
    console.log(this.hoatdong);
    document.getElementById("btndx").style.display="block";
    if(this.hoatdong==false|| this.hoatdong==null)
    {
      this.router.navigate(['appmainnv/login']);
    }
    this.idlsp = parseInt(window.localStorage.getItem("editspid"));
    if(this.idlsp>0 && !isNaN(this.idlsp))
    { 
      this.ktthaotacdelete=true;
      this.ktthaotacsave=false;
      this.loaddetaillsp(this.idlsp);
      
    }
    else
    {
      if(window.localStorage.getItem("tlspid")!=null)
      {
        console.log(window.localStorage.getItem("tlspid"));
        this.ktthaotacdelete=false;
        this.alldt.push("");
        this.allth.push("");
        this.alltcdg.push("");
      }
      else
      {
        this.location.back();
      }
    }
  }

  onSubmit() {
    if(document.getElementById('tensp')["value"]!=="")
    {
      
      this.monluns.forEach((monlun: ElementRef) => 
      {
      if(document.getElementById(monlun.nativeElement.id)["value"]!=="")
      {
        this.ktnullthuonghieu=1;
      }
      else
      {
         this.ktnullthuonghieu=0;
      }
      });
      
      this.maRefs.forEach((maRef: ElementRef) => 
      {
      if(document.getElementById(maRef.nativeElement.id)["value"]!=="")
      {
        this.ktnulldactrung=1;
      }
      else
      {
         this.ktnulldactrung=0;
      }
      });
      if(this.ktnullthuonghieu==1)
      {
        if(this.ktnulldactrung==1)
        {
            if(this.ktthaotacdelete==false)
            {
              console.log("count",this.maRefs.length);           
              this.maRefs.forEach((maRef: ElementRef) => this.dactrung.push(document.getElementById(maRef.nativeElement.id)["value"]));
              this.monluns.forEach((monlun: ElementRef) => this.thieu.push(document.getElementById(monlun.nativeElement.id)["value"]));
              this.tieuchigs.forEach((tieuchig: ElementRef) => this.tieuchidanhgia.push(document.getElementById(tieuchig.nativeElement.id)["value"]));
              const lsp=new lsanpham(
                200,
                document.getElementById('tensp')["value"],
                this.thieu,
                this.dactrung,
                this.tieuchidanhgia
              );
              console.log(this.dactrung);
              console.log(lsp);
              this.Createlsp(lsp);
              this.reset();
            }
            else
            {
              console.log("count",this.maRefs.length);           
              this.maRefs.forEach((maRef: ElementRef) => this.dactrung.push(document.getElementById(maRef.nativeElement.id)["value"]));
              this.monluns.forEach((monlun: ElementRef) => this.thieu.push(document.getElementById(monlun.nativeElement.id)["value"]));
              this.tieuchigs.forEach((tieuchig: ElementRef) => this.tieuchidanhgia.push(document.getElementById(tieuchig.nativeElement.id)["value"]));
              const lsp=new lsanpham(
                this.idlsp,
                document.getElementById('tensp')["value"],
                this.thieu,
                this.dactrung,
                this.tieuchidanhgia
              );
              console.log(this.dactrung);
              console.log(lsp);
              this.Updatelsp(lsp);
              this.reset();
              this.ktthaotacdelete=false;
            }
         
        }
        else
        {
          alert("vui lòng nhập đặc trưng");
        }
      }
      else
      {
        alert("vui lòng nhập thương hiệu");
      }
    }
    else
    {
      alert("vui lòng nhập đủ thông tin");
    }
  }
  
  

  reset()
  {
    console.log("t",this.allth);
    console.log("t",this.alltcdg);
    console.log("t",this.alldt);
    document.getElementById('tensp')["value"]="";
    if(this.allth.length > 1)
    {
      for(let i=0;i<this.thieu.length;i++)
      {
        document.getElementById('inputth'+i)["value"]="";
        this.thieu.splice(0, 1);
      }
      if(this.allth.length>0)
      {
        document.getElementById('inputth0')["value"]="";
      }
      
    }
    else
    {
      if(this.allth.length == 1)
      {
        this.inputth='inputth'+0;
        document.getElementById(this.inputth)["value"]="";
        const i=1;
        while(i<this.allth.length)
        {
          this.allth.splice(0, 1);
          this.allth.length--;
        }
      }
      else
      {
        this.inputth='inputth'+this.allth.length;
        document.getElementById(this.inputth)["value"]="";
        this.allth.splice(0, 1);
      }
    }
    if(this.alldt.length > 1)
    {
     
      for(let i=0;i<this.alldt.length;i++)
      {
        this.alldt.splice(0, 1);
        document.getElementById('input'+i)["value"]="";
      }
     
      if(this.alldt.length>0)
      {
        document.getElementById('input0')["value"]="";
      }
    }
    else
    {
      if(this.alldt.length === 1)
      {
        this.input='input'+0;
        document.getElementById(this.input)["value"]="";
        this.text='text'+0;
        document.getElementById(this.text)["value"]="";
        const i=1;
        while(i<this.alldt.length)
        {
          this.alldt.splice(0, 1);
        }
      }
      else
      {
        this.input='input'+this.alldt.length;
        document.getElementById(this.input)["value"]="";
        this.text='text'+this.alldt.length;
        document.getElementById(this.text)["value"]="";
        this.alldt.splice(0, 1);
      }
    }
    if(this.alltcdg.length > 1)
    {
      for(let i=0;i<this.alltcdg.length;i++)
      {
        this.alltcdg.splice(0, 1);
        document.getElementById('inputtcdg'+i)["value"]="";
      }
      if(this.alltcdg.length>0)
      {
        document.getElementById('inputtcdg0')["value"]="";
        document.getElementById('text0')["value"]="";
      }
     
    }
    else
    {
      if(this.alltcdg.length === 1)
      {
        this.input='inputtcdg'+0;
        document.getElementById(this.input)["value"]="";
        const i=1;
        while(i<this.alltcdg.length)
        {
          this.alltcdg.splice(0, 1);
          this.alltcdg.length--;
        }
        
      }
      else
      {
        this.input='inputtcdg'+this.alltcdg.length;
        document.getElementById(this.input)["value"]="";
        this.alltcdg.splice(0, 1);
      }
    }
    this.num=0;
    this.dactrung=[];
    this.thieu=[];
    this.tieuchidanhgia=[]
    console.log(this.allth);
    console.log(this.alltcdg);
    console.log(this.alldt);
    console.log(this.thieu);
    console.log(this.dactrung);
    console.log(this.tieuchidanhgia);
  }

  Add(){
    // this.num ++;
    // this.numsp.push({id:this.num});
    // console.log(this.numsp)
    this.alldt.push("");console.log(this.alldt)
  }

  Remove(id: number){
    console.log(id);
    for(let i=id; i<this.alldt.length; i++)
    {
      if(i<this.alldt.length-1)
      {
        let j=i+1;
        document.getElementById("text"+i)["value"]=document.getElementById("text"+j)["value"];
      }
    }
    this.xoamanginput(this.alldt,"input",id);
   
  }

  xoamanginput(arr:Array<any>,idinput:string, id: number)
  {
    if(this.idlsp==0)
    {
      if(id<arr.length-1)
      {
        for(let i=id; i<arr.length; i++)
        {
          if(i<arr.length-1)
          {
            let j=i+1;
            document.getElementById(idinput+i)["value"]=document.getElementById(idinput+j)["value"];
          }
        }
      }
    }
    arr.splice(id,1);
    
  }

  Addth(){
    // this.num ++;
    // this.numspth.push({id:this.num});
    // console.log(this.numspth)
    this.allth.push("");console.log(this.allth)
  }

  Removeth(id: number){
    console.log(id);
    this.xoamanginput(this.allth,"inputth",id);
  }

  Addtcdg(){
    this.alltcdg.push("");console.log(this.alltcdg)
  }

  Removetcdg(id: number){
    console.log(id);
    this.xoamanginput(this.alltcdg,"inputtcdg",id);
  }

  // Addctdactrung(i:number){
   
  //   this.allctdt.push(i,1);
  //   console.log(this.allctdt);
  //   const all:Array<any>=[];
  //   all.push(i,1);
  //   this.allslctdt.push(all);
  //   console.log(this.allctdt.length);
  //   console.log("sl",this.allslctdt);
  // }

  // arrayOne(n: number): any[] {
  //   return Array(n);
  // }

  Createlsp(lsp: lsanpham){
		this.LoaisanphamService.createlsp(lsp).subscribe(
        	() => {
          		this.massage = 'Lưu thành công';
              alert(this.massage);
        	}
      );
  }

  Deletelsp(){
    if (confirm("Bạn có muốn xóa loại sản phẩm này ?")) {  
        this.LoaisanphamService.deletelsp(this.idlsp).subscribe(() => {
        this.massage = 'Xóa thành công';
        alert(this.massage);
        this.router.navigate(['appmainnv/appmainquanly']);
      });
    }
  }

  Updatelsp(lsp: lsanpham){
		this.LoaisanphamService.updatelsp(lsp).subscribe(
        	() => {
          		this.massage = 'Lưu thành công';
              alert(this.massage);
        	}
      );
  }
  
  loaddetaillsp(i: number) {  
      this.LoaisanphamService.getdetaillsp(i).subscribe((res: lsanpham[] | null) => {
      this.ls = (res) ? res : [];
      console.log(res[0].thuonghieu);
      this.allth=res[0].thuonghieu;
      this.tenloaisp=res[0].tendanhmuc;
      this.alldt=res[0].dactrung;
      if(res[0].tieuchidanhgia!=null)
      {
        for(let i=0;i<res[0].tieuchidanhgia.toString().split(",").length-1;i++)
        {
          this.alltcdg.push(res[0].tieuchidanhgia[i]);
        }
      }
      console.log("th",this.allth);
      console.log(res);
    });
  }

  keys(obj){
    //console.log(obj);
   return Object.keys(obj);
 }
  
  ktu: number=0;
  t:string;
  t0:string;
  keydb(i:number)
  {
    if(this.ktu==0)
    {
      let regex = /^[*:?$!@#^%&"]/; // Chỉ chấp nhận ký tự alphabet thường hoặc ký tự hoa
      let regex1 = /^[\n \t \r]+$/
      let regex2 = /^[,]/;
      this.t=document.getElementById("text"+i)["value"];
      var s=this.t.charAt(this.t.length-1);
      if(regex2.test(this.t.charAt(this.t.length-1)))
      {
        if(this.t0===undefined || this.t0==="")
        {
          alert("lỗi ký tự"+""+(document.getElementById("text"+i)["value"]));
          document.getElementById("text"+i)["value"]="";
        }
        else
        {
          if(this.t.charAt(this.t.length-2)==" ")
          {
            alert("lỗi ký tự"+""+(document.getElementById("text"+i)["value"]));
            document.getElementById("text"+i)["value"]=this.t0.trim();
          }
        }
      }
      if( regex1.test(this.t.charAt(this.t.length-1)))
      {
        console.log("space");
      }
      if (regex.test(this.t.charAt(this.t.length-1))) { // true nếu text chỉ chứa ký tự alphabet thường hoặc hoa, false trong trường hợp còn lại. 
        alert("lỗi ký tự"+""+(document.getElementById("text"+i)["value"]));
        if(this.t0!=null)
        {
          document.getElementById("text"+i)["value"]=this.t0.trim();
        }
        else
        {
          document.getElementById("text"+i)["value"]="";
        }
      } else {
        this.t0=document.getElementById("text"+i)["value"];
      }
    }
  }

  hiddenwarbutton(i:number)
  {
    
    if(this.ktu==i)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  kiemtravaluenull(s:string)
  {
    if(s==null||s!=null)
    {
      return true;
    }
  }

  back()
  {
    this.location.back();
  }
}
