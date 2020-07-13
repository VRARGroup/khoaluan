import { Component, OnInit, ViewChildren,ViewChild, ElementRef, QueryList  } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { Router } from "@angular/router";
import { LoaisanphamService } from '../service/loaisanpham.service';
import { lsanpham } from '../model/loaisanpham';
import { SanphamService } from '../service/sanpham.service';
import { sp } from '../model/sanpham';
import { hinh } from '../model/sanpham';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material';
import { dsq } from '../model/danhsachquyen';
import { DanhsachquyenService } from '../service/danhsachquyen.service';
import { GroupService } from '../service/group.service';
import { quyentruycap } from '../model/group';
import {grp} from '../model/group';

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
  tensanphamphu:sp[] = [];
  thuhieu:Array<string>=[];
  quyentc:Array<quyentruycap>=[];
  hoatdong:boolean=false;
  alldsq:dsq[] = [];
  idgrp:number;
  public idtk:number;
  _id_group:number;
  tendanhmuc:string=null;

  constructor(private formBuilder: FormBuilder,private router: Router, private loaisanphamService: LoaisanphamService, private sanphamService: SanphamService, private danhsachquyenService: DanhsachquyenService, private groupService: GroupService) { }

  ngOnInit() {
    
    document.getElementById("btndx").style.display="block";

    var d=JSON.parse(window.localStorage.getItem("danhsachquyentruycap"));
    this.quyentc=d;

    this.hoatdong=JSON.parse(window.localStorage.getItem("editid1"));

    this.idgrp=parseInt(window.localStorage.getItem("idg"));
    console.log(this.idgrp);
    document.getElementById("btndx").style.display="block";
    if(this.hoatdong==false|| this.hoatdong==null)
    {
      this.router.navigate(['appmainnv/login']);
    }
    else
    {
      this.loadlsp();
      this.loaddsq();
    }
  }

  quanlytk=false;
  quanlysp=false;
  quanlylsp=false;

  loaddsq() {
    this._id_group=parseInt(window.localStorage.getItem("idg"));
    this.groupService.getdetaillgrp(this._id_group).subscribe((res: grp[] | null) => {
      for(let i=0;i<res[0].danhsachquyentruycap.length;i++)
      {
        
        this.danhsachquyenService.getdetaildanhsachquyen(res[0].danhsachquyentruycap[i]._id_quyen).subscribe((res: dsq[] | null) => {
          if(res[0].tenquyen.toUpperCase()=="QUẢN LÝ TÀI KHOẢN")
          {
            this.quanlytk=true;
          }
          if(res[0].tenquyen.toUpperCase()=="QUẢN LÝ SẢN PHẨM")
          {
            this.quanlysp=true;
          }
          if(res[0].tenquyen.toUpperCase()=="QUẢN LÝ LOẠI SẢN PHẨM")
          {
            this.quanlylsp=true;
          }
        });
      }
      });
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

  loaddetaillsp(id: number, tendanhmuc:string) {  
    this.loaisanphamService.getdetaillsp(id).subscribe((res: lsanpham[] | null) => {
    this.lspth = (res) ? res : [];
   });
   this.loadtensp(id+','+'v');
   this.tendanhmuc=tendanhmuc;
   this.p=1;
 }
 
  loadtensp(tensp: string) {  
      this.sanphamService.gettensp(tensp).subscribe((res: sp[] | null) => {
      this.tensanpham = (res) ? res : [];
      this.tensanphamphu = this.tensanpham;
      console.log("tensanpham", res);
    });
    this.p=1;
  }
  taosp(): void {
    let cv="tsp";
    window.localStorage.removeItem("editspid");
    window.localStorage.removeItem("tspid");
    window.localStorage.setItem("tspid", cv.toString());
    this.router.navigate(['appmainnv/taosanpham']);
  };

  chitietsp(cv: number): void {
    if(this.quanlysp==true)
    {
      window.localStorage.setItem("tlspid", null);
      window.localStorage.removeItem("editspid");
      window.localStorage.setItem("editspid", cv.toString());
      console.log(cv.toString());
      this.router.navigate(['appmainnv/taosanpham']);
    }

  };

  taolsp(): void {
    let cv="tlsp";
    window.localStorage.setItem("editspid", null);
    window.localStorage.removeItem("tlspid");
    window.localStorage.setItem("tlspid", cv.toString());
    window.localStorage.removeItem("editspid");
    this.router.navigate(['appmainnv/taoloaisanpham']);
  };

  detailsp(cv: number): void {
    window.localStorage.setItem("editspid", null);
    window.localStorage.removeItem("editspid");
    window.localStorage.setItem("editspid", cv.toString());
    console.log(cv.toString());
    this.router.navigate(['appmainnv/taoloaisanpham']);
  };
  detaitaosp(cv: number): void {
    window.localStorage.setItem("editspid", null);
    window.localStorage.removeItem("editspid");
    window.localStorage.setItem("themsp", null);
    window.localStorage.removeItem("themsp");
    window.localStorage.setItem("themsp", cv.toString());
    console.log(cv.toString());
    this.router.navigate(['appmainnv/taosanpham']);
  };
  p: number = 1;

  gtsp(cv: number): void {
    window.localStorage.setItem("editspid", null);
    window.localStorage.removeItem("editspid");
    window.localStorage.setItem("editspid", cv.toString());
    console.log(cv.toString());
    this.router.navigate(['appmainnv/reviewsp']);
  };

  searchText:string=null;
  inputsearch()
  {
    
    let l:Array<sp>=[];
    l=this.tensanpham;
    if(this.searchText.trim()!=null)
    {
      if(this.tendanhmuc!=null)
      {
        if(this.tendanhmuc.toUpperCase()!="TIVI")
        {
          if(this.searchText.toUpperCase().startsWith(this.tendanhmuc.toUpperCase())==true)
          {
            this.searchText=this.searchText.toUpperCase().replace(this.tendanhmuc,"").trim();
          }
          l=this.tensanphamphu.filter(x=>x.ten.toString().toUpperCase().replace(this.tendanhmuc.toUpperCase(),"").trim().startsWith(this.searchText.toString().toUpperCase()));
          console.log(l);
          this.tensanpham=l;
        }
        else
        {
          if(this.searchText.toUpperCase().startsWith(this.tendanhmuc.toUpperCase())==true)
          {
            this.searchText=this.searchText.toUpperCase().replace(this.tendanhmuc,"").trim();
          }
          else
          {
            if(this.searchText.toUpperCase().startsWith("ANDROID"+" "+this.tendanhmuc.toUpperCase())==true)
            {
              this.searchText=this.searchText.toUpperCase().replace("ANDROID"+" "+this.tendanhmuc,"").trim();
            }
            else
            {
              if(this.searchText.toUpperCase().startsWith("SMART"+" "+this.tendanhmuc.toUpperCase())==true)
              {
                this.searchText=this.searchText.toUpperCase().replace("SMART"+" "+this.tendanhmuc,"").trim();
              }
            }
          }
          l=this.tensanphamphu.filter(x=>x.ten.toString().toUpperCase().replace("ANDROID"+" "+this.tendanhmuc.toUpperCase(),"").trim().startsWith(this.searchText.toString().toUpperCase()));
          if(l.length==0)
          {
            l=this.tensanphamphu.filter(x=>x.ten.toString().toUpperCase().replace("SMART"+" "+this.tendanhmuc.toUpperCase(),"").trim().startsWith(this.searchText.toString().toUpperCase()));
          }
          this.tensanpham=l;
        }
      }
      else
      {
        alert("Bạn vui lòng chọn loại sản phẩm cần tìm kiếm !!!");
      }
    }
    else
    {
      console.log(this.tensanphamphu);
      this.tensanpham=this.tensanphamphu;
    }
  }
}
