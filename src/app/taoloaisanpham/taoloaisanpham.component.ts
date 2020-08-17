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
    $('#btn_closeth').css("display","none");
    $('#div_themth').css("display","none");
    this.hoatdong=JSON.parse(window.localStorage.getItem("editid1"));
    console.log(this.hoatdong);
    this.getthuonghieu();
    document.getElementById("btndx").style.display="block";
    document.getElementById("btndmk").style.display = "block";
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

  ngDoCheck() {
    this.checkallth_dachon()
  }
  checkallth_dachon()
  {
    for(let i of this.allth_dachon)
    {
      var index=this.allth.indexOf(i,0);
      if(index>-1)
      {
        $("#category_"+index).prop('checked', true);
      }
    }
  }
  

  onSubmit() {
    if(document.getElementById('tensp')["value"]!=="")
    {
      if(this.allth_dachon.length>0)
      {
        this.ktnullthuonghieu=1;
      }
      else
      {
        this.ktnullthuonghieu=0;
      }
      
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
              this.tieuchigs.forEach((tieuchig: ElementRef) => this.tieuchidanhgia.push(document.getElementById(tieuchig.nativeElement.id)["value"]));
              const lsp=new lsanpham(
                200,
                document.getElementById('tensp')["value"],
                this.allth_dachon,
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
              this.tieuchigs.forEach((tieuchig: ElementRef) => this.tieuchidanhgia.push(document.getElementById(tieuchig.nativeElement.id)["value"]));
              const lsp=new lsanpham(
                this.idlsp,
                document.getElementById('tensp')["value"],
                this.allth_dachon,
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
    this.allth_dachon=[];
    this.alldt=[];
    this.alltcdg=[]
    document.getElementById('tensp')["value"]="";
    this.num=0;
    this.dactrung=[];
    this.tieuchidanhgia=[]
    console.log(this.allth);
    console.log(this.alltcdg);
    console.log(this.alldt);
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
    $('#btn_themth').css("display","none");
    $('#btn_closeth').css("display","block");
    $('#div_themth').css("display","block");
  }

  Addth1(){
    $('#btn_themth').css("display","block");
    $('#btn_closeth').css("display","none");
    $('#div_themth').css("display","none");
    $('#add-th').val("");
  }

  h:number=0;
  Addth3(){
    var v=$('#add-th').val();
    this.allth.push(v);
    this.h=this.allth.length;
  }

  Removeth(id: number){
    console.log(id);
    (document.getElementById("category_"+id) as HTMLInputElement).checked = false;
    this.allth_dachon.splice(id,1);
  }

  Removeth_them(value: string){
    var index=this.allth.indexOf(value);
    var index1=this.allth_dachon.indexOf(value);
    if(index1>-1)
    {
      (document.getElementById("category_"+index1) as HTMLInputElement).checked = false;
      this.allth_dachon.splice(index1,1);
    }
    if(index>-1)
    {
      this.allth.splice(index,1);
    }
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
        	(data) => {
            if(data!=null && data!=undefined)
            {
          		this.massage = 'Lưu thành công.';
              alert(this.massage);
            }
            else
            {
              alert("Gặp sự cố !!!");
            }
        	}
      );
  }

  Deletelsp(){
    if (confirm("Bạn có muốn xóa loại sản phẩm này ?")) {  
        this.LoaisanphamService.deletelsp(this.idlsp).subscribe((data) => {
        if(data!=undefined && data!=null)
        {
          this.massage = 'Xóa thành công';
          alert(this.massage);
          this.router.navigate(['appmainnv/appmainquanly']);
        }
        else
        {
          alert("Gặp sự cố !!!");
          this.router.navigate(['appmainnv/appmainquanly']);
        }
      });
    }
  }

  Updatelsp(lsp: lsanpham){
		this.LoaisanphamService.updatelsp(lsp).subscribe(
        	(data) => {
            if(data!=null && data!=undefined)
            {
          		this.massage = 'Lưu thành công.';
              alert(this.massage);
            }
            else
            {
              alert("Gặp sự cố !!!");
            }
        	}
      );
  }
  
  loaddetaillsp(i: number) {  
      this.LoaisanphamService.getdetaillsp(i).subscribe((res: lsanpham[] | null) => {
      this.ls = (res) ? res : [];
      console.log(res[0].thuonghieu);
      this.allth_dachon=res[0].thuonghieu;
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

  count_allth:number=0;
  getthuonghieu()
  {
    this.LoaisanphamService.getth().subscribe((res: string[] | null) => {
      this.allth = (res.sort()) ? res : [];
      this.count_allth = res.length;
      console.log(res);
    });
  }

  allth_dachon:string[]=[];
  suggest_category(value:string)
  {
    if(value!=null && value!=undefined)
    {
      let index:number=this.allth_dachon.indexOf(value,0);
      if(index==-1)
      {
        this.allth_dachon.push(value);
      }
      else
      {
        this.allth_dachon.splice(index,1);
      }
    }
    console.log(this.allth_dachon)
  }
}
