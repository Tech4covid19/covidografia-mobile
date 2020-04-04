import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeStateStep1Page } from './change-state-step1.page';

describe('ChangeStateStep1Page', () => {
  let component: ChangeStateStep1Page;
  let fixture: ComponentFixture<ChangeStateStep1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeStateStep1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeStateStep1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
