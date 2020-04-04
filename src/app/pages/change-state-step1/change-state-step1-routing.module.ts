import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeStateStep1Page } from './change-state-step1.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeStateStep1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeStateStep1PageRoutingModule {}
