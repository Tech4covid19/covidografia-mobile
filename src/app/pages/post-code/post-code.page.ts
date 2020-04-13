import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GeolocationPosition } from '@capacitor/core';
import { IonRouterOutlet, ModalController, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { loadConditions } from 'src/app/actions/conditions.actions';
import { loadConfinements } from 'src/app/actions/confinements.actions';
import { User } from 'src/app/entities/user';
import { State } from 'src/app/reducers';
import { GeoService } from 'src/app/services/geo.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CaseConditionsService } from './../../services/case-conditions.service';
import { CaseConfinementsService } from './../../services/case-confinements.service';

@Component({
  selector: 'app-post-code',
  templateUrl: './post-code.page.html',
  styleUrls: ['./post-code.page.scss'],
  providers: [IonRouterOutlet],
})
export class PostCodePage implements OnInit {
  form: FormGroup;

  submitted = false;
  opened = true;
  closing = false;
  showBackground = false;
  maxYear: number;
  minYear: number;

  constructor(
    private user: User,
    private geoSvc: GeoService,
    private changeRef: ChangeDetectorRef,
    public fb: FormBuilder,
    private userSvc: UserService,
    private store: Store<State>,
    private navCtrl: NavController,
    private utils: UtilsService,
    private modalController: ModalController,
    private caseConditionsService: CaseConditionsService,
    private caseConfinementsService: CaseConfinementsService
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
    this.user = await this.store
      .select((state) => state.user)
      .pipe(map((u) => u.user))
      .toPromise();

    try {
      const currentPosition: GeolocationPosition = await this.geoSvc.getCurrentPosition();
      console.log(
        '___current location',
        currentPosition,
        currentPosition.coords.latitude,
        currentPosition.coords.longitude
      );
      const c = await this.geoSvc.getPostalCode(
        currentPosition.coords.latitude,
        currentPosition.coords.longitude
      );
      console.log('___postalCode', c);
      if (c.length > 0) {
        const postalCode = c[0].postalCode.split('-');
        this.form.controls['zip-code-1'].setValue(postalCode[0]);
        this.changeRef.detectChanges();
      }
    } catch (err) {
      console.log('___locationErr', err);
    }

    this.showBackground = !this.user || this.user.show_onboarding;
    this.form.controls['birth-year'].setValue(this.user.year);
    this.form.controls['zip-code-1'].setValue(this.user.postalcode1);
    this.form.controls['zip-code-2'].setValue(this.user.postalcode2);
    this.form.controls['covidografia-code'].setValue(this.user.patientToken);

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
    console.log(
      'this.form.value[zip-code-1]',
      this.form.value['zip-code-1'],
      this.form.value['zip-code-2'],
      this.form.valid
    );
    this.user.postalcode =
      this.form.value['zip-code-1'] + '-' + this.form.value['zip-code-2'];
    if (this.form.valid) {
      this.userSvc
        .updatePostalCode(this.user)
        .then(async (resp) => {
          this.fetchData(this.user);
          this.modalController.dismiss();
          this.navCtrl.navigateRoot('home');
        })
        .catch((err) => {
          this.utils.presentToast(
            'Houve um problema a registar estes dados. Tente novamente mais tarde',
            2500,
            'top',
            'Ok'
          );
          this.navCtrl.navigateRoot('/home');
          console.log('err', err);
        });
    }
  }

  async fetchData(user) {
    this.caseConfinementsService
      .fetchCaseConfinementsByPostalCode(user.postalcode)
      .subscribe((c) => {
        this.store.dispatch(
          loadConfinements({
            zipcode: user.postalcode,
            confinements: c,
          })
        );
      });

    this.caseConditionsService
      .fetchCaseConditionsByPostalCode(user.postalcode)
      .subscribe((c) => {
        this.store.dispatch(
          loadConditions({
            zipcode: user.postalcode,
            conditions: c,
          })
        );
      });
  }
}
