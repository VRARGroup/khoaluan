import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { Router } from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: 'app-repbinhluan',
  templateUrl: './repbinhluan.component.html',
  styleUrls: ['./repbinhluan.component.scss']
})
export class RepbinhluanComponent implements OnInit {
  hoatdong:boolean;
  constructor( private location: Location, private router: Router) { }

  ngOnInit() {
    
    $("#btndx").css("display","block");
    this.hoatdong=JSON.parse(window.localStorage.getItem("editid1"));
    if(this.hoatdong==false|| this.hoatdong==null)
    {
      window.localStorage.removeItem("truycaptraiphep");
      window.localStorage.setItem("truycaptraiphep", "out");
      this.router.navigate(['appmainnv/login']);
    }
    if(window.localStorage.getItem("teng").toUpperCase()!="ADMIN" && window.localStorage.getItem("teng").toUpperCase()!="NHÂN VIÊN")
    {
      this.location.back();
    }
  }


}
