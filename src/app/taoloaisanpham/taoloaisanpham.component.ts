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
    //this.Createlsp(lsp);
  }
  
  Add(){
    this.num ++;
    this.numsp.push({id:this.num});
    console.log(this.numsp)
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
        	}
      );
	}
  
}
