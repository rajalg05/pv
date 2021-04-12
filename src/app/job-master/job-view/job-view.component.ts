import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { Associate } from 'src/app/model/associateMaster';
import { Job } from 'src/app/model/job';
import { AssociateService } from 'src/app/service/associate.service';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css']
})
export class JobViewComponent implements OnInit {

  jobs: Job[];

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  @Output() sendJobEmitter = new EventEmitter();
  
  @Output() sendAuditEmitter = new EventEmitter();

  constructor(
    private primengConfig: PrimeNGConfig,
    private jobService: JobService) { }

  ngOnInit() {
    this.jobService.findAllJobs().subscribe(data => {
      console.log('associate = ', data);
      this.jobs = data;
    })

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];

    this.primengConfig.ripple = true;
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  openJobTab(job: Job) {
    this.sendJobEmitter.emit(job);
  }
  addAuditTab(job: Job) {
    console.log('job = ' , job);
    this.sendAuditEmitter.emit(job);
  }
}
