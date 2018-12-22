import { AuthService } from './../../auth/auth.service';
import { Post } from './../post.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  private postSubs: Subscription;
  private authSubs: Subscription;
  isAllowed = false;
  posts: Post[] = [];
  userId: string;
  constructor(public postService: PostsService, private authService: AuthService) { }
  onDelete(postId: string) {
    this.postService.deletePost(postId);

  }
  getUserStatus() {
    this.authSubs = this.authService.getUserStatus().subscribe(isAuth =>
      this.isAllowed = isAuth
    );
  }
  ngOnInit() {
    this.postService.getPosts();
    this.userId = this.authService.getUserId();
    this.postSubs = this.postService.getPostUpdates()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
    this.isAllowed = this.authService.getAuthStatusAfterLogin();
    this.getUserStatus();
    this.userId = this.authService.getUserId();
  }
  ngOnDestroy() {
    this.postSubs.unsubscribe();
    this.authSubs.unsubscribe();
  }
}
