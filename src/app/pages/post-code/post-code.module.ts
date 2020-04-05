import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostCodePageRoutingModule } from './post-code-routing.module';

import { PostCodePage } from './post-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostCodePageRoutingModule
  ],
  declarations: [PostCodePage]
})
export class PostCodePageModule {}
