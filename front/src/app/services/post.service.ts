import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { PostDto } from '../dto/post.dto';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'http://localhost:8080/api/posts';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }),
  };

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  getPostById(postId: number): Observable<PostDto> {
    return this.http.get<PostDto>(
      `${this.baseUrl}/${postId}`,
      this.httpOptions
    );
  }

  getPostsByUserSubscriptions(): Observable<PostDto[]> {
    return this.http
      .get<PostDto[]>(`${this.baseUrl}/user-subscriptions`, this.httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.sessionService.logOut();
          }
          return throwError(() => {
            error;
          });
        })
      );
  }

  createPost(postDto: PostDto): Observable<PostDto> {
    return this.http.post<PostDto>(
      `${this.baseUrl}/create`,
      postDto,
      this.httpOptions
    );
  }
}
