import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './modules/home/home.component';
import { NewsComponent } from './modules/home/pages/news/news.component';
import { GuideComponent } from './modules/home/pages/guide/guide.component';
import { DownloadComponent } from './modules/home/pages/download/download.component';
import { AuthComponent } from './core/auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'news', component: NewsComponent },
      { path: 'guide', component: GuideComponent },
      { path: 'download', component: DownloadComponent },
    ],
  },
  {
    path: 'admon',
    loadChildren: () =>
      import('./modules/administration/administration-routing.module').then(
        (mod) => mod.AdministrationRoutingModule
      ),
  },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
