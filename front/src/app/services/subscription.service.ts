import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from '../dto/subscription.dto';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private baseUrl = 'http://localhost:8080/api/subscription';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  createSubscription(themeId: number): Observable<Subscription> {
    console.log(this.httpOptions);

    return this.http.post<Subscription>(
      `${this.baseUrl}/create/${themeId}`,
      {},
      this.httpOptions
    );
  }

  deleteSubscription(themeId: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(
      `${this.baseUrl}/delete/${themeId}`,
      this.httpOptions
    );
  }

  getAllSubscriptions(): Observable<Number[]> {
    return this.http.get<Number[]>(`${this.baseUrl}/all`, this.httpOptions);
  }
}

export interface MessageResponse {
  message: string;
}
