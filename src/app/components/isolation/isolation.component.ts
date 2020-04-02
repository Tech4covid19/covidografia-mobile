import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-isolation',
  templateUrl: './isolation.component.html',
  styleUrls: ['./isolation.component.scss']
})
export class IsolationComponent implements OnInit {
  @Input() numSymptoms: number = 0;
  constructor() {}

  ngOnInit() {}
}
