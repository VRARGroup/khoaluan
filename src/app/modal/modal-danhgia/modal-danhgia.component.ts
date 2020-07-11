import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as $ from "jquery";
@Component({
  selector: 'app-modal-danhgia',
  templateUrl: './modal-danhgia.component.html',
  styleUrls: ['./modal-danhgia.component.scss']
})
export class ModalDanhgiaComponent implements OnInit {

  resulf_danhgia: any[];
  name: string;
  textarea_count: number = 0;
  star: number=0;
  constructor(  
    public dialogRef: MatDialogRef<ModalDanhgiaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
  ngOnInit() {
    this.name = this.data.name;
    this.resulf_danhgia = this.data.resulf_danhgia;
  }
  textarea_text_change(value:string){
    this.textarea_count = $('#textarea_danhgiasosao_modal').val().toString().length;
  }
  mouseover_star(star: any){
    if( star == 1 )
    {
      $('#star_11').css("color","#fc9639");
      $('#star_22').css("color","#000");
      $('#star_33').css("color","#000");
      $('#star_44').css("color","#000");
      $('#star_55').css("color","#000");
    }
    if( star == 2 )
    {
      $('#star_11').css("color","#fc9639");
      $('#star_22').css("color","#fc9639");
      $('#star_33').css("color","#000");
      $('#star_44').css("color","#000");
      $('#star_55').css("color","#000");
    }
    if( star == 3 )
    {
      $('#star_11').css("color","#fc9639");
      $('#star_22').css("color","#fc9639");
      $('#star_33').css("color","#fc9639");
      $('#star_44').css("color","#000");
      $('#star_55').css("color","#000");
    }
    if( star == 4 )
    {
      $('#star_11').css("color","#fc9639");
      $('#star_22').css("color","#fc9639");
      $('#star_33').css("color","#fc9639");
      $('#star_44').css("color","#fc9639");
      $('#star_55').css("color","#000");
    }
    if( star == 5 )
    {
      $('#star_11').css("color","#fc9639");
      $('#star_22').css("color","#fc9639");
      $('#star_33').css("color","#fc9639");
      $('#star_44').css("color","#fc9639");
      $('#star_55').css("color","#fc9639");
    }
  }
  choose_star(star: any){
    this.star = star;
  }
  mouseleave_star(){
    let star = this.star;
    if( star == 1 )
    {
      $('#star_11').css("color","#fc9639");
      $('#star_22').css("color","#000");
      $('#star_33').css("color","#000");
      $('#star_44').css("color","#000");
      $('#star_55').css("color","#000");
    }
    if( star == 2 )
    {
      $('#star_11').css("color","#fc9639");
      $('#star_22').css("color","#fc9639");
      $('#star_33').css("color","#000");
      $('#star_44').css("color","#000");
      $('#star_55').css("color","#000");
    }
    if( star == 3 )
    {
      $('#star_11').css("color","#fc9639");
      $('#star_22').css("color","#fc9639");
      $('#star_33').css("color","#fc9639");
      $('#star_44').css("color","#000");
      $('#star_55').css("color","#000");
    }
    if( star == 4 )
    {
      $('#star_11').css("color","#fc9639");
      $('#star_22').css("color","#fc9639");
      $('#star_33').css("color","#fc9639");
      $('#star_44').css("color","#fc9639");
      $('#star_55').css("color","#000");
    }
    if( star == 5 )
    {
      $('#star_11').css("color","#fc9639");
      $('#star_22').css("color","#fc9639");
      $('#star_33').css("color","#fc9639");
      $('#star_44').css("color","#fc9639");
      $('#star_55').css("color","#fc9639");
    }
  }
}
