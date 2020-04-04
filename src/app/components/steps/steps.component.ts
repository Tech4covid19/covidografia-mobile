import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IStep } from './../../interfaces/IStep';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit {
  @Input() steps: IStep[];
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  public goToStep(step: IStep) {
    if (step.active) {
      this.navCtrl.navigateForward(step.url);
    }
  }
}
