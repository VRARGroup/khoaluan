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
  id_loai_sanpham: number;
  categories: any[] = [];
  prices: any[] = [];
  banner: string = "";
  constructor(private router: Router,private route: ActivatedRoute, private sanphamService: SanphamService, private _sanitizer: DomSanitizer, public dialog: MatDialog) { }

  ngOnInit() {
    let id_loai_sanpham = this.id_loai_sanpham = this.route.snapshot.params.id;
    if (isNaN(id_loai_sanpham))
      id_loai_sanpham = this.id_loai_sanpham = parseInt(window.localStorage.getItem("loai_sp"));
    if (isNaN(id_loai_sanpham))
      window.location.href = "appmain/products";
    this.get_list_product(id_loai_sanpham);
    this.get_list_product_category(id_loai_sanpham);
    this.get_list_product_price(id_loai_sanpham);
    document.getElementById('dropdown-menu').style.display = "";


    if (id_loai_sanpham.toString() == "20000") {
      document.getElementById('html').style.backgroundImage = "url(https://cdn.tgdd.vn/dmx2016/Content/images/2020/CategoryV3/Tivi2020/bgTizi.png)";
      this.banner = "https://cdn.tgdd.vn/dmx2016/Content/images/2020/CategoryV3/Tivi2020/bannerTizi.png";
    }else if (id_loai_sanpham.toString() == "30000") {
      document.getElementById('html').style.backgroundImage = "url(https://cdn.tgdd.vn/dmx2016/Content/images/2020/CategoryV3/Birthday2020/bg.png)";
      this.banner = "https://cdn.tgdd.vn/dmx2016/Content/images/2020/CategoryV3/Birthday2020/tulanh.png";
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



    document.getElementById('html').style.backgroundPosition = "initial";
    document.getElementById('html').style.backgroundSize = "cover";
    document.getElementById('html').style.backgroundRepeat = "no-repeat";
    document.getElementById('html').style.backgroundColor = "#f3f3f3";
    window.scroll(0, 0);
  }
  get_list_product(id: number) {
    this.sanphamService.get_list_product(id).subscribe((res: sp[] | null) => {
      this.items = (res) ? res : [];
    });
  }
  show_more_list_product() {
    this.sanphamService.get_more_list_product(this.id_loai_sanpham).subscribe((res: sp[] | null) => {
      Array.prototype.push.apply(this.items, res);
    });
    $('.show-more-list-product').css("display", "none");
    if(this.show_giatdc==true)
    {
      this.items=this.items.sort((a,b)=>a.giaban-b.giaban);
    }
    else{
      if(this.show_giacdt==true)
      {
        this.items=this.items.sort((a,b)=>b.giaban-a.giaban);
      }
    }
  }
  // render_sp(id_sanpham: any):void {
  // 	// window.localStorage.removeItem("sp");
  // 	// window.localStorage.setItem("sp",id_sanpham.toString());

  //   this.router.navigate(["appmain/productdetails",5]);
  //   // window.location.href="appmain/productdetails";
  // }
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

  suggest_category(categories: any[]) {
    // let list = [];
    // categories.forEach(element => {
    //   if ($('#' + element).is(":checked")) {
    //     list.push(element);
    //   }
    // });
    // if(list.length==0)
    // {
    //   this.get_list_product(this.id_loai_sanpham);
    // }
    // else{
    //   this.sanphamService.get_list_suggest_category(this.id_loai_sanpham, list).subscribe((res: sp[] | null) => {
    //     this.items = (res) ? res : [];

    // debugger
    //   });
    // }
  }
  suggest_price(categories: any[]) {

  }
  show_giatdc:boolean=false;
  show_giacdt:boolean=false;
  show_giathapdencao()
  {
    this.show_giatdc=true;
    this.items=this.items.sort((a,b)=>a.giaban-b.giaban);
  }
  show_caothapdenthap()
  {
    this.show_giacdt=true;
    this.items=this.items.sort((a,b)=>b.giaban-a.giaban);
  }
  show_banchaynhat()
  {
    this.get_list_product(this.id_loai_sanpham);
  }
}
