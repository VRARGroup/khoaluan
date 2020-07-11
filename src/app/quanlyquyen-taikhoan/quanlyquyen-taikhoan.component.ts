import { Component, OnInit } from '@angular/core';
import { dsq } from '../model/danhsachquyen';
import { tk } from '../model/taikhoan';
import { DanhsachquyenService } from '../service/danhsachquyen.service';
import { Location} from '@angular/common';
import { Router } from "@angular/router";
import { TaikhoanService} from '../service/taikhoan.service';
import { Console } from 'console';
import { Inject } from '@angular/core'; 
import { DOCUMENT } from '@angular/common';
import { GroupService } from '../service/group.service';
import { grp } from '../model/group'; 
import { quyentruycap } from '../model/group'; 
import * as $ from "jquery";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalthemuseComponent } from '../modalthemuse/modalthemuse.component';
import { lesson } from '../model/modalthemuse';

@Component({
  selector: 'app-quanlyquyen-taikhoan',
  templateUrl: './quanlyquyen-taikhoan.component.html',
  styleUrls: ['./quanlyquyen-taikhoan.component.scss']
})
export class QuanlyquyenTaikhoanComponent implements OnInit {

  alldsq:dsq[];
  quyen:Array<dsq>=[];
  detaildsq:dsq[];
  alltk:tk[];
  allgroup:grp[];
  idtk_quyen:Array<any>=[];
  alltk_quyen:Array<tk>=[];
  p: number = 1;
  c:boolean = false;
  ktd:number=0;
  hoatdong:boolean=false;
  _id_group:number=0;
  lessons:lesson;
  constructor(@Inject(DOCUMENT) private document: Document, private modalService: NgbModal, private location: Location, private router: Router, private taikhoanService: TaikhoanService, private danhsachquyenService: DanhsachquyenService, private groupService: GroupService ) { }

  ngOnInit() {
    this._id_group=parseInt(window.localStorage.getItem("idg"));
    this.hoatdong=JSON.parse(window.localStorage.getItem("editid1"));
    console.log(this.hoatdong);
    document.getElementById("btndx").style.display="block";
    
    if(this.hoatdong==false|| this.hoatdong==null)
    {
      this.router.navigate(['appmainnv/login']);
    }
    else
    {
      this.loaddetaildsq();
    }
    if(window.localStorage.getItem("teng").toUpperCase()=="ADMIN" || window.localStorage.getItem("teng").toUpperCase()=="QUẢN LÝ")
    {
      this.loadtaikhoan();
      this.loadgroup();
    }
    else
    {
      window.localStorage.removeItem("truycaptraiphep");
      window.localStorage.setItem("truycaptraiphep", "out");
      this.location.back();
    }
  }

  quanlytk=false;
  quanlysp=false;
  quanlylsp=false;
  
  loaddetaildsq() {
    this.groupService.getdetaillgrp(this._id_group).subscribe((res: grp[] | null) => {
    for(let i=0;i<res[0].danhsachquyentruycap.length;i++)
    {
      
      this.danhsachquyenService.getdetaildanhsachquyen(res[0].danhsachquyentruycap[i]._id_quyen).subscribe((res: dsq[] | null) => {
        if(res[0].tenquyen.toUpperCase()=="QUẢN LÝ TÀI KHOẢN")
        {
          this.quanlytk=true;
        }
      });
    }
    });
  }

  getid_quyen(a: quyentruycap[], a1: number)
  {
      window.localStorage.removeItem("idgroup");
      window.localStorage.setItem("idgroup",null);
      window.localStorage.setItem("idgroup",a1.toString());
      this.quyen=[];
      for(let i=0;i<a.length;i++)
      {
        this.danhsachquyenService.getdetaildanhsachquyen(a[i]._id_quyen).subscribe((res: dsq[] | null) => {
        this.quyen.push(res[0]);
        console.log(this.quyen);
        console.log(a[i])
      });
      this.detaitk_quyen(a1);
      }
  }
  loaddsq() {
    this.danhsachquyenService.getdanhsachquyen().subscribe((res: dsq[] | null) => {
    this.alldsq = (res) ? res : [];
    });
  }

  loadgroup()
  {
    this.groupService.getgrp().subscribe((res: grp[] | null) => {
    this.allgroup = (res) ? res : [];
    });
  }

   loadtaikhoan()
   {
    this.taikhoanService.gettk().subscribe((res: tk[] | null) => {
    this.alltk = (res) ? res : [];
    });
   }

   detaitk_quyen(id:number)
   {
     
     console.log(this.alltk.length);
     this.alltk_quyen=[];
     let kt=null;
     this.c=true;
     for(let i=0;i<this.alltk.length;i++)
     {
        if(this.alltk[i]._id_group==id)
        {
          this.alltk_quyen.push(this.alltk[i]);
        }
     }
     this.ktd=id;
   }

   detaitk(cv: number): void {
    if(this.quanlytk==true)
    {
      window.localStorage.removeItem("idtkq");
      window.localStorage.setItem("idtkq", cv.toString());
      this.router.navigate(['appmainnv/taotk']);
    }
  }
  detaiaddgroupquyen(cv: number): void{
    window.localStorage.removeItem("idagq");
    window.localStorage.setItem("idagq", cv.toString());
    this.router.navigate(['appmainnv/addgroupquyen']);
  }
  
  detaiquyen(cv: number): void{
    window.localStorage.removeItem("idq");
    window.localStorage.setItem("idq", cv.toString());
    this.router.navigate(['appmainnv/taoquyen']);
  }

  huycapphep(id: number)
  {
    const tkh=new tk(
       id,
       null,
       null,
       false,
       false,
       0
     );
     this.alltk_quyen=[];
     this.Updatetk(tkh);
     this.document.location.reload();
  }

  capphep(id: number)
  {
    const tkh1=new tk(
       id,
       null,
       null,
       false,
       true,
       0
     );
     this.alltk_quyen=[];
     this.Updatetk(tkh1);
     this.document.location.reload();
  }

  themuser(id:number)
  {
    window.localStorage.removeItem("idtkq");
    window.localStorage.setItem("idtkq", null);
    window.localStorage.removeItem("themuser");
    window.localStorage.setItem("themuser", "newuser");
    this.router.navigate(['appmainnv/taotk']);
  }

  themusergroup(id:number)
  {
    const modalRef = this.modalService.open(ModalthemuseComponent);
    const t=new lesson(
      id
    );
    modalRef.componentInstance.lesson = t;
  }

  Updatetk(t: tk){
    try
    {
      this.taikhoanService.updateqtk(t).subscribe(
            () => {
                alert('Thực hiện thành công');
            }
        );
    }
    catch
    {
      alert("Error");
      this.router.navigate(['appmainnv/appmainquanly']);
    }
  }

 }