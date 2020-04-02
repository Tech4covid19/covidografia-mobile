import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusUpdatePage } from './status-update.page';

const routes: Routes = [
  {
    path: '',
    component: StatusUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatusUpdatePageRoutingModule {}
