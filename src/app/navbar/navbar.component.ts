import { Component,ElementRef, OnInit, ViewChild,HostListener  } from '@angular/core';
import {MatSidenav} from '@angular/material'
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
			tendm:"Tivi",
			tendm1:"Loa Karaoke"
		},
		{
			tendm:"Tủ lạnh",
			tendm1:"Tủ đông"
		},
		{
			tendm:"Máy giặt",
			tendm1:"Sấy quần áo"
		},
		
	]
};

	constructor() { }

	ngOnInit() {
		$('ul.navbar-nav li div.dropdown-menu li').hover(function() {
		$(this).find('.subcate').stop(true, true).delay(0).fadeIn(0);
		}, function() {
		$(this).find('.subcate').stop(true, true).delay(0).fadeOut(0);
		});
	}
  	render_loai_sp(id_loai_sanpham: any):void {
		window.localStorage.removeItem("loai_sp");
		window.localStorage.setItem("loai_sp",id_loai_sanpham.toString());

		window.location.href="appmain/listproduct";
	}
}

