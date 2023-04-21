import { Component, Inject } from '@angular/core';
import { DialogService } from './dialog.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(private dialogService: DialogService) { }

  openDialog(): void {
    this.dialogService.openDialog();
  }

}
