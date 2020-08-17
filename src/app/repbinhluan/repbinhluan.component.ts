import { Component, OnInit, NgZone, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";
import * as $ from "jquery";
import { dg, dgphu } from '../model/danhgia';
import { bangghepdg_sp } from '../model/bangghepdg_sp';
import { HttpClient } from '@angular/common/http';
import { SanphamService } from '../service/sanpham.service';
import { DanhgiaService } from '../service/danhgia.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { Observable, from, interval } from 'rxjs';
import { LoaisanphamService } from '../service/loaisanpham.service';
import { SignalRService } from '../service/signal-r.service'
import { sp } from '../model/sanpham';
import { hinh } from '../model/sanpham';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material';
import { dsq } from '../model/danhsachquyen';
import { email } from '../model/email';
import { bl,blphu } from '../model/binhluan';
import { DanhsachquyenService } from '../service/danhsachquyen.service';
import { EmailService } from '../service/email.service';
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
import { ThrowStmt } from '@angular/compiler';
import { AngularMaterialModuleModule } from '../angularmaterialmodule/angular-material-module.module';


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
  alllsp_binhluan_1day: bangghepdg_sp[] = [];
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
  int_tb:number;
  checkinsertblp:boolean=false;
  checkinsertdgp:boolean=false;
  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 10;
  constructor(private location: Location, private formBuilder: FormBuilder, private router: Router, private loaisanphamService: LoaisanphamService, private sanphamService: SanphamService, private danhgiaService: DanhgiaService, private binhluanService: BinhluanService, private danhsachquyenService: DanhsachquyenService, private groupService: GroupService, private taikhoanService: TaikhoanService, private signalRService: SignalRService, private emailService: EmailService) { 
  }

  @HostListener('window:scroll', [])
  onWindowScroll() 
    {
      if (( window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrollHeight) 
      {
          this.showScroll = true;
      } 
      else if ( this.showScroll && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < this.hideScrollHeight) 
      { 
        this.showScroll = false; 
      }
    }

    scrollToTop() 
    { 
      (function smoothscroll() 
      { var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; 
        if (currentScroll > 0) 
        {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - (currentScroll / 5));
        }
      })();
      //$(".comment-3-textarea")[0].scrollIntoView();
    }

  ngOnInit() {
    $(".filter_dg").css("display","none");
    $(".filter_bl").css("display","none");
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
      this.load_binhluan_1day();
      this.gettennv(parseInt(window.localStorage.getItem("idtk")));
    }
    
    this.signalRService.signalReceived.subscribe((signal: bl) => {
      console.log(signal);
      if(this.checkinsertblp==true)
      {
        this.checkinsertblp=false;
        this.load_binhluan_1day();
        return;
      }
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
        //this.checkinsertblp=true;
        this.load_binhluan_1day();
      }
    });
    
    this.signalRService.signaldgReceived.subscribe((signal: dg) => {
      if(signal!=null && signal!=undefined)
      {
        console.log(signal);
        if(this.checkinsertdgp==true)
        {
          this.checkinsertdgp=false;
          this.load_danhgia_1day();
          return;
        }
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
        //this.checkinsertblp=true;
        this.load_danhgia_1day();
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

  plusbinhluan(value: string)
  {
    return this.alllsp_binhluan_1day_p.filter(x=>x._tenth==value).length;
  }

  plusdanhgia(value: string)
  {
    return this.alllsp_danhgia_1day_p.filter(x=>x._tenth==value).length;
  }

  check_bell_id_sp(value: number)
  {
    // if(this.alllsp_danhgia_1day.find(x=>x._id_sanpham==value)!=null && this.alllsp_danhgia_1day.find(x=>x._id_sanpham==value)!=undefined)
    // {
    //   return true;
    // }
    if(this.alllsp_binhluan_1day.find(x=>x._id_sanpham==value)!=null && this.alllsp_binhluan_1day.find(x=>x._id_sanpham==value)!=undefined)
    {
      return true;
    }
    return false;
  }

  alllsp_danhgia_1day_p: bangghepdg_sp[] = [];
  load_danhgia_1day() {
    this.danhgiaService.get_danhgia_1day().subscribe((res: bangghepdg_sp[] | null) => {
      this.alllsp_danhgia_1day_p=res.filter(x=>x._int_tb>0);
      if(this.alllsp_danhgia_1day_p==undefined || this.alllsp_danhgia_1day_p==null || this.alllsp_danhgia_1day_p.length==0)
      {
        this.alllsp_danhgia_1day=[];
      }
      for(let v of this.alllsp_danhgia_1day_p)
      {
        if(this.alllsp_danhgia_1day.find(x=>x._tensp==v._tensp)==undefined)
        {
          this.alllsp_danhgia_1day.push(v);
        }
      }
      console.log(this.alllsp_danhgia_1day);
    });
  }

  alllsp_binhluan_1day_p: bangghepdg_sp[] = [];
  load_binhluan_1day() {
    this.binhluanService.get_binhluan_1day().subscribe((res: bangghepdg_sp[] | null) => {
      this.alllsp_binhluan_1day_p=res.filter(x=>x._int_tb>0);
     
      if(this.alllsp_binhluan_1day_p==undefined || this.alllsp_binhluan_1day_p==null || this.alllsp_binhluan_1day_p.length==0)
      {
        this.alllsp_binhluan_1day=[];
      }
      for(let v of this.alllsp_binhluan_1day_p)
      {
        if(this.alllsp_binhluan_1day.find(x=>x._tensp==v._tensp)==undefined)
        {
          this.alllsp_binhluan_1day.push(v);
        }
      }
      console.log(res)
    });
  }

  load_binhluan_1day_idsp(value: string) {
    this.binhluanService.get_binhluan_choseday_idsp_day(this.idsp,value).subscribe((res: bangghepdg_sp[] | null) => {
      var alllsp_binhluan_1day_p=res.filter(x=>x._int_tb>0);
      if(alllsp_binhluan_1day_p==undefined || alllsp_binhluan_1day_p==null || alllsp_binhluan_1day_p.length==0)
      {
        this.alllsp_binhluan_1day=[];
      }
      for(let v of alllsp_binhluan_1day_p)
      {
        if(this.alllsp_binhluan_1day.find(x=>x._tensp==v._tensp)==undefined)
        {
          this.alllsp_binhluan_1day.push(v);
        }
      }
      console.log("bl",res)
    });
  }

  load_danhgia_1day_idsp(value: string) {
    this.danhgiaService.get_danhgia_choseday_idsp_day(this.idsp,value).subscribe((res: bangghepdg_sp[] | null) => {
      this.alllsp_danhgia_1day_p=res.filter(x=>x._int_tb>0);
      if(this.alllsp_danhgia_1day_p==undefined || this.alllsp_danhgia_1day_p==null || this.alllsp_danhgia_1day_p.length==0)
      {
        this.alllsp_binhluan_1day=[];
      }
      for(let v of this.alllsp_danhgia_1day_p)
      {
        if(this.alllsp_danhgia_1day.find(x=>x._tensp==v._tensp)==undefined)
        {
          this.alllsp_danhgia_1day.push(v);
        }
      }
      console.log(res)
    });
  }

  checkclick:boolean=false;
  loadtensp(tensp: string) {
    this.sanphamService.gettensp(tensp).subscribe((res: sp[] | null) => {
      this.tensanpham = (res.sort((a, b) => b._id - a._id)) ? res : [];
      if(res.length<this.tensanphamphu.length)
      {
        this.checkclick=true;
      }
      if(this.checkclick==true)
      {
        $(".filter_dg").css("display","block");
        $(".filter_bl").css("display","block");
      }
      this.tensanphamphu = this.tensanpham;
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
  cv_idbl_parent: number;
  loaddanhgia(cv: number, cv_idbl: number): void {
    if(cv_idbl!=-1)
    {
      this.cv_idbl_parent=cv_idbl;
    }
    if(cv_idbl!=-2)
    {
      this.cv_idbl_parent=cv_idbl;
    }
    this.idsp=cv;
    if(this.items_binhluan.length==0)
    {
      this.danhgiaService.get_danhgia_1day_idsp(cv).subscribe((res: dg[] | null) => {
        this.items_danhgia = res.sort((a, b) => b._id - a._id);
        if(this.alllsp_danhgia_1day.length>0 && cv_idbl==-2)
        {
          this.cv_idbl_parent=this.alllsp_danhgia_1day.find(x=>x._id_sanpham==cv)._id;
        }
      });
    }
    if(this.items_binhluan.length==0)
    {
      this.binhluanService.get_binhluan_1day_idspp(cv).subscribe((res: bl[] | null) => {
        this.items_binhluan = res.sort((a, b) => b._id - a._id);
        if(this.alllsp_binhluan_1day.length>0 && cv_idbl==-1)
        {
          this.cv_idbl_parent=this.alllsp_binhluan_1day.find(x=>x._id_sanpham==cv)._id;
        }
      });
    }
    this.active_null_dg = this.active_null_bl = true;
    $("tbody tr").css('color', '#000');
    $("#tr_" + cv).css('color', 'red');
    $("#datedanhgia").css('display','');
    $("#datebinhluan").css('display','');
    if(cv_idbl!=-1)
    {
      setTimeout(()=>{$("#in_gt").click(),200});
    }
    if(cv_idbl!=-2)
    {
      setTimeout(()=>{$("#in_dg").click(),200});
    }
  }

  f1(){
    let ck:boolean=false;
    if(this.items_binhluan.length==0)
    {
      return;
    }
    var v=this.items_binhluan.find(x=>x._id==this.cv_idbl_parent);
    var c=this.items_binhluan.indexOf(v);
    this.pbl=parseInt((c/10+1).toFixed(0));
    console.log(this.pbl);
    if(c>-1)
    {
      console.log(c);
      setTimeout(()=>{ $("#bl_"+ this.cv_idbl_parent)[0].scrollIntoView(),200});    
      ck=true;
      return;
    }
    else
    {
      ck=false;
    }
    if(ck==false)
    {
      this.pbl=1;
      $(".binhluan-list")[0].scrollIntoView()
      return;
    } 
  }

  f2(){
    let ck:boolean=false;
    if(this.items_danhgia.length==0)
    {
      return;
    }
    var v=this.items_danhgia.find(x=>x._id==this.cv_idbl_parent);
    var c=this.items_danhgia.indexOf(v);
    this.pdg=parseInt((c/10+1).toFixed(0));
    console.log(this.pbl);
    if(c>-1)
    {
      console.log(c);
      setTimeout(()=>{ $("#dg_"+ this.cv_idbl_parent)[0].scrollIntoView(),200});    
      ck=true;
      return;
    }
    else
    {
      ck=false;
    }
    if(ck==false)
    {
      this.pbl=1;
      $(".danhgia-list")[0].scrollIntoView()
      return;
    } 
  }
  
  focusdgpr:boolean=false;
  focusblpr:boolean=false;
  focusdg()
  {
    this.focusdgpr=true;
  }

  focusbl()
  {
    this.focusblpr=true;
  }
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
  
  insertblp() {
    this.checkinsertblp=true;
    if($("#text_binhluanphu"+this.idtextbl).val().toString()!=null && $("#text_binhluanphu"+this.idtextbl).val().toString()!="")
    {
      const bp = new blphu(
        $('#text_binhluanphu'+this.idtextbl).val().toString().trim(), 0, 
        this.tennvdn, true, true , "dienmayxanh"+this.username+"@gmail.com", true)
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
        parseInt(this.idsp.toString()),
        true
      );
      this.binhluanService.insert_binhluan_phu(b).subscribe(
        (data) => {         
          if(data!=null && data!=undefined)
          {
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
    this.load_binhluan_1day();
  }

  
  insertdphu() {
    this.checkinsertdgp=true;
    var s=$('#text_danhgiaphu'+ this.iddgp ).val();
    if($('#text_danhgiaphu' + this.iddgp).val()!=null || $('#text_danhgiaphu' + this.iddgp).val().toString().trim()!="")
    {
      var s=$('#text_danhgiaphu'+ this.iddgp ).val();
        const dp = new dgphu($('#text_danhgiaphu' + this.iddgp ).val().toString().trim(), 0, this.tennvdn, true, true,  "dienmayxanh"+this.username+"@gmail.com", true)
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
          parseInt(this.idsp.toString()),
          true
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
  this.load_danhgia_1day();
}

  modelChangeddanhgia(value){
    this.danhgiaService.get_danhgia_choseday_idsp(this.idsp,document.getElementById("dateinput")["value"]).subscribe((res: dg[] | null) => {
      this.items_danhgia = (res) ? res : [];
      });
      this.load_danhgia_1day_idsp(document.getElementById("dateinput")["value"]);
  }
  modelChangedbinhluan(value){
      this.binhluanService.get_binhluan_choseday_idsp(this.idsp,document.getElementById("dateinputbl")["value"]).subscribe((res: bl[] | null) => {
      this.items_binhluan = (res) ? res : [];
      });
      this.load_binhluan_1day_idsp(document.getElementById("dateinputbl")["value"]);
  }

  Remove_binhluan(value: number)
  {
    this.checkinsertblp=true;
    this.checkinsertdgp=true;
    this.binhluanService.deletebl(value).subscribe(
      (data) => {
        if(data!=null && data!=undefined)
        {
          let v:bl;
          v=this.items_binhluan.find(x=>x._id==value);
          var c=this.items_binhluan.indexOf(v);
          this.items_binhluan.splice(c,1);
          alert("Xóa thành công !!!");
        }
        else
        {
          alert("Xóa thất bại !!!");
        }
      }
    );
    this.load_binhluan_1day_idsp(document.getElementById("dateinputbl")["value"]);
  }

  Remove_danhgia(value: number)
  {
    this.checkinsertblp=true;
    this.checkinsertdgp=true;
    this.danhgiaService.deletedg(value).subscribe(
      (data) => {
        if(data!=null && data!=undefined)
        {
          let v:dg;
          v=this.items_danhgia.find(x=>x._id==value);
          var c=this.items_danhgia.indexOf(v);
          this.items_danhgia.splice(c,1);
          alert("Xóa thành công !!!");
        }
        else
        {
          alert("Xóa thất bại !!!");
        }
      }
    );
    this.load_danhgia_1day_idsp(document.getElementById("dateinput")["value"]);
  }

  Remove_danhgiaphu(valuedg: number, valuedgp: number)
  {
    this.checkinsertdgp=true;
    this.checkinsertblp=true;
    this.danhgiaService.deletedgp(valuedg, valuedgp).subscribe(
      (data) => {
        if(data!=null && data!=undefined)
        {
          $("#dgp_"+valuedg+"_"+valuedgp).remove();
          alert("Xóa thành công !!!");
        }
        else
        {
          alert("Xóa thất bại !!!");
        }
      }
    );
    this.load_danhgia_1day_idsp(document.getElementById("dateinput")["value"]);
  }

  Remove_binhluanphu(valuebl: number, valueblp: number)
  {
    this.checkinsertblp=true;
    this.checkinsertdgp=true;
    this.binhluanService.deleteblp(valuebl, valueblp).subscribe(
      (data) => {
        if(data!=null && data!=undefined)
        {
          $("#blp_"+valuebl+"_"+valueblp).remove();
          alert("Xóa thành công !!!");
        }
        else
        {
          alert("Xóa thất bại !!!");
        }
      }
    );
    this.load_binhluan_1day_idsp(document.getElementById("dateinputbl")["value"]);
  }

  duyetdanhgia(d:dg, i:number)
  {
    this.checkinsertblp=true;
    this.checkinsertdgp=true;
    this.danhgiaService.duyetdanhgia(d).subscribe(
      (data) => {
        if(data!=undefined && data!=null)
        {
          $("#duyetdanhgia_"+i).css("display","none");
          $("#btn_duyetdanhgia_"+i).css("display","none");
          alert('Thực hiện thành công');
        }
        else
        {
          alert('Xảy ra lỗi');
        }
        
      }
    );
   
  }

  duyetdanhgiaphu(g:dg, d:number, i:number)
  {
    this.checkinsertblp=true;
    this.checkinsertdgp=true;
    this.danhgiaService.duyetdanhgiaphu(d, g).subscribe(
      (data) => {
        if(data!=undefined && data!=null)
        {
          $("#duyetdanhgiaphu_"+i+"_"+d).css("display","none");
          $("#btn_duyetdanhgiaphu_"+i+"_"+d).css("display","none");
          alert('Thực hiện thành công');
        }
        else
        {
          alert('Xảy ra lỗi');
        }
        
      }
    );
   
  }

  duyetbinhluan(b:bl, i:number)
  {
    this.checkinsertblp=true;
    this.checkinsertdgp=true;
    this.binhluanService.duyetbinhluan(b).subscribe(
      (data) => {
        if(data!=undefined && data!=null)
        {
          $("#duyetbinhluan_"+i).css("display","none");
          $("#btn_duyetbinhluan_"+i).css("display","none");
          alert('Thực hiện thành công');
        }
        else
        {
          alert('Xảy ra lỗi');
        }
        
      }
    );
   
  }

  duyetbinhluanphu(b:bl, i:number, o:number)
  {
    this.checkinsertblp=true;
    this.checkinsertdgp=true;
    this.binhluanService.duyetbinhluanphu(o, b).subscribe(
      (data) => {
        if(data!=undefined && data!=null)
        {
          $("#duyetbinhluanphu_"+i+"_"+o).css("display","none");
          $("#btn_duyetbinhluanphu_"+i+"_"+o).css("display","none");
          alert('Thực hiện thành công');
        }
        else
        {
          alert('Xảy ra lỗi');
        }
        
      }
    );
   
  }
    
}
