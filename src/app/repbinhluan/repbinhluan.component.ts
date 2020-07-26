import { Component, OnInit, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";
import * as $ from "jquery";
import { dg, dgphu } from '../model/danhgia';
import { bangghepdg_sp, bangghepdgphu_sp } from '../model/bangghepdg_sp';
import { HttpClient } from '@angular/common/http';
import { SanphamService } from '../service/sanpham.service';
import { DanhgiaService } from '../service/danhgia.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { Observable, from } from 'rxjs';
import { LoaisanphamService } from '../service/loaisanpham.service';
import { SignalRService } from '../service/signal-r.service'
import { sp } from '../model/sanpham';
import { hinh } from '../model/sanpham';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material';
import { dsq } from '../model/danhsachquyen';
import { bl,blphu } from '../model/binhluan';
import { DanhsachquyenService } from '../service/danhsachquyen.service';
import { BinhluanService } from '../service/binhluan.service';
import { GroupService } from '../service/group.service';
import { TaikhoanService } from '../service/taikhoan.service';
import { quyentruycap } from '../model/group';
import { grp } from '../model/group';
import { lsanpham } from '../model/loaisanpham';
import { FormBuilder } from '@angular/forms';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';
import { tk } from '../model/taikhoan';


@Component({
  selector: 'app-repbinhluan',
  templateUrl: './repbinhluan.component.html',
  styleUrls: ['./repbinhluan.component.scss'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class RepbinhluanComponent implements OnInit {
  hoatdong: boolean;
  alllsp: lsanpham[] = [];
  spidlsp: sp[] = [];
  limitsp: sp[] = [];
  lspth: lsanpham[] = [];
  tensanpham: sp[] = [];
  tensanphamphu: sp[] = [];
  thuhieu: Array<string> = [];
  quyentc: Array<quyentruycap> = [];
  alldsq: dsq[] = [];
  idgrp: number;
  public idtk: number;
  _id_group: number;
  tendanhmuc: string = null;
  items_danhgia: dg[] = [];
  active_null_dg: boolean = false;
  active_null_bl: boolean = false;
  items_binhluan: bl[] = [];
  alllsp_danhgia: number[] = [];
  alllsp_danhgia_1day: bangghepdg_sp[] = [];
  pdg:number=1;
  pbl:number=1;
  tennvdn:string=null;
  public date: Date = new Date();
  public date1: Date = new Date();
  blreal_time: bl;
  blreal_timearr: bl[]=[];
  dgreal_time: dg;
  dgreal_timearr: dg[]=[];
  thongbaolsp: Array<any>=[];
  constructor(private location: Location, private formBuilder: FormBuilder, private router: Router, private loaisanphamService: LoaisanphamService, private sanphamService: SanphamService, private danhgiaService: DanhgiaService, private binhluanService: BinhluanService, private danhsachquyenService: DanhsachquyenService, private groupService: GroupService, private taikhoanService: TaikhoanService, private signalRService: SignalRService) { 
  }

  ngOnInit() {
    $("#btndx").css("display", "block");
    $("#datedanhgia").css('display','none');
    $("#datebinhluan").css('display','none');
    this.hoatdong = JSON.parse(window.localStorage.getItem("editid1"));
    if (this.hoatdong == false || this.hoatdong == null) {
      window.localStorage.removeItem("truycaptraiphep");
      window.localStorage.setItem("truycaptraiphep", "out");
      this.router.navigate(['appmainnv/login']);
    }
    if (window.localStorage.getItem("teng").toUpperCase() != "ADMIN" && window.localStorage.getItem("teng").toUpperCase() != "NHÂN VIÊN") {
      this.location.back();
    }
    document.getElementById("btndx").style.display = "block";
    document.getElementById("btndmk").style.display = "block";
    var d = JSON.parse(window.localStorage.getItem("danhsachquyentruycap"));
    this.quyentc = d;
    this.hoatdong = JSON.parse(window.localStorage.getItem("editid1"));
    this.idgrp = parseInt(window.localStorage.getItem("idg"));
    console.log(this.idgrp);
    if (this.hoatdong == false || this.hoatdong == null) {
      this.router.navigate(['appmainnv/login']);
    }
    else {
      this.loadlsp();
      this.loaddsq();
      this.load_danhgia_1day();
      this.gettennv(parseInt(window.localStorage.getItem("idtk")));
    }
      if(this.checkinsertblp==false)
      {
        this.signalRService.signalReceived.subscribe((signal: bl) => {
          console.log(signal);
          if(signal!=null && signal!=undefined)
          {
            this.blreal_time=signal;
            this.blreal_timearr.push(signal);
            if(!isNaN(this.idsp))
            {
              if(signal.binhluanphu[0]!=null && signal.binhluanphu[0]!=undefined)
              {
                this.show_bl(signal._id).push(signal.binhluanphu[0]);
              }
              else
              {
                this.items_binhluan.push(signal);
              }
            }
            this.checkinsertblp=true;
          }
        });
      }

      this.signalRService.signaldgReceived.subscribe((signal: dg) => {
        if(signal!=null && signal!=undefined)
        {
          console.log(signal);
          this.dgreal_time=signal;
          this.dgreal_timearr.push(signal);
          if(!isNaN(this.idsp))
          {
            if(signal.danhgiaphu[0]!=null && signal.danhgiaphu[0]!=undefined)
            {
              this.show(signal._id).push(signal.danhgiaphu[0]);
            }
            else
            {
              this.items_danhgia.push(signal);
            }
          }
          this.checkinsertblp=true;
        }
      });
  }

  quanlytk = false;
  quanlysp = false;
  quanlylsp = false;

  loaddsq() {
    this._id_group = parseInt(window.localStorage.getItem("idg"));
    this.groupService.getdetaillgrp(this._id_group).subscribe((res: grp[] | null) => {
      for (let i = 0; i < res[0].danhsachquyentruycap.length; i++) {

        this.danhsachquyenService.getdetaildanhsachquyen(res[0].danhsachquyentruycap[i]._id_quyen).subscribe((res: dsq[] | null) => {
          if (res[0].tenquyen.toUpperCase() == "QUẢN LÝ TÀI KHOẢN") {
            this.quanlytk = true;
          }
          if (res[0].tenquyen.toUpperCase() == "QUẢN LÝ SẢN PHẨM") {
            this.quanlysp = true;
          }
          if (res[0].tenquyen.toUpperCase() == "QUẢN LÝ LOẠI SẢN PHẨM") {
            this.quanlylsp = true;
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

  loadspid_lsp(id: number) {
    this.sanphamService.getsp_idlsp(id).subscribe((res: sp[] | null) => {
      this.spidlsp = (res) ? res : [];
    });
  }

  loaddetaillsp(id: number, tendanhmuc: string) {
    this.loaisanphamService.getdetaillsp(id).subscribe((res: lsanpham[] | null) => {
      this.lspth = (res) ? res : [];
    });
    this.loadtensp(id + ',' + 'v');
    this.tendanhmuc = tendanhmuc;
    this.p = 1;
    $(".btn-group .button").css("background-color", "#fff");
    $(".btn-group .button").css("color", "#000");
    $("#btn_lsp_" + id + " .button").css("background-color", "#ec314d");
    $("#btn_lsp_" + id + " .button").css("color", "#fff");
  }

  load_danhgia_1day() {
    this.danhgiaService.get_danhgia_1day().subscribe((res: any[] | null) => {
      for(let i=0; i<res.length;i++)
      {
        if(res[i]["_int_tb"]>0 )
        {
          let v:Array<any>=[];
          v.push(res[i]);
          Array.prototype.push.apply(this.alllsp_danhgia_1day,v);
          console.log (this.alllsp_danhgia_1day);
        }  
        
      }
    });
  }

  loadtensp(tensp: string) {
    this.sanphamService.gettensp(tensp).subscribe((res: sp[] | null) => {
      this.tensanpham = (res) ? res : [];
      this.tensanphamphu = this.tensanpham;
      console.log("tensanpham", res);
    });
    this.p = 1;
    this.active_null_dg = false;
    this.active_null_bl = false;
    $(".btn-group-vertical .buttonth").css("background-color", "#fff");
    $(".btn-group-vertical .buttonth").css("color", "#000");
    $("#btn_sp_thuonghieu_" + tensp.replace(' ','').replace(',','').replace('(','').replace(')','') + " .buttonth").css("background-color", "#ec314d");
    $("#btn_sp_thuonghieu_" + tensp.replace(' ','').replace(',','').replace('(','').replace(')','') + " .buttonth").css("color", "#fff");
  }

  idsp:number;
  loaddanhgia(cv: number): void {
    this.idsp=cv;
    this.danhgiaService.get_danhgia_1day_idsp(cv).subscribe((res: dg[] | null) => {
    this.items_danhgia = (res) ? res : [];
    });
    this.binhluanService.get_binhluan_1day_idspp(cv).subscribe((res: bl[] | null) => {
      this.items_binhluan = (res) ? res : [];
    });
    this.active_null_dg = this.active_null_bl = true;
    $("tbody tr").css('color', '#000');
    $("#tr_" + cv).css('color', 'red');
    $("#datedanhgia").css('display','');
    $("#datebinhluan").css('display','');
  };

  p: number = 1;

  gtsp(cv: number): void {
    window.localStorage.setItem("editspid", null);
    window.localStorage.removeItem("editspid");
    window.localStorage.setItem("editspid", cv.toString());
    console.log(cv.toString());
    this.router.navigate(['appmainnv/reviewsp']);
  };

  searchText: string = null;

  inputsearch()
  {
    this.p=1;
    let l:Array<sp>=[];
    l=this.tensanpham;
    let textkt:string=this.searchText;
    if(this.searchText!=null && this.searchText!="")
    {
      if(this.tendanhmuc!=null)
      {
        l=this.tensanphamphu.filter(x=>x.ten.toString().toUpperCase().match(textkt.toString().toUpperCase()));
        this.tensanpham=l;
      }
    }
    else
    {
      console.log(this.tensanphamphu);
      this.tensanpham=this.tensanphamphu;
    }
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }
  arrayTwo(n: number): any[] {
    return Array(5 - n);
  }
  show(id: number) {
    let items_danhgiaphu: dgphu[] = this.items_danhgia.find(x => x._id == id).danhgiaphu;
    return items_danhgiaphu;
  }
  show_bl(id: number) {
    let items_binhluanphu: blphu[] = this.items_binhluan.find(x => x._id == id).binhluanphu;
    return items_binhluanphu;
  }
  iddgp:number
  show_box_danhgiaphu(id: number) {
    this.iddgp=id;
    $('#reply_box_danhgiaphu' + id ).css("display","block");
    $('#reply_box_danhgiaphu' + id ).css("display","inline-flex");
  }
  idtextbl:number;
  show_box_binhluanphu(id: number) {
    this.idtextbl=id;
    $('#reply_box_binhluanphu' + id).css("display","block");
    $('#reply_box_binhluanphu' + id).css("display","inline-flex");
  }

  username:string=null;
  gettennv(cv: number): void {
    this.taikhoanService.gettennv(cv).subscribe((res: tk[] | null) => {
    this.tennvdn=res[0].tennv;
    this.username=res[0].username;
    });
  }
  
  checkinsertblp:boolean=false;
  insertblp() {
    if($("#text_binhluanphu"+this.idtextbl).val().toString()!=null && $("#text_binhluanphu"+this.idtextbl).val().toString()!="")
    {
      const bp = new blphu(
        $('#text_binhluanphu'+this.idtextbl).val().toString().trim(), 0, 
        this.tennvdn, true, true , "dienmayxanh"+this.username+"@gmail.com")
        let blp:Array<any>=[];
        blp.push(bp);

      const b = new bl(
        this.idtextbl,
        null,
        true,
        null,
        null,
        null,
        null,
        blp,
        parseInt(this.idsp.toString())
      );
      this.binhluanService.insert_binhluan_phu(b).subscribe(
        (data) => {         
          if(data!=null && data!=undefined)
          {
            this.checkinsertblp=true;
            alert('Thực hiện thành công');

          }
          else
          {
            alert('Thực hiện thất bại');
          }
        }
        
      );
      $('#reply_box_binhluanphu' + this.idtextbl).css("display","none");
      $('#text_binhluanphu' + this.idtextbl).val("");
      this.show_bl(this.idtextbl).push(bp);
      
    }
    else
    {
      alert("Vui lòng nhập nội dung bình luận !!!")
    }
  }

  insertdphu() {
    var s=$('#text_danhgiaphu'+ this.iddgp ).val();
    if($('#text_danhgiaphu' + this.iddgp).val()!=null || $('#text_danhgiaphu' + this.iddgp).val().toString().trim()!="")
    {
      var s=$('#text_danhgiaphu'+ this.iddgp ).val();
        const dp = new dgphu($('#text_danhgiaphu' + this.iddgp ).val().toString().trim(), 0, this.tennvdn, true, true,  "dienmayxanh"+this.username+"@gmail.com")
        let dgp:Array<any>=[];
        dgp.push(dp);

        const d = new dg(
          this.iddgp,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          dgp,
          null,
          parseInt(this.idsp.toString())
        );
        this.danhgiaService.insert_binhluan_danhgia(d).subscribe(
          () => {
            alert('Thực hiện thành công');
          }
        );
        this.show(this.iddgp).push(dp);
        $('#reply_box_danhgiaphu' + this.iddgp).css("display","none");
        $('#text_reply_box_danhgiaphu' + this.iddgp).val("");
  }
  else
  {
    alert("Vui lòng nhâp đủ thông tin đánh giá !!!");
  }
}

  modelChangeddanhgia(value){
    this.danhgiaService.get_danhgia_choseday_idsp(this.idsp,document.getElementById("dateinput")["value"]).subscribe((res: dg[] | null) => {
      this.items_danhgia = (res) ? res : [];
      });
  }
  modelChangedbinhluan(value){
      this.binhluanService.get_binhluan_choseday_idsp(this.idsp,document.getElementById("dateinputbl")["value"]).subscribe((res: bl[] | null) => {
      this.items_binhluan = (res) ? res : [];
      });
  }
    
}
