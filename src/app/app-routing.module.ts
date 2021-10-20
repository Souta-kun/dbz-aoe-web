import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { GuideComponent } from './components/guide/guide.component';
import { DownloadComponent } from './components/download/download.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '',  redirectTo: '/home/news', pathMatch: 'full' },
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
    loadChildren: ()=> import('./components/administration/administration-routing.module').then(mod => mod.AdministrationRoutingModule)
  },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
