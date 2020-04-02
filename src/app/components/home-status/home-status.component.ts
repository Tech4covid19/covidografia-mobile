import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-status',
  templateUrl: './home-status.component.html',
  styleUrls: ['./home-status.component.scss'],
})
export class HomeStatusComponent implements OnInit {

  @Input() numSymptoms: number = 0;
  constructor() { }

  ngOnInit() {}

}
