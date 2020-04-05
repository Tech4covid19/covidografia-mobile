import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostCodePage } from './post-code.page';

const routes: Routes = [
  {
    path: '',
    component: PostCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostCodePageRoutingModule {}
