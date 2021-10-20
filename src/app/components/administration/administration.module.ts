import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AdministrationRoutingModule } from "./administration-routing.module";

import { OrderModule } from 'ngx-order-pipe';
import { DownloadManageComponent } from "./download-manage/download-manage.component";
import { GuideManageComponent } from "./guide-manage/guide-manage.component";
import { MainComponent } from "./main/main.component";
import { PostManageComponent } from "./post-manage/post-manage.component";
import { StartComponent } from "./start/start.component";

@NgModule({
  declarations: [
    StartComponent,
    MainComponent,
    PostManageComponent,
    DownloadManageComponent,
    GuideManageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdministrationRoutingModule,
    OrderModule
  ]
})
export class AdministrationModule {}
