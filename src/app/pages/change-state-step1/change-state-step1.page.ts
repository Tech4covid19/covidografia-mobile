import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISymptom } from 'src/app/interfaces/ISymptom';
import { SymptomsService } from './../../services/symptoms.service';

@Component({
  selector: 'app-change-state-step1',
  templateUrl: './change-state-step1.page.html',
  styleUrls: ['./change-state-step1.page.scss'],
})
export class ChangeStateStep1Page implements OnInit {
  symptoms: Observable<Array<ISymptom>>;

  constructor(private symptomsSvc: SymptomsService) {}

  ngOnInit() {
    this.symptoms = this.symptomsSvc.fetchSymptoms();
  }
}
