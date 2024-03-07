import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/user';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getUserById(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/me`, this.httpOptions);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${userId}`,
      this.httpOptions
    );
  }

  updateUser(user: UserDto): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/update`,
      user,
      this.httpOptions
    );
  }
}
