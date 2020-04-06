import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostCodePageRoutingModule } from './post-code-routing.module';

import { PostCodePage } from './post-code.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    PostCodePageRoutingModule,
  ],
  declarations: [PostCodePage],
})
export class PostCodePageModule {}
