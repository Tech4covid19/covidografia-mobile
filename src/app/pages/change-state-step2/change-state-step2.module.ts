import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeStateStep2PageRoutingModule } from './change-state-step2-routing.module';

import { ChangeStateStep2Page } from './change-state-step2.page';
import { StepsModule } from 'src/app/components/steps/steps.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    StepsModule,
    ChangeStateStep2PageRoutingModule
  ],
  declarations: [ChangeStateStep2Page]
})
export class ChangeStateStep2PageModule {}
