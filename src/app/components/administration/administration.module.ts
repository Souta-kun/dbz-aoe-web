import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AdministrationComponent } from './administration.component';
import { StartComponent } from './start/start.component';
import { DownloadManageComponent } from './download-manage/download-manage.component';
import { GuideManageComponent } from './guide-manage/guide-manage.component';
import { PostManageComponent } from './post-manage/post-manage.component';

import { AdministrationRoutingModule } from './administration-routing.module';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    StartComponent,
    AdministrationComponent,
    PostManageComponent,
    DownloadManageComponent,
    GuideManageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdministrationRoutingModule,
    OrderModule,
  ],
})
export class AdministrationModule {}
