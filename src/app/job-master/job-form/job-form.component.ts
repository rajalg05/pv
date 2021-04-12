import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Address } from 'src/app/model/address';
import { Associate } from 'src/app/model/associateMaster';
import { BasicContactDetail } from 'src/app/model/BasicContactDetail';
import { Job } from 'src/app/model/job';
import { KYC } from 'src/app/model/kyc';
import { Resource } from 'src/app/model/resource';
import { JobService } from 'src/app/service/job.service';
import { ResourceService } from 'src/app/service/resource.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent implements OnInit {
  jobForm: FormGroup;  //declaring our form variable
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
  @Input() job: Job;
  constructor(private jobService: JobService) {
    
  }

  ngOnInit(): void {
    if (this.job == null) {
      this.jobForm = new FormGroup({
        jobName: new FormControl(null) 
      });
    } else {
      this.jobForm = new FormGroup({
        jobName: new FormControl(this.job.jobName) 
      }); 
    }
  }
  onSubmit() {
    this.tabNameChangeEmit.emit(this.jobForm.get('firstName').value);
    let job: Job = new Job();

    this.jobService.saveJob(this.populateFormValues()).subscribe(data => {
      console.log('resource data = ', data);
    });
  }
  populateFormValues() {
    let job: Job = new Job();

    job.jobName = this.jobForm.get('jobName').value;
 
    let associate = new Associate();

    job.associate = associate;

    return job;
  }
  numericOnly(event) {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }
  adharFiles: any = [];
 

  reset(e: any) {
    this.jobForm.reset();  
  }
  displayReviewDialog: boolean = false;
  reviewDialog() {
    this.displayReviewDialog = true;
  }
}
