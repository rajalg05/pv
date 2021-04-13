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
  list1: Resource[] = [];

  list2: Resource[] = [];

  @Output() public tabNameChangeEmit = new EventEmitter();
  @Input() job: Job;
  constructor(private jobService: JobService,
    private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.resourceService.getResources().subscribe(resources => {
      this.list1 = resources;
    });

    if (this.job == null) {
      this.jobForm = new FormGroup({
        jobName: new FormControl(null),
        associate: new FormControl(null),
        clientName: new FormControl(null),
        frequencyOfAudit: new FormControl(null),
        paymentType: new FormControl(null),
        totalPayment: new FormControl(null),
        resourcesNeeded: new FormControl(null),
      });
    } else {
      this.jobForm = new FormGroup({
        jobName: new FormControl(this.job.jobName),
        associate: new FormControl(this.job.associate),
        clientName: new FormControl(this.job.clientName),
        frequencyOfAudit: new FormControl(this.job.frequencyOfAudit),
        paymentType: new FormControl(this.job.paymentType),
        totalPayment: new FormControl(this.job.totalPayment),
        resourcesNeeded: new FormControl(this.job.resourcesNeeded),
      });
    }
  }
  onSubmit() {
    this.tabNameChangeEmit.emit(this.jobForm.get('jobName').value);
    let job: Job = new Job();

    this.jobService.saveJob(this.populateFormValues()).subscribe(data => {
      console.log('resource data = ', data);
    });
  }
  populateFormValues() {
    let job: Job = new Job();

    job.jobName = this.jobForm.get('jobName').value;
    job.clientName = this.jobForm.get('clientName').value;
    job.frequencyOfAudit = this.jobForm.get('frequencyOfAudit').value;
    job.paymentType = this.jobForm.get('paymentType').value;
    job.totalPayment = this.jobForm.get('totalPayment').value;
    job.resourcesNeeded = this.jobForm.get('resourcesNeeded').value;

    job.associate = this.populateAssociate();

    return job;
  }
  populateAssociate() {
    // TO DO - get the associate data from login module. 
    let associate: Associate = new Associate();
    let basicContactDetail = new BasicContactDetail();
    let address = new Address();
    let kyc = new KYC();

    basicContactDetail.firstName = 'Munish';
    basicContactDetail.lastName = 'Gupta';
    //basicContactDetail.whatsappCountryCode = this.associateForm.get('whatsappCountryCode').value;
    basicContactDetail.whatsappMobileNumber = 9999999;
    basicContactDetail.email = 'sgupta@gmail.com';

    associate.basicContactDetail = basicContactDetail;

    address.addressLine1 = 'G302, Mystique moods';
    //address.streetAddress1 = this.associateForm.get('streetAddress1').value;
    address.streetAddress2 = 'Viman Nagar';
    address.city = 'Pune';
    address.state = 'Maharashtra';
    address.postalCode = '411014';
    address.country = 'India';

    associate.address = address;

    //kyc.firstKycId = this.associateForm.get('firstKycId').value;
    kyc.firstKycType = 'Adhar';
    //kyc.secondKycId = this.associateForm.get('secondKycId').value;
    kyc.secondKycType = 'PAN';

    associate.kyc = kyc;

    return associate;
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
