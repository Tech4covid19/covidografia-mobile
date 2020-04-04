import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeStateStep3Page } from './change-state-step3.page';

describe('ChangeStateStep3Page', () => {
  let component: ChangeStateStep3Page;
  let fixture: ComponentFixture<ChangeStateStep3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeStateStep3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeStateStep3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
