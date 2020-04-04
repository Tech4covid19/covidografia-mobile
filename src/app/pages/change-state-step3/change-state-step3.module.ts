import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ChangeStateStep3PageRoutingModule } from './change-state-step3-routing.module';
import { ChangeStateStep3Page } from './change-state-step3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ChangeStateStep3PageRoutingModule,
  ],
  declarations: [ChangeStateStep3Page],
})
export class ChangeStateStep3PageModule {}
