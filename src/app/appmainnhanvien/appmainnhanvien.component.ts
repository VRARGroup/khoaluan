import { Component, OnInit } from '@angular/core';
import {  Location} from '@angular/common';
import { Router } from "@angular/router";
import { TaikhoanService} from '../service/taikhoan.service';
import { from } from 'rxjs';
import { tk } from '../model/taikhoan';
import { MatDialog } from '@angular/material/dialog'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDoipassComponent } from '../modal/modal-doipass/modal-doipass.component';

@Component({
  selector: 'app-appmainnhanvien',
  templateUrl: './appmainnhanvien.component.html',
  styleUrls: ['./appmainnhanvien.component.scss']
})
export class AppmainnhanvienComponent implements OnInit {

  idtk:number;
  hoatdong:string;
  constructor(private dialog: MatDialog, private modalService: NgbModal, private router: Router, private taikhoanService: TaikhoanService) { }

  ngOnInit() {
    window.localStorage.removeItem("thoihan");
    window.localStorage.setItem("thoihan", "Tài khoản đã hết phiên vui lòng đăng nhập lại");
    document.getElementById("btndx").style.display="none";
    this.idtk=parseInt(window.localStorage.getItem("idtk"));
  }
  
  dangxuat()
  {
    
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

  doipass()
  {
    const dialogRef = this.dialog.open(ModalDoipassComponent, {
      width: '45vw',
      height: 'auto',
      data: {
        idtk: this.idtk,
      
      }
    });
    dialogRef.afterClosed().subscribe((submit) => {
      if (submit) {
        console.log("gg", submit)
        this.dangxuat();
      } else {
        console.log("null")
      }
    })
  }
}
