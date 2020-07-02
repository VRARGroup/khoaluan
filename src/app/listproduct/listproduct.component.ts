import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
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

  items:sp[] = [];
  constructor(private router: Router, private sanphamService: SanphamService, private _sanitizer: DomSanitizer,public dialog: MatDialog) { }

  ngOnInit() {
    let id_loai_sanpham = parseInt(window.localStorage.getItem("loai_sp"));
    if(id_loai_sanpham==null)
      window.location.href="appmain/products";
    this.get_list_product(id_loai_sanpham);
    
    document.getElementById('dropdown-menu').style.display = "";
    document.getElementById('html').style.backgroundImage = "url(https://cdn.tgdd.vn/dmx2016/Content/images/2020/CategoryV3/Tivi2020/bgTizi.png)";
    document.getElementById('html').style.backgroundPosition = "initial"; 
    document.getElementById('html').style.backgroundSize = "cover";
    document.getElementById('html').style.backgroundRepeat = "no-repeat";
    window.scroll(0,0);
  }
  get_list_product(id: number){
    this.sanphamService.get_list_product(id).subscribe((res: sp[] | null) => {
      this.items = (res) ? res : [];
    });
  }
  get_list_product2(id: number){
    // this.sanphamService.get_list_product2(id).subscribe((res: sp[] | null) => {
    //   let skip_20= (res) ? res : [];
    //   skip_20.forEach(element => {
    //     this.items.push(element);
    //   });
    // });
  }
  render_sp(id_sanpham: any):void {
		window.localStorage.removeItem("sp");
		window.localStorage.setItem("sp",id_sanpham.toString());

    // this.router.navigate(["appmain/productdetails"]);
    window.location.href="appmain/productdetails";
  }
}
