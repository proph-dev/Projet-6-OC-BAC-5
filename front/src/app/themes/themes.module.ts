import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesComponent } from './themes/themes.component';
import { ThemeCardComponent } from './components/theme-card/theme-card.component';

@NgModule({
  declarations: [ThemesComponent, ThemeCardComponent],
  imports: [CommonModule],
  exports: [ThemesComponent],
})
export class ThemesModule {}
