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
    public loading: boolean = false; // Flag variable

    constructor(private http: HttpClient, private postService: PostService, public dialog: MatDialog) { }

    upload(file: File | null): void {
      if (!file) {
        return;
      }
      //Use the service to use the function upload
      this.postService.createNPostsFromFile(file).subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.loading = true;
        }
      );
    }


}
