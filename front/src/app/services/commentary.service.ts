import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentaryDto } from '../dto/commentary.dto';

@Injectable({
  providedIn: 'root',
})
export class CommentaryService {
  private baseUrl = 'http://localhost:8080/api/commentaries';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getCommentariesByPostId(postId: number): Observable<CommentaryDto[]> {
    return this.http.get<CommentaryDto[]>(
      `${this.baseUrl}/post/${postId}`,
      this.httpOptions
    );
  }

  createCommentary(commentaryDto: CommentaryDto): Observable<CommentaryDto> {
    return this.http.post<CommentaryDto>(
      `${this.baseUrl}/create`,
      commentaryDto,
      this.httpOptions
    );
  }
}
