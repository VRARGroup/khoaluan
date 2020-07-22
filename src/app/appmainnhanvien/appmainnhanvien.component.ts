import { Component, OnInit } from '@angular/core';
import {  Location} from '@angular/common';
import { Router } from "@angular/router";
import { TaikhoanService} from '../service/taikhoan.service';
import { from } from 'rxjs';
import { tk } from '../model/taikhoan' 

@Component({
  selector: 'app-appmainnhanvien',
  templateUrl: './appmainnhanvien.component.html',
  styleUrls: ['./appmainnhanvien.component.scss']
})
export class AppmainnhanvienComponent implements OnInit {

  idtk:number;
  hoatdong:string;
  constructor(private router: Router, private taikhoanService: TaikhoanService) { }

  ngOnInit() {
    window.localStorage.removeItem("thoihan");
    window.localStorage.setItem("thoihan", "Tài khoản đã hết phiên vui lòng đăng nhập lại");
    document.getElementById("btndx").style.display="none";
  }
  
  dangxuat()
  {
    this.idtk=parseInt(window.localStorage.getItem("idtk"));
    try
    {
      this.taikhoanService.updatehdtk(this.idtk).subscribe(
            () => {
              this.router.navigate(['appmainnv/login']);
            }
        );
        localStorage.clear();
    }
    catch
    {
      alert("Error");
      this.router.navigate(['appmainnv/appmainquanly']);
    }
  }
}
