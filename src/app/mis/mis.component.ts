import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mis',
  templateUrl: './mis.component.html',
  styleUrls: ['./mis.component.css']
})
export class MisComponent implements OnInit {
  text: string;
  misForm: FormGroup;  //declaring our form variable
  constructor() { }

  ngOnInit(): void {
    this.misForm = new FormGroup({
      recipients: new FormControl(null),
      subject: new FormControl(null)
    });
   
  }

}
