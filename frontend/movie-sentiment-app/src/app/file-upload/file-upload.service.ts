import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, forkJoin, fromEvent, map, retry, switchMap, throwError } from 'rxjs';
import { Search } from '../entities/search';
import { Post } from '../entities/post';
import { PostService } from '../post/post.service';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    // API url
    apiUrl = "http://localhost:8000/api";

    constructor(private http: HttpClient, private postService: PostService) { }

    // POST
    upload(file: File | null): void {
      if (!file) {
        return;
      }
      //Use the service to use the function upload
      this.postService.createNPostsFromFile(file);
    }



}
