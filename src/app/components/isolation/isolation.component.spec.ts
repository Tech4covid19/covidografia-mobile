import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IsolationComponent } from './isolation.component';

describe('IsolationComponent', () => {
  let component: IsolationComponent;
  let fixture: ComponentFixture<IsolationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsolationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IsolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
