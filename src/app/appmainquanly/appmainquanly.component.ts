import { Component, OnInit, ViewChildren,ViewChild, ElementRef, QueryList  } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { LoaisanphamService } from '../service/loaisanpham.service';
import { lsanpham } from '../model/loaisanpham';
import { SanphamService } from '../service/sanpham.service';
import { sp } from '../model/sanpham';
import { hinh } from '../model/sanpham';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-appmainquanly',
  templateUrl: './appmainquanly.component.html',
  styleUrls: ['./appmainquanly.component.scss']
})
export class AppmainquanlyComponent implements OnInit {
  alllsp:lsanpham[] = [];
  spidlsp:sp[] = [];
  limitsp:sp[] = [];
  lspth:lsanpham[] = [];
  tensanpham:sp[] = [];
  thuhieu:Array<string>=[];

  constructor(private formBuilder: FormBuilder,private router: Router, private loaisanphamService: LoaisanphamService, private sanphamService: SanphamService) { }

  ngOnInit() {
    this.loadlsp();
  }

  loadlsp() {
    this.loaisanphamService.getlsp().subscribe((res: lsanpham[] | null) => {
     this.alllsp = (res) ? res : [];
    });
  }

  loadspid_lsp(id:number)
  {
    this.sanphamService.getsp_idlsp(id).subscribe((res: sp[] | null) => {
      this.spidlsp = (res) ? res : [];
     });
  }

  loaddetaillsp(id: number) {  
    this.loaisanphamService.getdetaillsp(id).subscribe((res: lsanpham[] | null) => {
    this.lspth = (res) ? res : [];
   });
   this.loadtensp(0+','+'v');
 }
 
  loadtensp(tensp: string) {  
      this.sanphamService.gettensp(tensp).subscribe((res: sp[] | null) => {
      this.tensanpham = (res) ? res : [];
      console.log("tensanpham", res);
    });
  }
  taosp(): void {
    let cv="";
    window.localStorage.removeItem("editspid");
    window.localStorage.setItem("editspid", cv.toString());
    this.router.navigate(['appmainnv/taosanpham']);
  };

  chitietsp(cv: number): void {
    window.localStorage.removeItem("editspid");
    window.localStorage.setItem("editspid", cv.toString());
    console.log(cv.toString());
    this.router.navigate(['appmainnv/taosanpham']);
  };

  taolsp(): void {
    window.localStorage.removeItem("editspid");
    this.router.navigate(['appmainnv/taoloaisanpham']);
  };

  detailsp(cv: number): void {
    window.localStorage.removeItem("editspid");
    window.localStorage.setItem("editspid", cv.toString());
    console.log(cv.toString());
    this.router.navigate(['appmainnv/taoloaisanpham']);
  };
  p: number = 1;

  gtsp(cv: number): void {
    window.localStorage.removeItem("editspid");
    window.localStorage.setItem("editspid", cv.toString());
    console.log(cv.toString());
    this.router.navigate(['appmainnv/reviewsp']);
  };

}
