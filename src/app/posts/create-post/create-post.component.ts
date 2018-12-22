import { Post } from './../post.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  private mode = 'create';
  private postId: string;
  post: Post;
  constructor(public postService: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.postId = paramMap.get('id');
        this.mode = 'edit';
        this.postService.getPost(this.postId)
          .subscribe((post) => {
            this.post = post;
          });

      } else {
        this.mode = 'create';
      }

    });
  }
  onCreatePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      const newPost: Post = {
        title: form.value.title,
        content: form.value.content
      };
      this.postService.addPost(newPost);
    } else {
      this.postService.updatePost({ _id: this.post._id, title: form.value.title, content: form.value.content });
    }
    form.resetForm();

  }

}
