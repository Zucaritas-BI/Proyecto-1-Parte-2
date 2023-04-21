import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { PostService } from '../post/post.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '../entities/post';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    // API url
    apiUrl = "http://localhost:8000/api";
    posts: Post[] = [];
    possibleSentiments = ["positive", "negative"];
    percentagePositive: number = 0;
    percentageNegative: number = 0;

    constructor(private http: HttpClient, private postService: PostService, public dialog: MatDialog) { }

    // POST
    upload(file: File | null): void {
      if (!file) {
        return;
      }
      //Use the service to use the function upload
      this.posts = this.postService.createNPostsFromFile(file);
    }

    openDialog(): void {
      this.dialog.open(DialogComponent, {
        height: '40%',
        width: '60%'
      });
    }


}
