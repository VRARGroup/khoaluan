import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";
import { SanphamService } from '../service/sanpham.service';
import { sp } from '../model/sanpham';
import { DomSanitizer } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { fadeInItems } from '@angular/material';
import * as $ from "jquery";
import { debug } from 'console';
import { ModalThongsokythuatComponent } from '../modal/modal-thongsokythuat/modal-thongsokythuat.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.scss']
})
export class ListproductComponent implements OnInit {

  items: sp[] = [];
  itemsphu:sp[] = [];
  id_loai_sanpham: number;
  categories: any[] = [];
  prices: any[] = [];
  banner: string = "";
  hang: Array<string> = [];
  gia: Array<any> = [];
  inch: Array<any> = [];
  lit: Array<any> = [];
  show_giatdc: boolean = false;
  show_giacdt: boolean = false;
  show_bcn: boolean = false;
  tt: boolean = false;
  thuonghieu: string;
  price: string;
  inchstring: string;
  litstring: string;
  items_inch: any[] = ["Từ 32 - 43 inch","Từ 44 - 54 inch","Từ 55 - 64 inch","Từ 65 - 74 inch","Trên 75 inch"];
  items_lit: any[] = ["Dưới 150 lít","Từ 150 - 300 lít","Từ 300 - 400 lít","Từ 400 - 550 lít","Trên 550 lít"];
  constructor(private router: Router, private route: ActivatedRoute, private sanphamService: SanphamService, private _sanitizer: DomSanitizer, public dialog: MatDialog) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.thuonghieu = params.business;
        this.price = params.price;
        this.inchstring = params.inch;
        this.litstring = params.lit;
        console.log(this.thuonghieu)
        console.log(this.price)
        console.log(this.inchstring)
        console.log(this.litstring)
      }
    );
    let id_loai_sanpham = this.id_loai_sanpham = this.route.snapshot.params.id;
    if (isNaN(id_loai_sanpham))
      id_loai_sanpham = this.id_loai_sanpham = parseInt(window.localStorage.getItem("loai_sp"));
    if (isNaN(id_loai_sanpham))
      window.location.href = "appmain/products";
    if (this.id_loai_sanpham != 0) {
      this.get_list_product(id_loai_sanpham);
      this.get_list_product_category(id_loai_sanpham);
      this.get_list_product_price(id_loai_sanpham);
      document.getElementById('dropdown-menu').style.display = "";
      if (id_loai_sanpham.toString() == "20000") {
        document.getElementById('html').style.backgroundImage = "url(https://cdn.tgdd.vn/dmx2016/Content/images/2020/CategoryV3/Tivi2020/bgTizi.png)";
        this.banner = "https://cdn.tgdd.vn/dmx2016/Content/images/2020/CategoryV3/Tivi2020/bannerTizi.png";
        setTimeout(() => {
          $(".item-inch").css("display","block");
        }, 200);
      } else if (id_loai_sanpham.toString() == "30000") {
        document.getElementById('html').style.backgroundImage = "url(https://cdn.tgdd.vn/dmx2016/Content/images/2020/CategoryV3/Birthday2020/bg.png)";
        this.banner = "https://cdn.tgdd.vn/dmx2016/Content/images/2020/CategoryV3/Birthday2020/tulanh.png"; setTimeout(() => {
          $(".item-lit").css("display","block");
        }, 200);
      } else if (id_loai_sanpham.toString() == "40000") {
        document.getElementById('html').style.backgroundImage = "url(https://cdn.tgdd.vn/dmx2016/Content/images/2020/CategoryV3/Birthday2020/bg.png)";
        this.banner = "https://cdn.tgdd.vn/dmx2016/Content/images/2020/CategoryV3/Birthday2020/maygiat.png";
      } else if (id_loai_sanpham.toString() == "50000") {
        document.getElementById('html').style.backgroundImage = "url(https://cdn.tgdd.vn/dmx2016/Content/images/2020/CategoryV3/Birthday2020/bg.png)";
        this.banner = "https://cdn.tgdd.vn/dmx2016/Content/images/2020/CategoryV3/Birthday2020/maylanh.2.png";
      } else if (id_loai_sanpham.toString() == "60000") {
        document.getElementById('html').style.backgroundImage = "url(https://cdn.tgdd.vn/dmx2016/Content/images/newbanner/background-top.png)";
        this.banner = "https://cdn.tgdd.vn/2020/07/banner/QDHt7desk1200x375-1200x375.png";
      }
      document.getElementById('html').style.minHeight = "50vh";
      document.getElementById('html').style.backgroundPosition = "initial";
      document.getElementById('html').style.backgroundSize = "cover";
      document.getElementById('html').style.backgroundRepeat = "no-repeat";
      document.getElementById('html').style.backgroundColor = "#f3f3f3";
      window.scroll(0, 0);
    }
  }
  get_list_product(id: number) {
    this.sanphamService.get_list_product(id).subscribe((res: sp[] | null) => {
      this.itemsphu = (res) ? res : [];
      this.items = res.slice(0,25);
      if(this.thuonghieu!=null && this.thuonghieu!=undefined)
      {
        (document.getElementById("category_"+this.thuonghieu) as HTMLInputElement).checked = true
        this.suggest_category(this.thuonghieu);
      }
      if(this.inchstring!=null && this.inchstring!=undefined)
      {
        (document.getElementById("items_inch_"+this.inchstring) as HTMLInputElement).checked = true
        this.suggest_inch(this.inchstring);
      } 
      if(this.litstring!=null && this.litstring!=undefined)
      {
        (document.getElementById("items_lit_"+this.litstring) as HTMLInputElement).checked = true
        this.suggest_lit(this.litstring);
      }
    });
  }
  show_more_list_product() {
    console.log(this.items)
    if(this.tt==true)
    {
      $('#list_1').css("height", "100%");
      this.tt=false;
      document.getElementById('a_id').innerText = "Vui lòng click lần 2 để xem thêm "+(this.itemsphu.length-this.items.length)+ " sản phẩm chưa lọc";
      return;
    }
    let a1:Array<sp>=[];
    if(this.items.length>0)
    {
      for(let c of this.items)
      {
        if(a1.length==0)
        {
          a1=this.itemsphu.filter(x=>x._id!=c._id);
        }
        else
        {
          a1=a1.filter(x=>x._id!=c._id);
        }
      }
    }
    if(a1.length<25)
    {
      Array.prototype.push.apply(this.items ,a1);
    }
    else
    {
      Array.prototype.push.apply(this.items ,a1.slice(this.items.length, this.items.length+25));
    }
    if(this.tt==false)
    {
      document.getElementById('a_id').innerText = "Xem thêm "+(this.itemsphu.length-this.items.length)+" sản phẩm";
    }
    $('#list_1').css("height", "auto");
  }
  get_list_product_category(id: number) {
    this.sanphamService.get_list_product_category(id).subscribe((res: any[] | null) => {
      this.categories = (res) ? res : [];
    });
  }

  get_list_product_price(id: number) {
    this.sanphamService.get_list_product_price(id).subscribe((res: any[] | null) => {
      this.prices = (res) ? res : [];
    });
  }

  suggest_category(value: any){
    
    if(value!=null && value!=undefined)
    {
      let index:number=this.hang.indexOf(value,0);
      if(index==-1)
      {
        if(value!="dienmayxanh" && value!="loaddienmayxanh")
        {
          this.hang.push(value);
        }
        if(value=="dienmayxanh")
        {
          let ic:Array<sp>=[];
          for(let i=0; i<this.hang.length; i++)
          {
            var kh=this.hang[i].trim();
            Array.prototype.push.apply(ic,this.items.filter(x => x.thuonghieu==kh));
            if(i==this.hang.length-1)
            {
                this.items=ic;
            }
          }
          return;
        }
        if(value=="loaddienmayxanh")
        {
          for(let i=0; i<this.hang.length; i++)
          {
            var kh=this.hang[i].trim();
            Array.prototype.push.apply(this.items,this.itemsphu.filter(x => x.thuonghieu==kh));
          }
          return;
        }
        if(this.hang.length>1)
        {
          if(this.gia.length>0)
          {
            this.items=[];
            this.suggest_price("loaddienmayxanh");
          }
          if(this.inch.length>0)
          {
            let ig:Array<sp>=[];
            if(this.gia.length==0)
            {
              this.items=[];
              this.suggest_inch("loaddienmayxanh")
            }
            else
            {
              this.suggest_inch("dienmayxanh");
            }
          }
          if(this.lit.length>0)
          {
            let ig:Array<sp>=[];
            if(this.gia.length==0)
            {
              this.items=[];
              this.suggest_lit("loaddienmayxanh")
            }
            else
            {
              this.suggest_lit("dienmayxanh");
            }
          }
        }
        let ic:Array<sp>=[];
        var k=value.trim();
        if(this.gia.length>0 || this.inch.length>0 || this.lit.length>0)
        {
          this.suggest_category("dienmayxanh");
        }
        else
        {
          if(this.hang.length>1)
          {
            Array.prototype.push.apply(this.items,this.itemsphu.filter(x => x.thuonghieu==k));
          }
          else
          {
            this.items=this.itemsphu.filter(x => x.thuonghieu==k);
          }
        }
      }
      else
      {
        this.items=[];
        this.hang.splice(index,1);
        if(this.gia.length>0)
        {
          this.suggest_price("loaddienmayxanh");
        }
        if(this.hang.length>0)
        {
          if(this.gia.length==0)
          {
            this.suggest_category("loaddienmayxanh");
          }
          else
          {
            this.suggest_category("dienmayxanh");
          }
        }
        if(this.inch.length>0)
        {
          this.suggest_inch("dienmayxanh");
        }
        if(this.lit.length>0)
        {
          this.suggest_lit("dienmayxanh");
        }
        if((this.inch.length==0 || this.lit.length==0) && (this.gia.length==0 && this.hang.length==0))
        {
          this.items=this.itemsphu;
          this.tt=true;
        }
      }
      
    }
    if(this.items.length>0)
    {
      this.tt=true;
    }
    
  }

  suggest_price(value: any) {
    if(value!=null && value!=undefined)
    {
      let index:number=this.gia.indexOf(value,0);
      if(index==-1)
      {
        if(value!="dienmayxanh" && value!="loaddienmayxanh")
        {
          this.gia.push(value);
        }
        if(value=="dienmayxanh")
        {
          let ic:Array<sp>=[];
          for(let i=0; i<this.gia.length; i++)
          {
            var gt=this.gia[i].split(" ");
            var g1=gt[1].split("-");
            if(gt[0].toString().toUpperCase() == "DƯỚI")
            {
              Array.prototype.push.apply(ic, this.items.filter(x=>x.giaban<=parseInt(gt[1])));
            }
            if(gt[0].toString().toUpperCase() == "TRÊN")
            {
              Array.prototype.push.apply(ic, this.items.filter(x=>x.giaban>=parseInt(gt[1])));
            }
            if(gt[0].toString().toUpperCase() == "TỪ")
            {
              Array.prototype.push.apply(ic, this.items.filter(x=>x.giaban>=parseInt(g1[0]) && x.giaban<=parseInt(g1[1])));
            }
          }
          this.items=ic;
          return;
        }
        if(value=="loaddienmayxanh")
        {
          let ic:Array<sp>=[];
          for(let i=0; i<this.gia.length; i++)
          {
            var gt=this.gia[i].split(" ");
            var g1=gt[1].split("-");
            if(gt[0].toString().toUpperCase() == "DƯỚI")
            {
              Array.prototype.push.apply(ic, this.itemsphu.filter(x=>x.giaban<=parseInt(gt[1])));
            }
            if(gt[0].toString().toUpperCase() == "TRÊN")
            {
              Array.prototype.push.apply(ic, this.itemsphu.filter(x=>x.giaban>=parseInt(gt[1])));
            }
            if(gt[0].toString().toUpperCase() == "TỪ")
            {
              Array.prototype.push.apply(ic, this.itemsphu.filter(x=>x.giaban>=parseInt(g1[0]) && x.giaban<=parseInt(g1[1])));
            }
          }
          this.items=ic;
          return;
        }
        if(this.hang.length>0)
        {
          this.items=[];
          this.suggest_category("loaddienmayxanh");
        }
        if(this.inch.length>0)
        {
          if(this.hang.length==0)
          {
            this.items=[];
            this.suggest_inch("loaddienmayxanh");
          }
          else
          {
            this.suggest_inch("dienmayxanh");
          }
        }
        if(this.lit.length>0)
        {
          if(this.hang.length==0)
          {
            this.items=[];
            this.suggest_lit("loaddienmayxanh");
          }
          else
          {
            this.suggest_lit("dienmayxanh");
          }
        }
        let ic:Array<sp>=[];
        var gt=value.split(" ");
        var g12=gt[1].split("-");
        if(this.hang.length>0 || this.inch.length>0 || this.lit.length>0)
        {
          this.suggest_price("dienmayxanh");
        }
        else
        {
          if(this.gia.length>=1)
          {
            this.suggest_price("loaddienmayxanh");
          }
        }
      }
      else
      {
        this.items=[];
        this.gia.splice(index,1);
        if(this.gia.length>0)
        {
          this.suggest_price("loaddienmayxanh");
        }
        if(this.hang.length>0)
        {
          if(this.gia.length>0)
          {
            this.suggest_category("dienmayxanh");
          }
          else
          {
            this.suggest_category("loaddienmayxanh");
          }
        }
        if(this.inch.length>0)
        {
          if(this.gia.length>0 || this.hang.length>0)
          {
            this.suggest_price("dienmayxanh");
          }
          else
          {
            this.suggest_price("loaddienmayxanh");
          }
        }
        if(this.lit.length>0)
        {
          if(this.gia.length>0 || this.hang.length>0)
          {
            this.suggest_lit("dienmayxanh");
          }
          else
          {
            this.suggest_lit("loaddienmayxanh");
          }
        }
        if((this.inch.length==0 || this.lit.length==0) && (this.gia.length==0 && this.hang.length==0))
        {
          this.items=this.itemsphu;
          this.tt=false;
        }
      }
    }
    if(this.items.length>0)
    {
      this.tt=true
    }
  }

  suggest_inch(value: any){
    if(value!=null && value!=undefined)
    {
      let index:number=this.inch.indexOf(value,0);
      if(index==-1)
      {
        if(value!="dienmayxanh" && value!="loaddienmayxanh")
        {
          this.inch.push(value);
        }
        if(value=="dienmayxanh")
        {
          let ic:Array<sp>=[];
          for(let i=0; i<this.inch.length; i++)
          {
            var k=this.inch[i].trim().replace("inch","").replace("Từ","");
            var s=k.split(" - ");
            Array.prototype.push.apply(ic,this.items.filter(x => parseInt(x.thongsokythuat[0]["Tổng quan"][1]["Kích cỡ màn hình"].toUpperCase().replace("INCH","").replace(" ",""))>=parseInt(s[0]) && parseInt(x.thongsokythuat[i]["Tổng quan"][1]["Kích cỡ màn hình"].replace("inch","").replace(" ",""))<=parseInt(s[1])));
            if(i==this.inch.length-1)
            {
                this.items=ic;
            }
          }
          return;
        }
        if(value=="loaddienmayxanh")
        {
          for(let i=0; i<this.inch.length; i++)
          {
            var k=this.inch[i].trim().replace("inch","").replace("Từ","");
            var s=k.split(" - ");
            Array.prototype.push.apply(this.items,this.itemsphu.filter(x => parseInt(x.thongsokythuat[0]["Tổng quan"][1]["Kích cỡ màn hình"].toUpperCase().replace("INCH","").replace(" ",""))>=parseInt(s[0]) && parseInt(x.thongsokythuat[0]["Tổng quan"][1]["Kích cỡ màn hình"].replace("inch","").replace(" ",""))<=parseInt(s[1])));
          }
          return;
        }
        if(this.inch.length>1)
        {
          if(this.hang.length>0)
          {
            this.items=[];
            this.suggest_category("loaddienmayxanh");
          }
          if(this.gia.length>0)
          {
            let ig:Array<sp>=[];
            if(this.hang.length==0)
            {
              this.items=[];
              this.suggest_price("loaddienmayxanh")
            }
            else
            {
              this.suggest_price("dienmayxanh");
            }
            this.items=[];
            this.items=ig;
          }
        }
        let ic:Array<sp>=[];
        var k=value.trim().replace("inch","").replace("Từ","");
        var s=k.split(" - ");
        if(this.gia.length>0 || this.hang.length>0)
        {
          for(let i=0;i<this.inch.length;i++)
          {
            var k=this.inch[i].trim().replace("inch","").replace("Từ","");
            var s=k.split(" - ");
            Array.prototype.push.apply(ic,this.items.filter(x => parseInt(x.thongsokythuat[0]["Tổng quan"][1]["Kích cỡ màn hình"].toUpperCase().replace("INCH","").replace(" ",""))>=parseInt(s[0]) && parseInt(x.thongsokythuat[0]["Tổng quan"][1]["Kích cỡ màn hình"].replace("inch","").replace(" ",""))<=parseInt(s[1])));
            if(i==this.inch.length-1)
            {
              this.items=ic;
            }
          }
        }
        else
        {
          if(this.inch.length>1)
          {
            Array.prototype.push.apply(this.items,this.itemsphu.filter(x => parseInt(x.thongsokythuat[0]["Tổng quan"][1]["Kích cỡ màn hình"].toUpperCase().replace("INCH","").replace(" ",""))>=parseInt(s[0]) && parseInt(x.thongsokythuat[0]["Tổng quan"][1]["Kích cỡ màn hình"].replace("inch","").replace(" ",""))<=parseInt(s[1])));
          }
          else
          {
            this.items=this.itemsphu.filter(x => parseInt(x.thongsokythuat[0]["Tổng quan"][1]["Kích cỡ màn hình"].toUpperCase().replace("INCH","").replace(" ",""))>=parseInt(s[0]) && parseInt(x.thongsokythuat[0]["Tổng quan"][1]["Kích cỡ màn hình"].replace("inch","").replace(" ",""))<=parseInt(s[1]));
          }
        }
      }
      else
      {
        this.items=[];
        this.inch.splice(index,1);
        if(this.hang.length>0)
        {
          this.suggest_category("loaddienmayxanh");
        }
        if(this.gia.length>0)
        {
          if(this.hang.length==0)
          {
            this.suggest_price("loaddienmayxanh"); 
          }
          else
          {
            this.suggest_price("dienmayxanh"); 
          }
        }
        if(this.inch.length>0)
        {
          if(this.gia.length>0 || this.hang.length>0)
          {
            this.suggest_inch("dienmayxanh");
          }
          else
          {
            this.suggest_inch("loaddienmayxanh");
          }
        }
        if(this.inch.length==0 && this.gia.length==0 && this.hang.length==0)
        {
          this.items=this.itemsphu;
          this.tt=false;
        }
      }
    }
    if(this.items.length>0)
    {
      this.tt=true
    }
  }

  suggest_lit(value: any){
    if(value!=null && value!=undefined)
    {
      let index:number=this.lit.indexOf(value,0);
      if(index==-1)
      {
        if(value!="dienmayxanh" && value!="loaddienmayxanh")
        {
          this.lit.push(value);
        }
        if(value=="dienmayxanh")
        {
          let ic:Array<sp>=[];
          for(let i=0; i<this.lit.length; i++)
          {
            var k=this.lit[i].trim().replace("lít","")
            var s=k.split(" ");
            console.log(this.items)
            if(s[0].toString().toUpperCase()=="TỪ")
            {
              Array.prototype.push.apply(ic, this.items.filter(x=>parseInt(x.thongsokythuat[0]["Đặc điểm sản phẩm"][1]["Dung tích sử dụng"].toUpperCase().replace("LÍT",""))>=parseInt(s[1]) && parseInt(x.thongsokythuat[0]["Đặc điểm sản phẩm"][1]["Dung tích sử dụng"].toUpperCase().replace("LÍT",""))<=parseInt(s[3])));
            }
            if(s[0].toString().toUpperCase()=="TRÊN")
            {
              Array.prototype.push.apply(ic, this.items.filter(x=>parseInt(x.thongsokythuat[0]["Đặc điểm sản phẩm"][1]["Dung tích sử dụng"].toUpperCase().replace("LÍT",""))>=parseInt(s[1])));
            }
            if(s[0].toString().toUpperCase()=="DƯỚI")
            {
              Array.prototype.push.apply(ic, this.items.filter(x=>parseInt(x.thongsokythuat[0]["Đặc điểm sản phẩm"][1]["Dung tích sử dụng"].toUpperCase().replace("LÍT",""))<=parseInt(s[1])));
            }
            if(i==this.lit.length-1)
            {
              this.items=ic;
            }
          }
          return;
        }
        if(value=="loaddienmayxanh")
        {
          for(let i=0; i<this.lit.length; i++)
          {
            var k=this.lit[i].trim().replace("lít","")
            var s=k.split(" ");
            console.log(this.items)
            if(s[0].toString().toUpperCase()=="TỪ")
            {
              Array.prototype.push.apply(this.items, this.itemsphu.filter(x=>parseInt(x.thongsokythuat[0]["Đặc điểm sản phẩm"][1]["Dung tích sử dụng"].toUpperCase().replace("LÍT",""))>=parseInt(s[1]) && parseInt(x.thongsokythuat[0]["Đặc điểm sản phẩm"][1]["Dung tích sử dụng"].toUpperCase().replace("LÍT",""))<=parseInt(s[3])));
            }
            if(s[0].toString().toUpperCase()=="TRÊN")
            {
              Array.prototype.push.apply(this.items, this.itemsphu.filter(x=>parseInt(x.thongsokythuat[0]["Đặc điểm sản phẩm"][1]["Dung tích sử dụng"].toUpperCase().replace("LÍT",""))>=parseInt(s[1])));
            }
            if(s[0].toString().toUpperCase()=="DƯỚI")
            {
              Array.prototype.push.apply(this.items, this.itemsphu.filter(x=>parseInt(x.thongsokythuat[0]["Đặc điểm sản phẩm"][1]["Dung tích sử dụng"].toUpperCase().replace("LÍT",""))<=parseInt(s[1])));
            }
          }
          return;
        }
        if(this.lit.length>1)
        {
          if(this.hang.length>0)
          {
            this.items=[];
            this.suggest_category("loaddienmayxanh");
          }
          if(this.gia.length>0)
          {
            if(this.hang.length==0)
            {
              this.items=[];
              this.suggest_price("loaddienmayxanh");
            }
            else
            {
              this.suggest_price("dienmayxanh");
            }
          }
        }
        let ic:Array<sp>=[];
        var k=value.trim();
        if(this.gia.length>0 || this.hang.length>0)
        {
          
          this.suggest_lit("dienmayxanh");
        }
        else
        {
          this.suggest_lit("dienmayxanh");
        }
    }
      else
      {
        this.items=[];
        this.lit.splice(index,1);
        if(this.gia.length>0)
        {
          this.suggest_price("loaddienmayxanh");
        }
        if(this.hang.length>0)
        {
          if(this.gia.length==0)
          {
            this.suggest_category("loaddienmayxanh");
          }
          else
          {
            this.suggest_category("dienmayxanh");
          }
        }
        if(this.lit.length>0)
        {
          this.suggest_lit("loaddienmayxanh");
        }
        if(this.lit.length==0 && this.gia.length==0 && this.hang.length==0)
        {
          this.items=this.itemsphu;
          this.tt=false;
        }
      }
      
    }
    if(this.items.length>0)
    {
      this.tt=true;
    }
  }

  show_giathapdencao() {
    this.show_giacdt = false;
    this.show_giatdc = true;
    this.items = this.items.sort((a, b) => a.giaban - b.giaban);
  }

  show_banchaynhat() {
    this.show_giacdt = false;
    this.show_giatdc = false;
    this.items = this.items.sort((a, b) => b.sosao - a.sosao);
  }

  show_caothapdenthap() {
    this.show_giatdc = false;
    this.show_giacdt = true;
    this.items = this.items.sort((a, b) => b.giaban - a.giaban);
  }

  
}
