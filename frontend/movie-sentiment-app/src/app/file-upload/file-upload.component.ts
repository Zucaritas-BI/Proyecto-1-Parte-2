import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit{

  // Variable to store shortLink from api response
  shortLink: string = "";
  file: File | null = null; // Variable to store file

  // Inject service
  constructor(public fileUploadService: FileUploadService, private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  // On file Select
  onChange(event: any) {
      this.file = event.target.files[0];
  }

  onUpload() {
    this.fileUploadService.loading = false;
    console.log(this.file);
    this.fileUploadService.upload(this.file);
  }

  openDialog(): void {
    this.dialogService.openDialog();
  }

}
