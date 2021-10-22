import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { TitleComponent } from './components/title/title.component';
import { GuideComponent } from './pages/guide/guide.component';
import { DownloadComponent } from './pages/download/download.component';
import { NewsComponent } from './pages/news/news.component';

import { RouterModule } from '@angular/router';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    HomeComponent,
    TitleComponent,
    DownloadComponent,
    GuideComponent,
    NewsComponent,
  ],
  imports: [CommonModule, RouterModule, OrderModule],
  exports: [
    HomeComponent,
    TitleComponent,
    DownloadComponent,
    GuideComponent,
    NewsComponent,
  ],
})
export class HomeModule {}
