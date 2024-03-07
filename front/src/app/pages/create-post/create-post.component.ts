import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostDto } from 'src/app/dto/post.dto';
import { ThemeDto } from 'src/app/dto/theme.dto';
import { PostService } from 'src/app/services/post.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  post: PostDto = { id: 0, title: '', content: '', themeId: 0, createdAt: '' };
  themes: ThemeDto[] = [];

  constructor(
    private postService: PostService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadThemes();
  }

  loadThemes(): void {
    this.themeService.getAllThemes().subscribe((themes) => {
      this.themes = themes;
    });
  }

  createPost(): void {
    this.postService.createPost(this.post).subscribe((createdPost) => {
      this.router.navigateByUrl('/home');
    });
  }
}
