import {Component, OnInit} from '@angular/core';
import {StringerService} from './stringer.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = 'Racket Stringer';
  public allModels: string[] = [];
  public mainsForm: FormGroup;
  public crossesForm: FormGroup;
  public mainsFilteredModels: Observable<string[]>;
  public crossesFilteredModels: Observable<string[]>;
  public sameAsMains = true;
  public addOverGrip = false;
  public replaceGrip = false;
  public preStretch = false;
  public notes = '';

  constructor(public stringerService: StringerService, private fb: FormBuilder) {
    this.createForms();
  }

  ngOnInit(): void {
    this.stringerService.getStrings().subscribe(strings => {
      this.allModels = strings.map((string) => {
        return (string.brand + ': ' + string.model);
      });
      // console.log(this.allModels);
      this.mainsFilteredModels = this.mainsForm.controls['model'].valueChanges
        .pipe(
          startWith(''),
          map(val => this.filter(val))
        );
      this.crossesFilteredModels = this.crossesForm.controls['model'].valueChanges
        .pipe(
          startWith(''),
          map(val => this.filter(val))
        );
    });
  }

  public submitForm() {
    const options = {
      mains: this.mainsForm.value,
      extras: {
        addOverGrip: this.addOverGrip,
        replaceGrip: this.replaceGrip,
        preStretch: this.preStretch
      },
      notes: this.notes
    };
    if (!this.sameAsMains) {
      options['crosses'] = this.crossesForm.value;
    }
    console.log(options);
  }

  private filter(val: string): string[] {
    return this.allModels.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) !== -1);
  }

  private createForms() {
    this.mainsForm = this.fb.group({
      model: ['', Validators.required],
      tension: ['', [Validators.required, Validators.min(30), Validators.max(75)]]
    });
    this.crossesForm = this.fb.group({
      model: ['', Validators.required],
      tension: ['', [Validators.required, Validators.min(30), Validators.max(75)]]
    });
  }

  get disableSubmit() {
    return this.sameAsMains ? !this.mainsForm.valid : !this.crossesForm.valid ||
      !this.mainsForm.valid;
  }
}
