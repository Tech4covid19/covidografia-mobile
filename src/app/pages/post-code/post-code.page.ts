import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GeolocationPosition } from '@capacitor/core';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { IonRouterOutlet, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/entities/user';
import { State } from 'src/app/reducers';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { GeoService } from '../../services/geo.service';
import { VideoPage } from '../video/video.page';


@Component({
  selector: 'app-post-code',
  templateUrl: './post-code.page.html',
  styleUrls: ['./post-code.page.scss'],
  providers: [NativeGeocoder],
})
export class PostCodePage implements OnInit {
  form: FormGroup;
  postalCode: string;
  submitted = false;
  opened = true;
  closing = false;
  showBackground = false;
  maxYear: number;
  minYear: number;

  constructor(
    private user: Observable<User>,
    private geoSvc: GeoService,
    private changeRef: ChangeDetectorRef,
    public fb: FormBuilder,
    private userSvc: UserService,
    private store: Store<State>,
    private navCtrl: NavController,
    private utils: UtilsService,
    private routerOutlet: IonRouterOutlet
  ) {
    this.maxYear = new Date().getFullYear();
    this.minYear = this.maxYear - 120;

    this.form = this.fb.group({
      'birth-year': ['', Validators.required],
      'zip-code-1': ['', Validators.required],
      'zip-code-2': ['', Validators.required],
      'covidografia-code': [''],
    });
  }

  async ngOnInit() {
    this.user = this.store
      .select((state) => state.user)
      .pipe(map((u) => u.user));

    try {
      const currentPosition: GeolocationPosition = await this.geoSvc.getCurrentPosition();
      console.log(
        'curre',
        currentPosition,
        currentPosition.coords.latitude,
        currentPosition.coords.longitude
      );
      const c = await this.geoSvc.getPostalCode(
        currentPosition.coords.latitude,
        currentPosition.coords.longitude
      );
      if (c.length > 0) {
        this.postalCode = c[0].postalCode;
        this.form.controls['zip-code-1'].setValue(c[0].postalCode);
        this.changeRef.detectChanges();
      }
    } catch (err) {}

    this.user.subscribe((user) => {
      this.showBackground = !user || user.show_onboarding;
      this.form.controls['birth-year'].setValue(user.year);
      this.form.controls['zip-code-1'].setValue(user.postalcode1);
      this.form.controls['zip-code-2'].setValue(user.postalcode2);
      this.form.controls['covidografia-code'].setValue(user.patientToken);
    });

    this.form = this.fb.group({
      'birth-year': [
        null,
        [
          Validators.required,
          Validators.min(this.minYear),
          Validators.max(this.maxYear),
        ],
      ],
      'zip-code-1': [null, Validators.required],
      'zip-code-2': [null, Validators.required],
      'covidografia-code': null,
    });
  }

  get birthYearControl(): FormControl {
    return this.form.get('birth-year') as FormControl;
  }

  get zipCode1Control(): FormControl {
    return this.form.get('zip-code-1') as FormControl;
  }

  get zipCode2Control(): FormControl {
    return this.form.get('zip-code-2') as FormControl;
  }

  get covidografiaCodeControl(): FormControl {
    return this.form.get('covidografia-code') as FormControl;
  }

  private addLeadingZeros(number, size) {
    let s = String(number);
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

  public keyPress(event) {
    const pattern = /[a-zA-Z0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  public keyPressNumber(event) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  async onSubmit() {
    this.submitted = true;
    this.user.pipe(
      map(async (user) => {
        user.postalcode = this.form.value['zip-code-1'];
        if (this.form.valid) {
          this.userSvc.updatePostalCode(user);
          if (user.show_onboarding) {
            this.navCtrl.navigateRoot('/home');
            (
              await this.utils.swipableModal(
                VideoPage,
                this.routerOutlet.nativeEl,
                {},
                ''
              )
            ).present();
          } else {
            this.navCtrl.navigateRoot('/home');
          }
        }
      })
    );
  }
}
