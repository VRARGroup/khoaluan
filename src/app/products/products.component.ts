import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

sanphams: any = {
	items: [
		{
			sp:"máy lạnh sam sung",
      		price:"500$",
      		picture:"https://cdn.tgdd.vn/Products/Images/2002/217442/samsung-ar10tyhycwknsv-550x160.jpg"
		},
		{
			sp:"ipad",
      		price:"1000$",
      		picture:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/1.jpg"
		},
		{
			sp:"điện thoại di động Apple iphone 11",
      		price:"1500$",
      		picture:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/1.jpg"
		},
		{
			sp:"điện thoại di động Nokia N6",
      		price:"200$",
      		picture:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/1.jpg"
		},
		{
			sp:"mi mix 3",
      		price:"100$",
      		picture:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/1.jpg"
		},
		{
			sp:"điện thoại di động Nokia N6",
      		price:"200$",
      		picture:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/1.jpg"
		},
		{
			sp:"điện thoại di động xiaomi mi mix 3",
      		price:"100$",
      		picture:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/1.jpg"
		},
		{
			sp:"điện thoại di động Nokia N6",
      		price:"200$",
      		picture:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/1.jpg"
		},
		{
			sp:"điện thoại di động xiaomi mi mix 3",
      		price:"100$",
      		picture:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/1.jpg"
		},
		{
			sp:"điện thoại di động Nokia N6",
      		price:"200$",
      		picture:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/1.jpg"
		},
		{
			sp:"điện thoại di động xiaomi mi mix 3",
      		price:"100$",
      		picture:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/1.jpg"
		},
		{
			sp:"điện thoại di động Nokia N6",
      		price:"200$",
      		picture:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/1.jpg"
		},
		{
			sp:"điện thoại di động xiaomi mi mix 3",
      		price:"100$",
      		picture:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/1.jpg"
		},
		{
			sp:"điện thoại di động Nokia N6",
      		price:"200$",
      		picture:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/1.jpg"
		},
	]
};

  constructor() { }

  ngOnInit() {
  }

}
