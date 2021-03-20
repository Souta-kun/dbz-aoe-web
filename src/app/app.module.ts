import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { HomeComponent } from './components/home/home.component';
import { GuideComponent } from './components/guide/guide.component';
import { DownloadComponent } from './components/download/download.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewsComponent } from './components/news/news.component';
import { MainComponent } from './components/administration/main/main.component';
import { PostManageComponent } from './components/administration/post-manage/post-manage.component';
import { DownloadManageComponent } from './components/administration/download-manage/download-manage.component';
import { GuideManageComponent } from './components/administration/guide-manage/guide-manage.component';
import { StartComponent } from './components/administration/start/start.component';
import { TitleComponent } from './components/title/title.component';
import { AuthComponent } from './auth/auth.component';

import { GuardInterceptor } from './auth/guard-interceptor';
import { OrderModule } from 'ngx-order-pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    JumbotronComponent,
    DownloadComponent,
    GuideComponent,
    NewsComponent,
    MainComponent,
    PostManageComponent,
    DownloadManageComponent,
    GuideManageComponent,
    StartComponent,
    TitleComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    OrderModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GuardInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
