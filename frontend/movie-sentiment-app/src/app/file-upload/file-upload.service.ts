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
    public percentagePositive: number = 0;
    public percentageNegative: number = 0;
    public loading: boolean = false; // Flag variable
    public portionOfPosts: Post[] = [];
    useIndex: number[] = [];

    constructor(private http: HttpClient, private postService: PostService, public dialog: MatDialog) { }

    upload(file: File | null): void {
      if (!file) {
        return;
      }
      //Use the service to use the function upload
      this.postService.createNPostsSendListToServer(file).subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.loading = true;
          this.first5PositivesAnd5Negatives();
        }
      );
    }

    first5PositivesAnd5Negatives(): void {
      let positiveCount = 0;
      let negativeCount = 0;
      let i = 0;
      while (positiveCount < 5 && negativeCount < 5 || i < this.posts.length) {
        if (this.posts[i].sentiment === "positive") {
          this.portionOfPosts.push(this.posts[i]);
          positiveCount++;
        } else if (this.posts[i].sentiment === "negative") {
          this.portionOfPosts.push(this.posts[i]);
          negativeCount++;
        }
        i++;
      }
    }

}
