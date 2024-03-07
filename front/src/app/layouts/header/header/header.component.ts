import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isSidebarVisible = window.innerWidth < 768;

  constructor(private sessionService: SessionService, private router: Router) {
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  ngOnInit(): void {
    this.onWindowResize();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
  }

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

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  onWindowResize() {
    this.isSidebarVisible = window.innerWidth < 768;
  }
}
