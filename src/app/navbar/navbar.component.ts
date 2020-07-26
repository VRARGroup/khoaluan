import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material'
import { Router } from '@angular/router';
import { SanphamService } from '../service/sanpham.service';
import { sp } from '../model/sanpham';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  Danhmuc: any = {
    items: [
      {
        tendm: "Tivi",
        tendm1: "Loa Karaoke"
      },
      {
        tendm: "Tủ lạnh",
        tendm1: "Tủ đông"
      },
      {
        tendm: "Máy giặt",
        tendm1: "Sấy quần áo"
      },

    ]
  };
  allsp: sp[] = [];
  constructor(private router: Router, private sanphamService: SanphamService) {
    Window["myComponent"] = this;
  }

  ngOnInit() {
    $('ul.navbar-nav li div.dropdown-menu li').hover(function () {
      $(this).find('.subcate').stop(true, true).delay(0).fadeIn(0);
    }, function () {
      $(this).find('.subcate').stop(true, true).delay(0).fadeOut(0);
    });

    this.sanphamService.get_allsp().subscribe((res: sp[] | null) => {
      this.allsp = (res) ? res : [];
    });
  }
  render_loai_sp(id_loai_sanpham: any): void {
    this.router.navigate(['/appmain/listproduct', id_loai_sanpham]).then(() => {
      window.location.reload();
    });
    // window.localStorage.removeItem("sp");
    // window.localStorage.setItem("sp", id_sanpham.toString());

    // // this.router.navigate(["appmain/productdetails"]);
    // window.location.href = "appmain/productdetails";
  }
  render_sp(id_sanpham: any): void {
    this.router.navigate(['/appmain/productdetails', id_sanpham]).then(() => {
      window.location.reload();
    });
  }
  on_key() {
    if (this.allsp.length > 0) {
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
        let matches = this.allsp.filter(item => {
          return item.ten.match(regex) || item.thuonghieu.match(regex);
        }).slice(0, 10);
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
  on_key_enter() {
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
}

