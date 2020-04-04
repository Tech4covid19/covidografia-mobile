import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeStateStep3Page } from './change-state-step3.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeStateStep3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeStateStep3PageRoutingModule {}
