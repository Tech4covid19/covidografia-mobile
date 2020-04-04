import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeStateStep2Page } from './change-state-step2.page';

describe('ChangeStateStep2Page', () => {
  let component: ChangeStateStep2Page;
  let fixture: ComponentFixture<ChangeStateStep2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeStateStep2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeStateStep2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
