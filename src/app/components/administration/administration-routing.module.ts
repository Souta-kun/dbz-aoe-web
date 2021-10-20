import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationComponent } from './administration.component';
import { StartComponent } from './start/start.component';
import { PostManageComponent } from './post-manage/post-manage.component';
import { GuideManageComponent } from './guide-manage/guide-manage.component';
import { DownloadManageComponent } from './download-manage/download-manage.component';

import { AuthGuard } from 'src/app/auth/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: StartComponent },
      { path: 'post', component: PostManageComponent },
      { path: 'guide', component: GuideManageComponent },
      { path: 'download', component: DownloadManageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
