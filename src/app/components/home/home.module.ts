import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HomeFooterComponent } from './../home-footer/home-footer.component';
import { HomeStatusComponent } from './../home-status/home-status.component';
import { IsolationComponent } from './../isolation/isolation.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeFooterComponent, HomeStatusComponent, IsolationComponent],
  imports: [CommonModule, IonicModule, FormsModule, TranslateModule],
  exports: [HomeFooterComponent, HomeStatusComponent, IsolationComponent]
})
export class HomeComponentsModule {}
