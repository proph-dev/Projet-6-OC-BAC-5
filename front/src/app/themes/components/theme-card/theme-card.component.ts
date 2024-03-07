import { Component, Input, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-theme-card',
  templateUrl: './theme-card.component.html',
  styleUrls: ['./theme-card.component.scss'],
})
export class ThemeCardComponent {
  @Input() themeId!: number;
  @Input() themeTitle!: string;
  @Input() themeDescription!: string;
  @Input() isSubscribed!: boolean;
  @Input() isProfilePage!: boolean;

  constructor(private subscriptionService: SubscriptionService) {}

  subscribeToTheme() {
    this.subscriptionService.createSubscription(this.themeId).subscribe(() => {
      this.isSubscribed = true;
    });
  }

  unSubscribeFromTheme() {
    this.subscriptionService.deleteSubscription(this.themeId).subscribe(() => {
      this.isSubscribed = false;
    });
  }
}
