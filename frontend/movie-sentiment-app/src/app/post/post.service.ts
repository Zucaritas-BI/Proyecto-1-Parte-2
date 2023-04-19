import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../entities/post';
import { Search } from '../entities/search';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8000/';
  private options = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
      return this.http.get<Post[]>(this.apiUrl + 'posts/', this.options);
  }

  getPost(id: number): Observable<Post> {
      return this.http.get<Post>(this.apiUrl + 'posts/' + id, this.options);
  }

  createPost(post: Post): Observable<Post> {
      return this.http.post<Post>(this.apiUrl + 'posts/', post, this.options);
  }

  createSearch(): Observable<Search> {
      return this.http.post<Search>(this.apiUrl + 'searchs/', {}, this.options);
  }

  createNPostsFromFile(file: File): Post[] {
    let postss: Post[] = [];
    // Create a search
    this.createSearch().subscribe(
      (search: Search) => {
        // Create a post for each line in the file
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const lines = e.target.result.split('\n');
          lines.forEach((line: string) => {
            console.log(line);
            if (line.trim() !== '') {
              const post = new Post(0, line, '', search.id);
              this.createPost(post).subscribe((post: Post) => {
                postss.push(post);
                console.log(post);
              });
            }
          });
        };
        reader.readAsText(file);
      }

    )
    return postss
  };


}
