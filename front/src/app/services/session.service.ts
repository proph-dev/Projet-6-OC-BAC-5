import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionInformation } from '../interfaces/sessionInformation.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public isLogged = false;
  public sessionInformation: SessionInformation | undefined;
  private isLoggedSubject = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this.updateIsLoggedFromLocalStorage();
  }

  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  public logIn(user: SessionInformation): void {
    this.sessionInformation = user;
    localStorage.setItem('accessToken', user.token);
    this.updateIsLoggedFromLocalStorage();
  }

  public logOut(): void {
    this.sessionInformation = undefined;
    localStorage.removeItem('accessToken');
    this.updateIsLoggedFromLocalStorage();
  }

  public updateIsLoggedFromLocalStorage(): void {
    const accessToken = localStorage.getItem('accessToken');
    this.isLogged = !!accessToken;
    if (this.isLogged) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/');
    }
    this.isLoggedSubject.next(this.isLogged);
  }
}
