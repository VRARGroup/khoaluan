import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { LoaisanphamserviceService } from '../service/loaisanphamservice.service';
import { lsanpham } from '../model/loaisanpham';

@Component({
  selector: 'app-taoloaisanpham',
  templateUrl: './taoloaisanpham.component.html',
  styleUrls: ['./taoloaisanpham.component.scss']
})
export class TaoloaisanphamComponent implements OnInit {
  public num =0;
  massage = null;
  inputth:string;
  input:string;
  text:string;
  ktnulldactrung:number=0;
  ktnullthuonghieu:number=0;
  dactrung: any=[];
  thieu: Array<string>=[];
  public numsp = [{
    id:0
  }];
  public numspth = [{
    id:0
  }];
  @ViewChildren('maRef') maRefs: QueryList<ElementRef>;
  @ViewChildren('monlun') monluns: QueryList<ElementRef>;
  constructor(private router: Router, private loaisanphamserviceService: LoaisanphamserviceService) { }

  ngOnInit() {
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
          
          const lsp=new lsanpham(
            200,
            document.getElementById('tensp')["value"],
            this.thieu,
            this.dactrung,
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
    this.num ++;
    this.numsp.push({id:this.num});
    console.log(this.numsp)
  }

  reset()
  {
    document.getElementById('tensp')["value"]="";
    if(this.numspth.length > 1)
    {
      for(var i=0 ; i < this.numspth.length; i++)
      {
        this.numspth.splice(i, i+1);
      }
    }
    else
    {
      if(this.numspth.length == 1)
      {
        this.inputth='inputth'+0;
        document.getElementById(this.inputth)["value"]="";
      }
      else
      {
        this.inputth='inputth'+this.numspth.length;
        document.getElementById(this.inputth)["value"]="";
      }
    }
    if(this.numsp.length > 1)
    {
      for(var i=0 ; i < this.numsp.length; i++)
      {
        this.numsp.splice(i, i+1);
      }
    }
    else
    {
      if(this.numsp.length == 1)
      {
        this.input='input'+0;
        document.getElementById(this.input)["value"]="";
        this.text='text'+0;
        document.getElementById(this.text)["value"]="";
        
      }
      else
      {
        this.input='input'+this.numsp.length;
        document.getElementById(this.input)["value"]="";
        this.text='text'+this.numsp.length;
        document.getElementById(this.text)["value"]="";
      }
    }
    this.num=0;
  }

  Remove(index:{ id: number; }){
    console.log(index);
    this.numsp.splice(this.numsp.indexOf(index),1);
  }

  Addth(){
    this.num ++;
    this.numspth.push({id:this.num});
    console.log(this.numspth)
  }

  Removeth(index:{ id: number; }){
    console.log(index);
    this.numspth.splice(this.numspth.indexOf(index),1);
  }

  Createlsp(lsp: lsanpham){
		this.loaisanphamserviceService.createlsp(lsp).subscribe(
        	() => {
          		this.massage = 'Lưu thành công';
              alert(this.massage);
        	}
      );
	}
  
}
