import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { LoaisanphamService } from '../service/loaisanpham.service';
import { lsanpham } from '../model/loaisanpham';

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
  ktnulldactrung:number=0;
  ktnullthuonghieu:number=0;
  ktnulltcdg:number=0;
  dactrung: any=[];
  tieuchidanhgia: any=[];
  thieu: Array<string>=[];
  ls:lsanpham[]=[];
  allth: Array<any>=[];
  alldt: Array<any>=[];
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
  
  constructor(private router: Router, private LoaisanphamService: LoaisanphamService) { }

  ngOnInit() {
    this.idlsp = parseInt(window.localStorage.getItem("editspid"));
    if(this.idlsp>0)
    { 
      this.ktthaotacdelete=false;
      this.loaddetaillsp(this.idlsp);
    }
    else
    {
      this.ktthaotacdelete=true;
      this.alldt.push("");
      this.allth.push("");
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
  
  Add(){
    // this.num ++;
    // this.numsp.push({id:this.num});
    // console.log(this.numsp)
    this.alldt.push("");console.log(this.alldt)
  }

  reset()
  {
    document.getElementById('tensp')["value"]="";
    if(this.allth.length > 1)
    {
      const i=0;
      while(i<this.allth.length)
      {
        this.allth.splice(0, 1);
      }
    }
    else
    {
      if(this.allth.length == 1)
      {
        this.inputth='inputth'+0;
        document.getElementById(this.inputth)["value"]="";
      }
      else
      {
        this.inputth='inputth'+this.allth.length;
        document.getElementById(this.inputth)["value"]="";
      }
    }
    if(this.alldt.length > 1)
    {
      const i=0;
      while(i<this.alldt.length)
      {
        this.alldt.splice(0, 1);
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
        
      }
      else
      {
        this.input='input'+this.alldt.length;
        document.getElementById(this.input)["value"]="";
        this.text='text'+this.alldt.length;
        document.getElementById(this.text)["value"]="";
      }
    }
    if(this.alltcdg.length > 1)
    {
      const i=0;
      while(i<this.alltcdg.length)
      {
        this.alltcdg.splice(0, 1);
      }
    }
    else
    {
      if(this.alltcdg.length === 1)
      {
        this.input='inputtcdg'+0;
        document.getElementById(this.input)["value"]="";
        
      }
      else
      {
        this.input='inputtcdg'+this.alltcdg.length;
        document.getElementById(this.input)["value"]="";
      }
    }
    this.num=0;
  }

  Remove(index:{ id: number; }){
    console.log(index);
    this.alldt.splice(this.alldt.indexOf(index),1);
  }

  Addth(){
    // this.num ++;
    // this.numspth.push({id:this.num});
    // console.log(this.numspth)
    this.allth.push("");console.log(this.allth)
  }

  Removeth(index:{ id: number; }){
    console.log(index);
    this.allth.splice(this.allth.indexOf(index),1);
  }

  Addtcdg(){
    // this.num ++;
    // this.numspth.push({id:this.num});
    // console.log(this.numspth)
    this.alltcdg.push("");console.log(this.alltcdg)
  }

  Removetcdg(index:{ id: number; }){
    console.log(index);
    this.alltcdg.splice(this.alltcdg.indexOf(index),1);
  }

  Createlsp(lsp: lsanpham){
		this.LoaisanphamService.createlsp(lsp).subscribe(
        	() => {
          		this.massage = 'Lưu thành công';
              alert(this.massage);
        	}
      );
  }

  Deletelsp(){
    if (confirm("Bạn có muốn xóa sự kiện này ?")) {  
        this.LoaisanphamService.deletelsp(this.idlsp).subscribe(() => {
        this.massage = 'Xóa thành công';
        alert(this.massage);
        this.router.navigate(['appmainnv/appmainquanly']);
      });
    }
  }
  
  loaddetaillsp(i: number) {  
      this.LoaisanphamService.getdetaillsp(i).subscribe((res: lsanpham[] | null) => {
      this.ls = (res) ? res : [];
      console.log(res[0].thuonghieu);
      this.allth=res[0].thuonghieu;
      this.tenloaisp=res[0].tendanhmuc;
      this.alldt=res[0].dactrung;
      this.alltcdg=res[0].tieuchidanhgia;
      console.log("th",this.allth);
      console.log(res);
    });
  }

  keys(obj){
    //console.log(obj);
   return Object.keys(obj);
 }
  
}
