import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeStateStep2PageRoutingModule } from './change-state-step2-routing.module';

import { ChangeStateStep2Page } from './change-state-step2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ChangeStateStep2PageRoutingModule
  ],
  declarations: [ChangeStateStep2Page]
})
export class ChangeStateStep2PageModule {}
