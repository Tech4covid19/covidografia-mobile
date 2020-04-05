import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostCodePage } from './post-code.page';

describe('PostCodePage', () => {
  let component: PostCodePage;
  let fixture: ComponentFixture<PostCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
