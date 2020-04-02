import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatusUpdatePage } from './status-update.page';

describe('StatusUpdatePage', () => {
  let component: StatusUpdatePage;
  let fixture: ComponentFixture<StatusUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatusUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
