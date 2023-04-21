import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { PostService } from '../post/post.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    // API url
    apiUrl = "http://localhost:8000/api";

    constructor(private http: HttpClient, private postService: PostService, public dialog: MatDialog) { }

    // POST
    upload(file: File | null): void {
      if (!file) {
        return;
      }
      //Use the service to use the function upload
      this.postService.createNPostsFromFile(file);
    }

    openDialog(): void {
      this.dialog.open(DialogComponent, {
        width: '250px',
      });
    }


}
