import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-thongsokythuat',
  templateUrl: './modal-thongsokythuat.component.html',
  styleUrls: ['./modal-thongsokythuat.component.scss']
})
export class ModalThongsokythuatComponent implements OnInit {
  thongsokythuat: Array<object>;
  name: string;
  constructor(public dialogRef: MatDialogRef<ModalThongsokythuatComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.thongsokythuat = this.data.thongsokythuat;
    this.name = this.data.name;
  }

  keys(obj) {
    console.log(obj);
    return Object.keys(obj);
  }
}
