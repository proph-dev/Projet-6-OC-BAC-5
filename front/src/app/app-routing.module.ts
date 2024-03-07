import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UnauthGuard } from './guards/unauth.guard';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { AuthGuard } from './guards/auth.guard';
import { UserProfilComponent } from './pages/user-profil/user-profil.component';
import { PostComponent } from './pages/post/post.component';
import { ThemesPageComponent } from './pages/themes-page/themes-page.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [UnauthGuard] },
  {
    path: 'home',
    component: UserHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'me',
    component: UserProfilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'themes',
    component: ThemesPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'article/:postId',
    component: PostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'article-create',
    component: CreatePostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    canActivate: [UnauthGuard],
    loadChildren: () =>
      import('./pages/connexion/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
