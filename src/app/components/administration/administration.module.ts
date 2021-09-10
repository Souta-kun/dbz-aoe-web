import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { AuthGuard } from 'src/app/auth/auth-guard';

import { MainComponent } from './main/main.component';
import { StartComponent } from './start/start.component';
import { PostManageComponent } from './post-manage/post-manage.component';
import { GuideManageComponent } from './guide-manage/guide-manage.component';
import { DownloadManageComponent } from './download-manage/download-manage.component';

@NgModule({
  declarations: [
    MainComponent,
    StartComponent, 
    PostManageComponent, 
    GuideManageComponent, 
    DownloadManageComponent
  ],
  exports: [],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', 
        component: MainComponent, 
        canActivate: [AuthGuard],
        children: [
          { path: '', component: StartComponent },
          { path: 'post', component: PostManageComponent },
          { path: 'guide', component: GuideManageComponent },
          { path: 'download', component: DownloadManageComponent }
        ] 
      }
    ])
  ]
})
export class AdministrationModule { }
