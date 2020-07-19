import { Component, OnInit } from '@angular/core';
import {  Location} from '@angular/common';
import { Router } from "@angular/router";
import { TaikhoanService} from '../service/taikhoan.service';
import { from } from 'rxjs';
import { tk } from '../model/taikhoan';
import { GroupService } from '../service/group.service';
import { grp } from '../model/group'; 
import * as $ from "jquery";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  th:string=null;
  idg:number;
  idtk:number;
  constructor(private location: Location, private router: Router, private taikhoanService: TaikhoanService, private groupService: GroupService) { }

  ngOnInit() {
    document.getElementById("btndx").style.display="none";
    var s=(window.localStorage.getItem("truycaptraiphep"));
    this.th=window.localStorage.getItem("thoihan");
    if(this.th!=null && s=="out")
    {
      alert(this.th);
      window.localStorage.removeItem("truycaptraiphep");
      window.localStorage.removeItem("thoihan");
    }
    if(this.th!=null)
    {
      var f=parseInt(window.localStorage.getItem("idtk"));
      const tkh=new tk(
        f,
        null,
        null,
        false,
        true,
        0
      );
      this.Updatetk(tkh);
      window.localStorage.removeItem("thoihan");
    }
    
    window.localStorage.removeItem("idtk");
    }

  Updatetk(t: tk){
    try
    {
      this.taikhoanService.updateqtk(t).subscribe(
            () => {
            }
        );
    }
    catch
    {
      alert("Error");
      this.router.navigate(['appmainnv/login']);
    }
  }


  Getdetailtk(u:string, p:string){
    try
    {
      this.taikhoanService.getcttk(u,p).subscribe((res: tk[] | null) => {
      (res) ? res : [];
      if(res==null)
      {
        alert("Sai tài khoản hoặc mật khẩu !!!");
        $('#u').val($('#u').val().toString().replace($('#u').val().toString(),""));
        $('#p').val($('#p').val().toString().replace($('#p').val().toString(),""));
        return false;
      }
      if(res[0].giayphep==false)
      {
        alert("Bạn chưa được cấp phép hoạt động");
        window.localStorage.removeItem("editid1");
      }
      else
      {
        window.localStorage.removeItem("editid1");
        window.localStorage.setItem("editid1", JSON.stringify(res[0].hoatdong.toString()));
        window.localStorage.removeItem("idtk");
        window.localStorage.setItem("idtk", (res[0]._id.toString()));
        window.localStorage.removeItem("idg");
        window.localStorage.setItem("idg", (res[0]._id_group.toString()));
       
        this.idg=res[0]._id_group;
        if(!isNaN(this.idg))
        {
          this.groupService.getdetaillgrp(res[0]._id_group).subscribe((res: grp[] | null) => {
          (res) ? res : [];
            if(res[0].tengroup.toUpperCase()=="NHÂN VIÊN")
            {
              this.router.navigate(['appmainnv/repbinhluan']);
            }
            else
            {
              if(res[0].tengroup.toUpperCase()=="QUẢN LÝ")
              {
                this.router.navigate(['appmainnv/quyentk']);
              }
              else
              {
                if(res[0].tengroup.toUpperCase()=="ADMIN")
                {
                  this.router.navigate(['appmainnv/appmainquanly']);
                }
              }
            }
            window.localStorage.removeItem("danhsachquyentruycap");
            window.localStorage.setItem("danhsachquyentruycap", JSON.stringify(res[0].danhsachquyentruycap).toString());
            window.localStorage.removeItem("teng");
            window.localStorage.setItem("teng", (res[0].tengroup.toString()));
          });
        }
       
      }
      });
    }
    catch
    {
      alert("Error");
      this.router.navigate(['appmainnv/login']);
    }
  }

  dangnhap()
  {
    this.Getdetailtk(document.getElementById("u")["value"],document.getElementById("p")["value"]);
    
  }
  results: any;
  error: any;
  isLoading: boolean;
  s:string;
  getResult() {
    this.error = null;
    this.results = '';
    this.isLoading = true;
    var s=$('#p').val().toString().length;
    console.log(s);
    if($('#u').val().toString().length>0 && $('#p').val().toString().length>0)
    {
      this.dangnhap();
    }
    else
    {
      if($('#u').val().toString().length==0 && $('#p').val().toString().length==0)
      {
        alert("Vui lòng nhập username và password !!!");
        $("#u").css("border","1px solid red");
        $("#p").css("border","1px solid red");
      }
      else
      {
        if($('#u').val().toString().length==0)
        {
          alert("Vui lòng nhập username !!!");
          $("#u").focus();
        }
        else
        {
          if($('#p').val().toString().length==0)
          {
            alert("Vui lòng nhập password !!!");
            $("#p").focus();
          }
        }
      }
    }
  }
  
  input_text(value)
  {
    if($('#u').val().toString().length>0)
    {
      $("#u").css("border","0px solid red");
    }
    if($('#p').val().toString().length>0)
    {
      $("#p").css("border","0px solid red");
    }
  }

}
