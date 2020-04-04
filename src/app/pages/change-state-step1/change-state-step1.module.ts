import { StepsModule } from './../../components/steps/steps.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ChangeStateStep1PageRoutingModule } from './change-state-step1-routing.module';
import { ChangeStateStep1Page } from './change-state-step1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    StepsModule,
    ChangeStateStep1PageRoutingModule,
  ],
  declarations: [ChangeStateStep1Page],
})
export class ChangeStateStep1PageModule {}
