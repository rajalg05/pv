import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import {MultiSelectModule} from 'primeng/multiselect';
@Component({
  selector: 'app-job-allocation',
  templateUrl: './job-allocation.component.html',
  styleUrls: ['./job-allocation.component.css']
})
export class JobAllocationComponent implements OnInit {
  selectedJob: string;

  selectedTlNonTls: string;

  items: SelectItem[];

  item: string;

  jobs: any[];

  tlNonTls: any[];
  constructor() { }

  ngOnInit(): void {
    this.jobs = [
      { name: "JOB1", code: "job1" },
      { name: "JOB2", code: "job2" },
      { name: "JOB3", code: "job3" },
      { name: "JOB4", code: "job4" },
      { name: "JOB5", code: "job5" },
      { name: "JOB6", code: "job6" },
    ];

    this.tlNonTls = [
      { name: "Rohit", code: "adhar1" },
      { name: "Vinit", code: "adhar2" },
      { name: "Keshav", code: "adhar3" },
    ];
  }

}
