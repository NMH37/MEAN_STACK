import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from './../posts/post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';



const baseUrl = environment.apiUrl + '/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts() {
    this.http.get<{ message: string, posts: Post[] }>(baseUrl)
      .subscribe((response) => {
        this.posts = response.posts;
        this.postUpdated.next([...this.posts]);
      });
  }
  getPost(id: string) {
    return this.http.get<Post>(baseUrl + '/' + id);
  }

  addPost(post: Post) {
    this.http.post<Post>(baseUrl, post)
      .subscribe((newpost) => {
        this.posts.push(newpost);
        this.postUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }
  updatePost(post: Post) {
    this.http.put(baseUrl + '/' + post._id, post)
      .subscribe((result) => {
        console.log(result);
        this.router.navigate(['/']);
      });
  }
  deletePost(id: string) {
    this.http.delete(baseUrl + '/' + id)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post._id !== id);
        this.postUpdated.next([...this.posts]);
      });
  }
  getPostUpdates() {
    return this.postUpdated.asObservable();
  }
}
