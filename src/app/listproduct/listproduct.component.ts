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
  show_giatdc: boolean = false;
  show_giacdt: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, private sanphamService: SanphamService, private _sanitizer: DomSanitizer, public dialog: MatDialog) { }

  ngOnInit() {
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
      } else if (id_loai_sanpham.toString() == "30000") {
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
    });
  }
  show_more_list_product() {
    if (this.show_giatdc == true) {
      if (this.items.length >= this.itemsphu.length) {
        this.items = this.items.sort((a, b) => a.giaban - b.giaban);
      }
      else {
        this.items = this.itemsphu;
        this.items = this.itemsphu.sort((a, b) => a.giaban - b.giaban);
      }
    }
    else {
      if (this.show_giacdt == true) {
        if (this.items.length >= this.itemsphu.length) {
          this.items = this.items.sort((a, b) => b.giaban - a.giaban);
        }
        else {
          this.items = this.itemsphu;
          this.items = this.items.sort((a, b) => b.giaban - a.giaban);
        }
      }
      else {
        if(this.items.length<this.itemsphu.length)
        {
          var arritemsphu=this.itemsphu
          Array.prototype.push.apply(this.items ,arritemsphu.slice(this.items.length, this.items.length+25));
          if(this.items.length==this.itemsphu.length)
          {
            $('.show-more-list-product').css("display", "none");
          }
        }
        else
        {
          $('.show-more-list-product').css("display", "none");
        }
      }
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
    if(value!=null)
    {
      $('.show-more-list-product').css("display", "none");
      const index = this.hang.indexOf(value, 0);
      if (index == -1)
      {
        if (this.hang.length == 0 && this.gia.length == 0) {
          this.items = [];
        }
        const index = this.hang.indexOf(value, 0);
        if (index == -1) {
          
          this.hang.push(value);
          if (this.gia.length > 0) {
            // for (let j of this.hang) {
            //   var s=this.itemsphu.filter(x => x.thuonghieu == j);
              const j = this.hang.indexOf(value, 0);
              Array.prototype.push.apply(this.items, this.itemsphu.filter(x => x.thuonghieu == this.hang[j]));
            //}
            let arritems: Array<any> = [];
            // arritems = this.items;
            for (let i of this.gia) {
              //this.items = arritems;
              const j = this.gia.indexOf(i, 0);
              var g = this.gia[j].toString().split(' ');
              var g1 = g[1].toString().split('-');
              if (g1.length > 1) {
                Array.prototype.push.apply(arritems,this.items.filter(x => x.giaban > parseInt(g1[0]) && x.giaban < parseInt(g1[1])));
              }
              else {
                if (g[0].toString().toUpperCase() == "DƯỚI") {
                  Array.prototype.push.apply(arritems,this.items.filter(x => x.giaban < parseInt(g1[0])));
                }
                else {
                  if (g[0].toString().toUpperCase() == "TRÊN") {
                    Array.prototype.push.apply(arritems,this.items.filter(x => x.giaban > parseInt(g1[0])));
                  }
                  else {
                    Array.prototype.push.apply(arritems,this.items.filter(x => x.giaban == parseInt(g1[0])));
                  }
                }
              }
            }
            this.items=arritems;
          }
          else {
            Array.prototype.push.apply(this.items, this.itemsphu.filter(x => x.thuonghieu == value));
          }
        }
      }
      else {
        this.hang.splice(index, 1);
        //this.items = [];
        if(this.hang.length>0)
        {
          for (let i of this.hang) {
            this.items=this.items.filter(x => x.thuonghieu == i);
          }
        }
        else
        {
        
        let arr: Array<any>=[];
        if (this.gia.length > 0) {
          for (let j of this.gia) {
            const k = this.gia.indexOf(j, 0);
            var g = this.gia[k].toString().split(' ');
            var g1 = g[1].toString().split('-');
            if (g1.length > 1) {
              Array.prototype.push.apply(arr,this.itemsphu.filter(x => x.giaban > parseInt(g1[0]) && x.giaban < parseInt(g1[1])));
            }
            else {
              if (g[0].toString().toUpperCase() == "DƯỚI") {
                Array.prototype.push.apply(arr,this.itemsphu.filter(x => x.giaban < parseInt(g1[0])));
              }
              else {
                if (g[0].toString().toUpperCase() == "TRÊN") {
                  Array.prototype.push.apply(arr,this.itemsphu.filter(x => x.giaban > parseInt(g1[0])));
                }
                else {
                  Array.prototype.push.apply(arr,this.itemsphu.filter(x => x.giaban == parseInt(g1[0])));
                }
              }
            }
          }
          this.items=arr;
        }
        }
      }
      if (this.hang.length == 0 && this.gia.length == 0) {
        this.items = this.itemsphu;
        this.items = this.items.slice(0, 20);
        $('.show-more-list-product').css("display", "block");
      }
    }
  }

  suggest_price(value: any) {
    if (this.gia.length == 0 && this.hang.length == 0) {
      this.items = [];
    }
    const index = this.gia.indexOf(value, 0);
    if (index == -1) {
      this.gia.push(value);
      const i = this.gia.indexOf(value, 0);
      var g = this.gia[i].toString().split(' ');
      var g1 = g[1].toString().split('-');
      if (this.hang.length == 0) {
        if (g1.length > 1) {
          Array.prototype.push.apply(this.items, this.itemsphu.filter(x => x.giaban > parseInt(g1[0]) && x.giaban < parseInt(g1[1])));
        }
        else {
          if (g[0].toString().toUpperCase() == "DƯỚI") {
            Array.prototype.push.apply(this.items, this.itemsphu.filter(x => x.giaban < parseInt(g1[0])));
          }
          else {
            if (g[0].toString().toUpperCase() == "TRÊN") {
              Array.prototype.push.apply(this.items, this.itemsphu.filter(x => x.giaban > parseInt(g1[0])));
            }
            else {
              Array.prototype.push.apply(this.items, this.itemsphu.filter(x => x.giaban == parseInt(g1[0])));
            }
          }
        }
      }
      else {
        //this.items = [];
        // for (let i of this.hang) {
        //   var s= this.itemsphu.filter(x => x.thuonghieu == i);
        // }
        if(this.gia.length==1)
        {
          let arriitems:Array<any>=[];
          const i = this.gia.indexOf(value, 0);
          var g = this.gia[i].toString().split(' ');
          var g1 = g[1].toString().split('-');
          if (g1.length > 1) {
            Array.prototype.push.apply(arriitems,this.items.filter(x => x.giaban > parseInt(g1[0]) && x.giaban < parseInt(g1[1])));
          }
          else {
            if (g[0].toString().toUpperCase() == "DƯỚI") {
              Array.prototype.push.apply(arriitems,this.items.filter(x => x.giaban < parseInt(g1[0])));
            }
            else {
              if (g[0].toString().toUpperCase() == "TRÊN") {
                Array.prototype.push.apply(arriitems,this.items.filter(x => x.giaban > parseInt(g1[0])));
              }
              else {
                Array.prototype.push.apply(arriitems,this.items.filter(x => x.giaban == parseInt(g1[0])));
              }
            }
          }
          this.items=arriitems;
        }
        else
        {
          for (let i of this.hang) {
            var s= this.itemsphu.filter(x => x.thuonghieu == i);
          }
          let arriitems:Array<any>=[];
          for(let j of this.gia)
          {
            const i = this.gia.indexOf(j, 0);
            var g = this.gia[i].toString().split(' ');
            var g1 = g[1].toString().split('-');
            if (g1.length > 1) {
              Array.prototype.push.apply(arriitems,s.filter(x => x.giaban > parseInt(g1[0]) && x.giaban < parseInt(g1[1])));
            }
            else {
              if (g[0].toString().toUpperCase() == "DƯỚI") {
                Array.prototype.push.apply(arriitems,s.filter(x => x.giaban < parseInt(g1[0])));
              }
              else {
                if (g[0].toString().toUpperCase() == "TRÊN") {
                  Array.prototype.push.apply(arriitems,s.filter(x => x.giaban > parseInt(g1[0])));
                }
                else {
                  Array.prototype.push.apply(arriitems,s.filter(x => x.giaban == parseInt(g1[0])));
                }
              }
            }
          }
          this.items=arriitems;
        }
      }
    }
    else {
      this.gia.splice(index, 1);
      if (this.hang.length == 0) {
        this.items = [];
        for (let i of this.gia) {
          const k = this.gia.indexOf(i, 0);
          var g = this.gia[k].toString().split(' ');
          var g1 = g[1].toString().split('-');
          if(g1.length > 1)
          {
            Array.prototype.push.apply(this.items, this.itemsphu.filter(x => x.giaban > parseInt(g1[0]) && x.giaban < parseInt(g1[1])));
          }
          else
          {
            if (g[0].toString().toUpperCase() == "DƯỚI") {
              this.items = this.itemsphu.filter(x => x.giaban < parseInt(g1[0]));
            }
            else {
              if (g[0].toString().toUpperCase() == "TRÊN") {
                this.items = this.itemsphu.filter(x => x.giaban > parseInt(g1[0]));
              }
              else {
                this.items = this.itemsphu.filter(x => x.giaban < parseInt(g1[0]));
              }
            }
          }
          console.log(this.items);
        }
      }
      else {
        this.items = [];
        for (let i of this.hang) {
          Array.prototype.push.apply(this.items, this.itemsphu.filter(x => x.thuonghieu == i));
        }
        let arr = this.items;
        for (let j of this.gia) {
          this.items = arr;
          const k = this.gia.indexOf(j, 0);
          var g = this.gia[k].toString().split(' ');
          var g1 = g[1].toString().split('-');
          if (g1.length > 1) {
            this.items = this.items.filter(x => x.giaban > parseInt(g1[0]) && x.giaban < parseInt(g1[1]));
          }
          else {
            if (g[0].toString().toUpperCase() == "DƯỚI") {
              this.items = this.items.filter(x => x.giaban < parseInt(g1[0]));
            }
            else {
              if (g[0].toString().toUpperCase() == "TRÊN") {
                this.items = this.items.filter(x => x.giaban > parseInt(g1[0]));
              }
              else {
                this.items = this.items.filter(x => x.giaban == parseInt(g1[0]));
              }
            }
          }
        }
      }
    }
    if (this.hang.length == 0 && this.gia.length == 0) {
      this.items = this.itemsphu;
      this.items = this.items.slice(0, 20);
      $('.show-more-list-product').css("display", "block");
    }
  }

  show_giathapdencao() {
    this.show_giacdt = false;
    this.show_giatdc = true;
    this.items = this.items.sort((a, b) => a.giaban - b.giaban);
  }

  show_caothapdenthap() {
    this.show_giatdc = false;
    this.show_giacdt = true;
    this.items = this.items.sort((a, b) => b.giaban - a.giaban);
  }

  show_banchaynhat() {
    this.get_list_product(this.id_loai_sanpham);
  }
}
