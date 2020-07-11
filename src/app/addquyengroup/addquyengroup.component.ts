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
import { grp, quyentruycap } from '../model/group'; 

@Component({
  selector: 'app-addquyengroup',
  templateUrl: './addquyengroup.component.html',
  styleUrls: ['./addquyengroup.component.scss']
})
export class AddquyengroupComponent implements OnInit {

  addquyen:Array<any>=[];
  allgroup:grp[];
  selected:Array<any> =[];
  alldsq:dsq[];
  idg:number;
  constructor(@Inject(DOCUMENT) private document: Document,private location: Location, private router: Router, private taikhoanService: TaikhoanService, private danhsachquyenService: DanhsachquyenService, private groupService: GroupService ) { }

  ngOnInit() {
    this.idg=parseInt(window.localStorage.getItem("idagq"));
    this.loadgroup();
    this.loaddsq();
  }

  loaddsq() {
    this.danhsachquyenService.getdanhsachquyen().subscribe((res: dsq[] | null) => {
    this.alldsq = (res) ? res : [];
    
    });
  }

  valueChange(event){
    this.selected
    console.log(this.selected)
  }

  loadgroup() {
    this.groupService.getdetaillgrp(this.idg).subscribe((res: grp[] | null) => {
    this.allgroup = (res) ? res : [];
    for(let i=0;i<res[0].danhsachquyentruycap.length;i++)
    {
      this.selected.push(res[0].danhsachquyentruycap[i]._id_quyen);
      this.Add();
    }
    });
  }

  Add()
  {
    this.addquyen.push("");
  }

  ktraundefinde(a:string)
  {
    if(!isNaN(this.idg))
    {
      if(a!=null)
      {
        return a.toString().toUpperCase();
      }
    }
    
    return null;
  }

  Removeaddtext(id:number)
  {
    this.selected.splice(id,1);
    this.addquyen.splice(id,1);
  }

  onSubmit()
  {
    let j:Array<any>=[];
    for(let i=0;i<this.selected.length;i++)
    {
      const k=new quyentruycap(
        this.selected[i]
      );
      j.push(k);
    }
    const y=new grp(
      this.idg,
      this.ktraundefinde(this.allgroup[0].tengroup),
      j
    );
    this.updategroup(y);
    this.selected=[];
    this.router.navigate(['appmainnv/quyentk']);
    
  }

  updategroup(t:grp)
  {
    try
    {
      this.groupService.updategroup(t).subscribe(
            () => {
                alert('Thực hiện thành công');
            }
        );
    }
    catch
    {
      alert("Error");
      this.router.navigate(['appmainnv/quyentk']);
    }
  }


}
