import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { LoaisanphamserviceService } from '../service/loaisanphamservice.service';
import { lsanpham } from '../model/loaisanpham';
import { SanphamService } from '../service/sanpham.service';
import { sp } from '../model/sanpham';
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
	 massage = null;
	 myFormGroup:FormGroup;
  	myFormGroupSubs:Subscription;
  	 @ViewChild('maRef',{static:false}) maRef: ElementRef; 

  constructor(private formBuilder: FormBuilder,private router: Router, private loaisanphamserviceService: LoaisanphamserviceService, private sanphamService: SanphamService) { }

  ngOnInit() {
  	this.loadlsp();
  	//console.log(this.alllsp);
  }

  valueChange(event){
  	console.log("selected value",event.target.value ,'value of selected',this.selected);
  	this.loaddetaillsp(this.selected);
  
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
		
    	console.log(this.maRef.nativeElement.value);
   
  	}

	Createsp(s: sp){
		console.log(s)
        this.sanphamService.createsp(s).subscribe(
        () => {
            this.massage = 'Lưu thành công';
        }
      );
    } 
}
