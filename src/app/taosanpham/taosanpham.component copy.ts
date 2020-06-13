import { Component, OnInit, ViewChildren,ViewChild, ElementRef, QueryList  } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { LoaisanphamserviceService } from '../service/loaisanphamservice.service';
import { lsanpham } from '../model/loaisanpham';
import { SanphamService } from '../service/sanpham.service';
import { sp } from '../model/sanpham';
import { hinh } from '../model/sanpham';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-taosanpham',
  templateUrl: './taosanpham.component.html',
  styleUrls: ['./taosanpham.component.scss']
})
export class TaosanphamComponent implements OnInit {
	alllsp:lsanpham[] = [];
	sp:lsanpham[] = [];
	selected:any =23;
  selectedthuonghieu:string ='';
  selectedthuonghieu1:string ='';
	massage = null;
	divList : any[];
	tskt: any=[];
  tsktname: any=[];
  ktnull: number=0;
  hinhtsp: Array<hinh>=[];
  @ViewChildren('maRef') maRefs: QueryList<ElementRef>
  @ViewChildren('keyname') keynames: QueryList<ElementRef>
  	

  constructor(private formBuilder: FormBuilder,private router: Router, private loaisanphamserviceService: LoaisanphamserviceService, private sanphamService: SanphamService) { }

  ngOnInit() {
  	this.loadlsp();
  	//console.log(this.alllsp);
  }

  valueChange(event){
  	console.log("selected value",event.target.value ,'value of selected',this.selected);
  	this.loaddetaillsp(this.selected);
  
  }

  valueChangethuonghieu(event){
    console.log("selected value",event.target.value ,'value of selected',this.selectedthuonghieu);
    this.selectedthuonghieu1=this.selectedthuonghieu;
  }

  loadlsp() {
    this.loaisanphamserviceService.getlsp().subscribe((res: lsanpham[] | null) => {
     this.alllsp = (res) ? res : [];
    });
  }

  loaddetaillsp(id: number) {  
     this.loaisanphamserviceService.getdetaillsp(id).subscribe((res: lsanpham[] | null) => {
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
      if(this.ktnull==0)
      {
    		console.log("count",this.maRefs.length);

    		this.maRefs.forEach((maRef: ElementRef) => console.log(maRef.nativeElement.name));

    		this.keynames.forEach((keyname: ElementRef) => this.tsktname.push(keyname.nativeElement.id));	

        this.maRefs.forEach((maRef: ElementRef) => this.tskt.push(maRef.nativeElement.name,document.getElementById(maRef.nativeElement.id)["value"]));

        const hinhsp=new hinh(
          "hinh1",
          "mota1"
        );
        this.hinhtsp.push(hinhsp);
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
          //this.Createsp(tsp);
          this.reset();
          this.Createsp(tsp);
      }
      }
      else
      {
        this.massage = 'vui long nhap du';
        alert('vui long nhap du');
      }
	}

  reset()
  {
    document.getElementById('tensp')["value"]="";
    this.selectedthuonghieu="";
    for(var i=0 ; i < this.hinhtsp.length; i++)
    {
      this.hinhtsp=this.hinhtsp.splice(i, i);
    }
    document.getElementById('dacdiem')["value"]="";
    document.getElementById('giasanpham')["value"]=""
    document.getElementById('giamgia')["value"]="";
    this.loaddetaillsp(this.selected);
    for(var i=0 ; i < this.tskt.length; i++)
    {
      this.tskt=this.tskt.splice(i, i);
    }
  }

	Createsp(tsp: sp){
		this.sanphamService.createsp(tsp).subscribe(
        	() => {
          		this.massage = 'Lưu thành công';
        	}
      );
	}
}
