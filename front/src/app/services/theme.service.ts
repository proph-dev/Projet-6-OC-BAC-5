import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThemeDto } from '../dto/theme.dto';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private baseUrl = 'http://localhost:8080/api/themes';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getAllThemes(): Observable<ThemeDto[]> {
    return this.http.get<ThemeDto[]>(`${this.baseUrl}/get`, this.httpOptions);
  }
}
