import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { GeoService } from './../../servives/geo.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/entities/user';
import { GeolocationPosition } from '@capacitor/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

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
    private user: User,
    private geoSvc: GeoService,
    private changeRef: ChangeDetectorRef,
    private userService: UserService,
    public fb: FormBuilder
  ) {
    this.maxYear = new Date().getFullYear();
    this.minYear = this.maxYear - 120;

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      'birth-year': ['', Validators.required],
      'zip-code-1': ['', Validators.required],
      'zip-code-2': ['', Validators.required],
      'covidografia-code': ['', Validators.required],
    });
  }

  async ngOnInit() {
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
      if (c.length > 0) this.postalCode = c[0].postalCode;
      this.changeRef.detectChanges();
    } catch (err) {}

    this.userService.fetchUser().subscribe((user) => {
      this.user = { ...user };
      this.showBackground = !user || user.show_onboarding;
      this.form.controls['birth-year'].setValue(this.user?.year);
      this.form.controls['zip-code-1'].setValue(this.user?.postalcode1);
      this.form.controls['zip-code-2'].setValue(this.user?.postalcode2);
      this.form.controls['covidografia-code'].setValue(this.user?.patientToken);
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

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      //this._updateUserData(this.form.value);

      if (this.user?.show_onboarding) {
        //this.router.navigate(['/onboarding']);
      } else {
        //this.router.navigate(['/dashboard', 'status']);
      }
    }
  }
}
