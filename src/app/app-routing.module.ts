import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { GuideComponent } from './components/guide/guide.component';
import { DownloadComponent } from './components/download/download.component';
import { MainComponent } from './components/administration/main/main.component';
import { PostManageComponent } from './components/administration/post-manage/post-manage.component';
import { GuideManageComponent } from './components/administration/guide-manage/guide-manage.component';
import { DownloadManageComponent } from './components/administration/download-manage/download-manage.component';
import { StartComponent } from './components/administration/start/start.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'home/news', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'home', redirectTo: 'home/news', pathMatch: 'full' },
  { 
    path: 'home', 
    component: HomeComponent, 
    children: [
      { path: 'news', component: NewsComponent },
      { path: 'guide', component: GuideComponent },
      { path: 'download', component: DownloadComponent },
    ] 
  },
  { 
    path: 'admon', 
    component: MainComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: '', component: StartComponent },
      { path: 'post', component: PostManageComponent },
      { path: 'guide', component: GuideManageComponent },
      { path: 'download', component: DownloadManageComponent }
    ] 
  },
  { path: '**', redirectTo: 'home/news', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
