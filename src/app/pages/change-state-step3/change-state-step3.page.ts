import { ConfinementStatesService } from './../../services/confinement-states.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IConfinementState } from 'src/app/interfaces/iconfinementState';

@Component({
  selector: 'app-change-state-step3',
  templateUrl: './change-state-step3.page.html',
  styleUrls: ['./change-state-step3.page.scss'],
})
export class ChangeStateStep3Page implements OnInit {
  confinementStates: Observable<Array<IConfinementState>>;
  
  constructor(private confinementStatesSvc: ConfinementStatesService) { }

  ngOnInit() {
    this.confinementStates = this.confinementStatesSvc.fetchConfinementStates();
  }

}
