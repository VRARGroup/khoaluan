import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { TaikhoanService } from '../../service/taikhoan.service';
import { tk } from '../../model/taikhoan';

import { GroupService } from '../../service/group.service';
import { grp } from '../../model/group';

@Component({
  selector: 'app-modal-doipass',
  templateUrl: './modal-doipass.component.html',
  styleUrls: ['./modal-doipass.component.scss']
})
export class ModalDoipassComponent implements OnInit {

  idtk: number;
  alltk:tk[]=[];
  constructor(private groupService: GroupService ,private taikhoanService: TaikhoanService, private router: Router, public dialogRef: MatDialogRef<ModalDoipassComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.idtk=this.data.idtk;
    console.log(this.idtk);
  
    $('#pass').focus();
    this.loadtaikhoan();
  }

  closemodal() {
    this.dialogRef.close();
  }

  textarea_text_change(event):boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 32 ) {
      return false;
    }
    return true;
  }

  onSubmit()
  {
    if($("#pass").val().toString().length<100)
    {
      const d = new tk(
        this.idtk,
        null,
        $("#pass").val().toString(),
        null,
        null,
        false,
        true,
        null
      );
      this.Updatetk(d);
      $("#pass").val("");
      this.dialogRef.close(d);
    }
  }

  Updatetk(t: tk) {
    try {
      this.taikhoanService.updatepass(t).subscribe(
        (data) => {
          if(data!=null && data!=undefined)
          {
            alert('Thực hiện thành công');
          }
        }
      );
    }
    catch
    {
      this.router.navigate(['appmainnv/appmainquanly']);
    }
  }

  loadtaikhoan() {
    this.taikhoanService.getcttk_id(this.idtk).subscribe((res: tk[] | null) => {
      this.alltk = (res) ? res : [];
      $('#username').val(res[0].username);
      $('#pass').val(res[0].password);
      $('#tennv').val(res[0].tennv);
      this.loadgroup(res[0]._id_group);
    });
  }

  loadgroup(id:number) {
    this.groupService.getdetaillgrp(id).subscribe((res: grp[] | null) => {
      $('#nq').val(res[0].tengroup);
    });
  }

}
