import { Component, OnInit, Input } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { lesson } from "../model/modalthemuse";
import { dsq } from '../model/danhsachquyen';
import { tk } from '../model/taikhoan';
import { DanhsachquyenService } from '../service/danhsachquyen.service';
import { Location} from '@angular/common';
import { Router } from "@angular/router";
import { TaikhoanService} from '../service/taikhoan.service';
import { Inject } from '@angular/core'; 
import { DOCUMENT } from '@angular/common';
import { GroupService } from '../service/group.service';
import { grp } from '../model/group'; 


@Component({
  selector: 'app-modalthemuse',
  templateUrl: './modalthemuse.component.html',
  styleUrls: ['./modalthemuse.component.scss']
})
export class ModalthemuseComponent implements OnInit {
  @Input() lesson: lesson;
  p:number=1;
  alltk:tk[];
  selecteddb:string=null;
  hideselectddb:boolean=true;
  hidetext:boolean=false;
  a: Array<any>=[];
  stud: Array<any>=[];
  

  valueChangedb(event){
  	this.selecteddb;
  }
  constructor(public activeModal: NgbActiveModal, @Inject(DOCUMENT) private document: Document,private location: Location, private router: Router, private taikhoanService: TaikhoanService, private danhsachquyenService: DanhsachquyenService, private groupService: GroupService) { }
  t:string=null;
  ngOnInit() {
    console.log(this.lesson);
    this.loadtkgroup();
  }

  loadtkgroup()
  {
    this.taikhoanService.getfilltertkgroup().subscribe((res: tk[] | null) => {
    this.alltk = (res) ? res : [];
  });
  }

  addquyen(item: tk)
  {
    const t=new tk(
      item._id,
      item.username,
      item.password,
      item.hoatdong,
      item.giayphep,
      this.lesson.idg,
      );
      this.Updatetk(t);
  }

  Updatetk(t: tk){
    try
    {
      this.taikhoanService.updatetk(t).subscribe(
            () => {
                alert('Thực hiện thành công');
            }
        );
        this.a=[];

    }
    catch
    {
      alert("Error");
      this.router.navigate(['appmainnv/appmainquanly']);
    }
  }

  ktraundefinde(a:any)
  {
    if(!isNaN(a) || a!=null)
      {
        return a;
      }
    
    return null;
  }

  

}
