import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit {
  resourceForm: FormGroup;  //declaring our form variable
  // phone 
  separateDialCode = false;
  cities: SelectItem[];
  city: SelectItem;

  bikes: SelectItem[];
  bike: SelectItem;


  qualifications: SelectItem[];
  excelSkills: SelectItem[];

  stockAuditExps: SelectItem[];
  tlNonTls: SelectItem[];
  @Output() public tabNameChangeEmit = new EventEmitter();

  constructor() {
    this.cities = [
      { label: 'Pune', value: 'pun' },
      { label: 'Mumbai', value: 'mum' },
      { label: 'Nagpur', value: 'nag' },
      { label: 'New Delhi', value: 'delhi' },
      { label: 'Kolkata', value: 'klk' },
      { label: 'Chennai', value: 'chn' }
    ];

    this.bikes = [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
      { label: 'Third Choice', value: 'thirdChoice' }
    ];

    this.qualifications = [
      { label: 'Graduate', value: 'graduate' },
      { label: 'Post Graduate', value: 'postGraduate' },
      { label: 'Under Grad', value: 'underGrad' }
    ];

    this.excelSkills = [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
      { label: 'Third Choice', value: 'thirdChoice' }
    ];

    this.stockAuditExps = [
      { label: '0', value: '0' },
      { label: '1-3', value: '1-3' },
      { label: '>3', value: '>3' }
    ];

    this.tlNonTls = [
      { label: 'TL', value: 'tl' },
      { label: 'Non TL', value: 'nonTl' }
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
      dob: new FormControl(null),
      bike: new FormControl(null),
      phone: new FormControl(null),
      qualification: new FormControl(null),
      excelSkill: new FormControl(null),
      stockAuditExp: new FormControl(null),
      tlNonTl: new FormControl(null),
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
  adharFiles: any = [];

  uploadAdharFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.adharFiles.push(element.name)
    }
  }
  deleteAdharAttachment(index) {
    this.adharFiles.splice(index, 1)
  }
  panFiles: any = [];

  uploadPanFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.panFiles.push(element.name)
    }
  }
  deletePanAttachment(index) {
    this.panFiles.splice(index, 1)
  }

  reset(e: any) {
    this.resourceForm.reset();
    this.adharFiles = [];
    this.panFiles = [];
    this.resourceForm.get('country').setValue('India');
  }
  displayReviewDialog: boolean = false;
  reviewDialog() {
    this.displayReviewDialog = true;
  }
}
