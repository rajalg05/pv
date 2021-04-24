import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Address } from 'src/app/model/address';
import { Associate } from 'src/app/model/associateMaster';
import { Audit } from 'src/app/model/audit';
import { BasicContactDetail } from 'src/app/model/BasicContactDetail';
import { Job } from 'src/app/model/job';
import { KYC } from 'src/app/model/kyc';
import { Resource } from 'src/app/model/resource';
import { JobService } from 'src/app/service/job.service';
import { ResourceService } from 'src/app/service/resource.service';
import { NgxSpinnerService } from "ngx-spinner"; 

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
    private resourceService: ResourceService,  
    private SpinnerService: NgxSpinnerService) {
      this.cities = [
        { label: 'Pune', value: 'pun' },
        { label: 'Mumbai', value: 'mum' },
        { label: 'Nagpur', value: 'nag' },
        { label: 'New Delhi', value: 'delhi' },
        { label: 'Kolkata', value: 'klk' },
        { label: 'Chennai', value: 'chn' }
      ];
    }

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
        dateOfAudit: new FormControl(new Date()),
        paymentReceived: new FormControl(null),
        auditName: new FormControl(null),
        addressLine1: new FormControl(null),
        streetAddress2: new FormControl(null),
        city: new FormControl(null),
        state: new FormControl(null),
        postalCode: new FormControl(null),
        country: new FormControl('India')
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
        dateOfAudit: new FormControl(new Date()),
        paymentReceived: new FormControl(null),
        auditName: new FormControl(null),
        addressLine1: new FormControl(null),
        streetAddress2: new FormControl(null),
        city: new FormControl(null),
        state: new FormControl(null),
        postalCode: new FormControl(null),
        /* addressLine1: new FormControl(this.job.address.addressLine1),
        streetAddress2: new FormControl(this.job.address.streetAddress2),
        city: new FormControl(this.job.address.city),
        state: new FormControl(this.job.address.state),
        postalCode: new FormControl(this.job.address.postalCode), */
        country: new FormControl('India'),
      });
    }
  }
  onSubmit() {
    this.SpinnerService.show();
    let job: Job = this.populateFormValues();

    this.jobService.saveJob(job).subscribe(data => {
      console.log('saveJob data = ', data);
      this.tabNameChangeEmit.emit(job);
      this.SpinnerService.hide();  
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

    if(this.job !== null) {
      let audit: Audit = this.populateAudit();
      job.audits = [];
      job.audits.push(audit);
      job.auditOrJob = 'Audit'; // to display Audit fields in job form. Pls remember there is not separate Audit form, rather its embedded inside job form
    }
    
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

  populateAudit() {
    let audit: Audit = new Audit();
    let address = new Address();

    audit.jobId = this.job.id;

    address.addressLine1 = 'G302, Mystique moods';
    //address.streetAddress1 = this.associateForm.get('streetAddress1').value;
    address.streetAddress2 = 'Viman Nagar';
    address.city = 'Pune';
    address.state = 'Maharashtra';
    address.postalCode = '411014';
    address.country = 'India';

    audit.address = address;

    //audit.auditLocationAddressId = null;
    audit.auditStatus = 'Audit created';
    audit.dateOfAudit = this.jobForm.get('dateOfAudit').value;
    audit.paymentReceived = this.jobForm.get('paymentReceived').value; 
    let auditNameIndex: number = this.job.audits.findIndex(audit => audit.auditName == this.jobForm.get('auditName').value);
    if(auditNameIndex == -1) { // TO DO add unique audit under job 
      audit.auditName = this.jobForm.get('auditName').value; 
    } else {

    }
    
    audit.statusUpdatedBy = 'LG';

    return audit;
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
