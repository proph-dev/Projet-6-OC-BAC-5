import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ThemeDto } from 'src/app/dto/theme.dto';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss'],
})
export class ThemesComponent implements OnInit, OnDestroy {
  @Input() isProfilePage!: boolean;
  themes: ThemeDto[] = [];
  themesSubscribed: Number[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private themeService: ThemeService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.loadThemes();
    this.loadThemesSubscribed();
  }

  loadThemes(): void {
    this.themeService.getAllThemes().subscribe((themes) => {
      this.themes = themes;
    });
  }

  loadThemesSubscribed(): void {
    this.subscriptionService
      .getAllSubscriptions()
      .subscribe((subscriptions) => {
        this.themesSubscribed = subscriptions;
      });
  }

  isThemeSubscribed(themeId: number): boolean {
    return this.themesSubscribed.includes(themeId);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
