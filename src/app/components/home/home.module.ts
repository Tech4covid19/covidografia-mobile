import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HomeFooterComponent } from './../home-footer/home-footer.component';
import { ConditionsComponent } from '../conditions/conditions.component';
import { ConfinementComponent } from '../confinement/confinement.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeFooterComponent,
    ConditionsComponent,
    ConfinementComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule, TranslateModule],
  exports: [HomeFooterComponent, ConditionsComponent, ConfinementComponent],
})
export class HomeComponentsModule {}
