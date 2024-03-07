import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isMenuOpen = false;

  constructor(private sessionService: SessionService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.sessionService.isLogged;
  }

  routerHome() {
    this.router.navigateByUrl('/home');
  }

  routerTheme() {
    this.router.navigateByUrl('/themes');
  }

  routerProfil() {
    this.router.navigateByUrl('/me');
  }

  shouldDisplayBtn(): boolean {
    const currentRoute = this.router.url;
    return currentRoute !== '/signup' && currentRoute !== '/signin';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
