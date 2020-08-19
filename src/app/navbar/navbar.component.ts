import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material'
import { Router } from '@angular/router';
import { SanphamService } from '../service/sanpham.service';
import { LoaisanphamService } from '../service/loaisanpham.service';
import { sp } from '../model/sanpham';
import { nav } from '../model/navbar';
import { HubConnection, HubConnectionState, HubConnectionBuilder } from '@aspnet/signalr'
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  allsp: sp[] = [];
  nav: nav[] = [];
  private static readonly INDEX = 'appmain/products';
  private static readonly TYPE = 'sanpham';

  sanpham_elastic: sp[];
  private query_text = '';

  private lastKeypress = 0;

  constructor(private router: Router, private sanphamService: SanphamService, private loasanphamService: LoaisanphamService) {
    Window["myComponent"] = this;
    this.query_text = '';
  }

  ngOnInit() {
    $('ul.navbar-nav li div.dropdown-menu li').hover(function () {
      $(this).find('.subcate').stop(true, true).delay(0).fadeIn(0);
    }, function () {
      $(this).find('.subcate').stop(true, true).delay(0).fadeOut(0);
    });

    this.loasanphamService.getnav().subscribe((res: nav[] | null) => {
      this.nav = (res) ? res : [];
      console.log(res[0].listthuonghieu[0])
    });

    this.sanphamService.get_allsp().subscribe((res: sp[] | null) => {
      this.allsp = (res) ? res : [];
    });
  }

  render_loai_sp(id_loai_sanpham: any): void {
    this.router.navigate(['/appmain/listproduct', id_loai_sanpham]).then(() => {
      window.location.reload();
    });
  }

  render_loai_sp_th(id_loai_sanpham: any, th: any): void {
    this.router.navigate(['/appmain/listproduct', id_loai_sanpham], { queryParams: { business: th } }).then(() => {
      window.location.reload();
    });
  }

  render_loai_sp_price(id_loai_sanpham: any, th: any): void {
    this.router.navigate(['/appmain/listproduct', id_loai_sanpham], { queryParams: { price: th } }).then(() => {
      window.location.reload();
    });
  }

  render_loai_sp_inch(id_loai_sanpham: any, th: any): void {
    this.router.navigate(['/appmain/listproduct', id_loai_sanpham], { queryParams: { inch: th } }).then(() => {
      window.location.reload();
    });
  }

  render_loai_sp_lit(id_loai_sanpham: any, th: any): void {
    this.router.navigate(['/appmain/listproduct', id_loai_sanpham], { queryParams: { lit: th } }).then(() => {
      window.location.reload();
    });
  }
  render_sp(id_sanpham: any): void {
    this.router.navigate(['/appmain/productdetails', id_sanpham]).then(() => {
      window.location.reload();
    });
  }
  async on_key() {
    if (this.allsp.length > 0) {
      // var a = []
      const search = $("#search_bar").val().trim();
      // this.allsp.map((value) => {
      //   var t = []
      //   value.ten.split(' ').map((item) => {
      //     t.push(item)
      //   })
      //   a.push({ 'key': { t }, 'value': value.ten })
      // })
      // if (search.length > 0) {
      //   let regex = new RegExp(`.{0,50}${search}.{0,50}`, 'gi');
      //   const macth_list = document.getElementById("match_list");
      //   const matches = [];
      //   var c = a.map((item) => {
      //       var isCheck = 0
      //     search.trim().match(regex)[0].split(' ').map((item1) => {
      //         item.key.t.map((item2) => {
      //           if (item2 == item1)
      //             isCheck++
      //         })
      //       })
      //       if (isCheck === search.trim().match(regex)[0].split(' ').length)
      //       return matches.push(`<div onclick="Window.myComponent.render_sp(${item.value})" class="card card-body" onmouseover="this.style.backgroundColor='#ebfffc'" onmouseout="this.style.backgroundColor=''" style="padding: 12px;">
      //     <span style=" white-space: nowrap;text-overflow: ellipsis;overflow: hidden;display: block;"> </span>
      //     <h4 style="display:block;font-size: 12px !important;">
      //       <span style="display: inline; padding-right: 16px;"> ${item.value} </span>
      //     </h4>
      //   </div>`)
      //   })
      //   const html = matches.map(match => match).join('');
      //   macth_list.innerHTML = html;
      // }
      const macth_list = document.getElementById("match_list");
      if (search.length > 0) {
        let regex = new RegExp(`.{0,50}${search}.{0,50}`, 'gi');
        if (search.trim().includes(' ')) {
          let arr_text = search.toString().trim().split(' ');
          let vl_regex = ``;
          arr_text.forEach(element => {
            vl_regex += `.{0,30}${element}.{0,30}`;
          });
          regex = new RegExp(vl_regex, 'giu');
        }
        let matches = this.allsp.filter(item => {
          return item.ten.match(regex) || item.thuonghieu.match(regex);
        }).slice(0, 10);

        console.log(search);
        console.log(search.toString().length);
        if (search.toString().length === 0) {
          matches = [];
          macth_list.innerHTML = ``;
        }
        else {
          const html = matches.map(match => `<div onclick="Window.myComponent.render_sp(${match._id})" class="card card-body" onmouseover="this.style.backgroundColor='#ebfffc'" onmouseout="this.style.backgroundColor=''" style="padding: 12px;">
          <span style=" white-space: nowrap;text-overflow: ellipsis;overflow: hidden;display: block;"> </span>
          <h4 style="display:block;font-size: 12px !important;">
            <span style="display: inline; padding-right: 16px;"> ${match.ten} </span>
          </h4>
        </div>`).join('');
          macth_list.innerHTML = html;
        }
      }
      else
        macth_list.innerHTML = ``;
    }
  }
  checkvalue(num: number) {
    if (num == 0)
      return "";
    return num;
  }
  blur_method() {
    $("#match_list").innerHTML = ``;
  }
  async on_key_enter() {
    const search = $("#search_bar").val().trim();
    if (search.length > 0) {
      const macth_list = document.getElementById("match_list");
      console.log(macth_list.clientHeight);
      let regex = new RegExp(`.{0,50}${search}.{0,50}`, 'gi');
      if (search.trim().includes(' ')) {
        let arr_text = search.toString().trim().split(' ');
        let vl_regex = ``;
        arr_text.forEach(element => {
          vl_regex += `.{0,30}${element}.{0,30}`;
        });
        regex = new RegExp(vl_regex, 'giu');
      }
      let matches = this.allsp.find(item => {
        return item.ten.match(regex) || item.thuonghieu.match(regex);
      });
      this.render_loai_sp(matches ? matches._id_loaisanpham : 0);
    }
  }

  namedm: string = null;
  thuonghieu: string[] = [];
  id_lsp: number = 0;
  hover(i: number) {
    this.numberth = 0;
    this.numberth1 = 0;
    this.thuonghieu = [];
    $(".subcate").css("display", "block")
    $("#sub_khac").css("display", "none")
    if (this.nav[i].tenlsp != null && this.nav[i].tenlsp != undefined) {
      this.namedm = this.nav[i].tenlsp;
    }
    if (this.nav[i].listthuonghieu.length > 0) {
      this.thuonghieu = this.nav[i].listthuonghieu;
    }
    this.id_lsp = this.nav[i].id_lsp;
  }

  hoverof() {
    this.numberth = 0;
    this.numberth1 = 0;
    this.numberth = 5;
    setTimeout(() => { }, 1000)
    $(".subcate").css("display", "none")
  }

  numberth: number = 0;
  numberth1: number = 0;
  numberth1phu: number = 0;
  thuonghieuphu: string[] = [];
  n: number
  arrayOne(n: number): any[] {
    this.n = n;
    var k = n % 7
    if (k == 0) {
      let h: number = parseInt((n / 7).toString()) + 1;
      this.numberth1phu = this.thuonghieu.length / h;
      this.numberth1 = 7;
      this.thuonghieuphu = this.thuonghieu.slice(0, 7);
      return Array(n / 7);
    }
    else {
      let h: number = parseInt((n / 7).toString()) + 1;
      this.n = h;
      if (this.thuonghieu.length % h == 0) {
        this.numberth1phu = this.thuonghieu.length / h;
        this.numberth1 = 7;
      }
      else {
        this.numberth1phu = parseInt((this.thuonghieu.length / h).toString()) + 1;
        this.numberth1 = 7;
      }
      this.thuonghieuphu = this.thuonghieu.slice(0, 7);
      return Array(h);
    }
  }
  dc(value: number) {
    if (value == 0 || this.n < 2) {
      return;
    }
    this.numberth = this.numberth1;
    this.numberth1 = this.numberth1 + 7;
    if (this.thuonghieu.length < this.numberth1) {
      this.numberth1 = this.numberth + (this.thuonghieu.length - (this.numberth1 - this.thuonghieu.length));
    }
    if (this.thuonghieu.length == this.numberth1) {
      this.numberth1 = this.thuonghieu.length;
    }
    this.thuonghieuphu = this.thuonghieu.slice(this.numberth, this.numberth1);
  }
}

