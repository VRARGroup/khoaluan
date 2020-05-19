import { Component, OnInit, ViewChild,HostListener  } from '@angular/core';
import {MatSidenav} from '@angular/material'

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
  
  }


}

