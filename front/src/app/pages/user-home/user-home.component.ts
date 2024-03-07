import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostDto } from 'src/app/dto/post.dto';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  posts: PostDto[] = [];
  post!: PostDto;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postService
      .getPostsByUserSubscriptions()
      .subscribe((response: PostDto[]) => {
        this.posts = response.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
  }

  seeMore(postId: number) {
    this.router.navigateByUrl(`/article/${postId}`);
  }

  goToCreatePage() {
    this.router.navigateByUrl(`/article-create`);
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
}
