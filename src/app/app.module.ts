import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AuthComponent } from './core/auth/auth.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './modules/home/home.component';
import { TitleComponent } from './modules/home/components/title/title.component';
import { GuideComponent } from './modules/home/pages/guide/guide.component';
import { DownloadComponent } from './modules/home/pages/download/download.component';
import { NewsComponent } from './modules/home/pages/news/news.component';

import { AppRoutingModule } from './app-routing.module';
import { AdministrationModule } from './modules/administration/administration.module';
import { OrderModule } from 'ngx-order-pipe';

import { GuardInterceptor } from './core/auth/guard-interceptor';
// NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './shared/store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EffectsArray } from './shared/store/effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    DownloadComponent,
    GuideComponent,
    NewsComponent,
    TitleComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    OrderModule,
    AdministrationModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot(EffectsArray),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GuardInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
