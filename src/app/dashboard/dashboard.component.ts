import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Audit } from '../model/audit';
import { Resource } from '../model/resource';
import { AuditService } from '../service/audit.service';
import { ResourceService } from '../service/resource.service';
//import calendarevents from '../../assets/calendarevents';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: []
})
export class DashboardComponent implements OnInit {
  basicData: any;

  basicOptions: any;
  resources: Resource[] = [];
  responsiveOptions;

  // full calendar fields
  events: any[];

  options: any;
  // table data 

  audits: Audit[] = [];

  selectedAudits: Audit[] = [];

  private subscriptionResource: any = null;

  private subscriptionAudit: any = null;

  statuses: any[];

  loading: boolean = false;

  @ViewChild('dt') table: Table;

  activityValues: number[] = [0, 100];
  
  list1: Resource[] = [];

  list2: Resource[] = [];

  showPickList: boolean = false;

  constructor(resourceService: ResourceService,
    private primengConfig: PrimeNGConfig,
    private auditService: AuditService) {

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
    this.subscriptionResource = resourceService.getResources().subscribe(resources => {
      this.resources = resources;
      this.list1 = resources;
    },
    error => {
      console.log('error getResources : ', error)
    });

  }
  ngOnInit() {
    this.subscriptionAudit = this.auditService.findAllAudits().subscribe(audits => {
      this.audits = audits;
      this.loading = false
    },
    error => {
      console.log('error findAllAudits : ', error)
    });

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' }
    ]
    this.primengConfig.ripple = true;
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#FFA726',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    // full calendar events
    /* this.events = calendarevents.data;
    */
  }
  allocateResource(audit: Audit) {
    this.showPickList = true;
  }
  onActivityChange(event) {
    const value = event.target.value;
    if (value && value.trim().length) {
      const activity = parseInt(value);

      if (!isNaN(activity)) {
        this.table.filter(activity, 'activity', 'gte');
      }
    }
  }

  onDateSelect(value) {
    this.table.filter(this.formatDate(value), 'date', 'equals')
  }

  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }

  onRepresentativeChange(event) {
    this.table.filter(event.value, 'representative', 'in')
  }

  ngOnDestroy() {
    this.subscriptionResource.unsubscribe();
    this.subscriptionAudit.unsubscribe();
  }
}


