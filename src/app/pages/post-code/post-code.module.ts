import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PostCodePageRoutingModule } from './post-code-routing.module';
import { PostCodePage } from './post-code.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    PostCodePageRoutingModule,
  ],
  declarations: [PostCodePage],
})
export class PostCodePageModule {}
