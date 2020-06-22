import { Component, OnInit, Inject,ViewChild,ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from "@angular/router";
import { SanphamService } from '../service/sanpham.service';
import { sp } from '../model/sanpham';
import { DomSanitizer } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
	allhotsp:sp[] =[];
	imagePath: any;
	sanphams:sp[] =[];
  	constructor(private router: Router, private sanphamService: SanphamService, private _sanitizer: DomSanitizer) {
  	 	
   	}

  	ngOnInit() {
		this.loadhotsp();
		this.load_sp_noi_bat();
	}
	  
	loadhotsp() {
		this.sanphamService.gethotsp().subscribe((res: sp[] | null) => {
		 this.allhotsp = (res) ? res : [];
		
	});
	}
	loadkmhotsp(id: number) {
		this.sanphamService.getkmhotsp_idlsp(id).subscribe((res: sp[] | null) => {
			this.sanphams = (res) ? res : [];
	});
	}
	
	load_sp_noi_bat() {
		this.sanphamService.get_sp_noi_bat().subscribe((res: sp[] | null) => {
			this.sanphams = (res) ? res : [];
	});
	}
}
