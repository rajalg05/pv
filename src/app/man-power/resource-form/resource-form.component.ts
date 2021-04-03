import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { City } from 'src/app/model/city';
@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit {
  resourceForm: FormGroup;  //declaring our form variable
  // phone 
  separateDialCode = false;
  cities: City[];
  city: City;

   @Output() public tabNameChangeEmit = new EventEmitter();

  constructor() { 
    this.cities = [
      {name: 'Pune', code: 'pun'},
      {name: 'Mumbai', code: 'mum'},
      {name: 'Nagpur', code: 'nag'},
      {name: 'New Delhi', code: 'delhi'},
      {name: 'Kolkata', code: 'klk'},
      {name: 'Chennai', code: 'chn'}
  ];
   }

  ngOnInit(): void {
    this.resourceForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      user_email: new FormControl(null),
      addressLine1: new FormControl(null),
      addressLine2: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      zip: new FormControl(null),
      country: new FormControl('India'),
      phone: new FormControl(null),
      user_gender: new FormControl('Male')
    });
  }
  onSubmit() {
    console.log(this.resourceForm);
    console.log(this.resourceForm.get('firstName').value);
    console.log(this.resourceForm.get('lastName').value);
    this.tabNameChangeEmit.emit(this.resourceForm.get('firstName').value);
  }
  numericOnly(event) {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }
}
