import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeStateStep2Page } from './change-state-step2.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeStateStep2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeStateStep2PageRoutingModule {}
