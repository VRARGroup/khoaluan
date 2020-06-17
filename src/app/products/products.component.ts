import { Component, OnInit, Inject,ViewChild,ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from "@angular/router";
import { SanphamService } from '../service/sanpham.service';
import { sp } from '../model/sanpham';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
	allhotsp:sp[] =[];
	imagePath: any;
	
  	constructor(private router: Router, private sanphamService: SanphamService, private _sanitizer: DomSanitizer) {
  	 	
   	}

  	ngOnInit() {
		this.loadhotsp();
	}
	  
	loadhotsp() {
		this.sanphamService.gethotsp().subscribe((res: sp[] | null) => {
		 this.allhotsp = (res) ? res : [];
		
	});
	}
	
	
	
}
