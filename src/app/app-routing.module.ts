import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { GuideComponent } from './components/guide/guide.component';
import { DownloadComponent } from './components/download/download.component';

const routes: Routes = [
  {
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(mod=>mod.AuthModule)},
  { 
    path: 'admon', 
    loadChildren: () => import('./components/administration/administration.module').then(mod => mod.AdministrationModule)
  },
  {
    path: 'home', 
    component: HomeComponent, 
    children: [
      { path: 'news', component: NewsComponent },
      { path: 'guide', component: GuideComponent },
      { path: 'download', component: DownloadComponent },
    ] 
  },
  { path: '**', redirectTo: '/home/news', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
