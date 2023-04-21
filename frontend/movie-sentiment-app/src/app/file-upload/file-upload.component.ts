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
  loading: boolean = false; // Flag variable
  file: File | null = null; // Variable to store file

  // Inject service
  constructor(private fileUploadService: FileUploadService, private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  // On file Select
  onChange(event: any) {
      this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
      this.loading = !this.loading;
      console.log(this.file);
      let posts = this.fileUploadService.upload(this.file);
      this.loading = !this.loading;
  }

  openDialog(): void {
    this.dialogService.openDialog();
  }

}
