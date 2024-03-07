import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentaryDto } from 'src/app/dto/commentary.dto';
import { PostDto } from 'src/app/dto/post.dto';
import { ThemeDto } from 'src/app/dto/theme.dto';
import { CommentaryService } from 'src/app/services/commentary.service';
import { PostService } from 'src/app/services/post.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post!: PostDto;
  articleId!: number;
  commentaries: CommentaryDto[] = [];
  themes: ThemeDto[] = [];
  newCommentary: CommentaryDto = {
    content: '',
    postId: -1,
    user: { id: -1, username: '', email: '' },
  };

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private themeService: ThemeService,
    private commentaryService: CommentaryService
  ) {}

  ngOnInit(): void {
    this.loadPost();
    this.loadThemes();
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
      return 'Date invalide';
    }
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedMinute = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedDay}/${formattedMonth}/${year} - ${hours}h${formattedMinute}`;
  }

  loadThemes(): void {
    this.themeService.getAllThemes().subscribe((themes) => {
      this.themes = themes;
    });
  }

  loadCommentaries(): void {
    this.commentaryService
      .getCommentariesByPostId(this.post.id)
      .subscribe((commentaries) => {
        this.commentaries = commentaries;
      });
  }

  loadPost(): void {
    this.route.paramMap.subscribe((params) => {
      const articleIdParam = params.get('postId');
      this.articleId = articleIdParam !== null ? +articleIdParam : 0;

      if (this.articleId !== 0) {
        this.postService.getPostById(this.articleId).subscribe((data) => {
          this.post = data;
          this.loadCommentaries();
        });
      }
    });
  }

  getThemeLabel(themeId: number): string {
    const theme = this.themes.find((theme) => theme.id === themeId);
    return theme && theme.title ? theme.title : '';
  }

  createCommentary(): void {
    if (
      !this.newCommentary.content ||
      this.newCommentary.content.trim() === ''
    ) {
      return;
    }
    this.newCommentary.postId = this.articleId;
    this.commentaryService
      .createCommentary(this.newCommentary)
      .subscribe((createdCommentary) => {
        this.commentaries.push(createdCommentary);
        this.newCommentary.content = '';
      });
  }
}
