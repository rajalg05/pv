import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Audit } from '../model/audit';
import { AuditAllocation } from '../model/auditAllocation';
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

  sourceList: Resource[] = [];

  targetList: Resource[] = [];

  allocatedResources: number = 0;

  allocatedTLs: number = 0;

  unAllocatedResources: number = 0;

  unAllocatedTLs: number = 0;

  showPickList: boolean = false;
  allocatedAudits: AuditAllocation[] = [];

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
      this.sourceList = [...resources];
      this.updateResourceCount(resources);
    },
      error => {
        console.log('error getResources : ', error)
      });

    this.auditService.findAllAllocatedAudits().subscribe(allocatedAudits => {
      this.allocatedAudits = allocatedAudits;
      // Loop thru to create source list
      this.allocatedAudits.forEach(allocatedAudit => {
        this.sourceList.splice(this.resources.indexOf(allocatedAudit.resource), 1);
      });
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

  allocateResource(audit: Audit) {
    //this.list1 = [];
    if(audit.allocatedResources != null)
      this.targetList = audit.allocatedResources;
    else {
      this.targetList = [];
    }  
    this.showPickList = true;
    // loop through the source and target list 
    /* this.allocatedAudits.forEach(allocatedAudit => {
      if (allocatedAudit.audit['id'] == audit['id']) {
        this.targetList.push(allocatedAudit.resource);
      } else {
        this.sourceList.push(allocatedAudit.resource);
      }
    }); */
  }
  updateResourceCount(resources: Resource[]) {
    resources.forEach(r => {
      if (r.resourceType == 'TL') {
        this.unAllocatedTLs--;
        this.allocatedTLs++;
      } else if (r.resourceType == 'Non TL') {
        this.unAllocatedResources--;
        this.allocatedResources++;
      }
    });
  }
  //auditAllocations: AuditAllocation[] = [];
  saveAllocateAuditAndResource(audit: Audit) {
    let auditAllocations: AuditAllocation[] = [];
    this.targetList.forEach(selectedResource => {
      let auditAllocation: AuditAllocation = new AuditAllocation();
      auditAllocation.auditDate = audit.dateOfAudit;
      auditAllocation.audit = audit;
      auditAllocation.resource = selectedResource;
      // check if the Audit & Resource are already added in Audit Allocation
      let index: number = auditAllocations.findIndex(a => a.audit.auditName == audit.auditName
        && a.resource.basicContactDetail.firstName == selectedResource.basicContactDetail.firstName);

      if (index == -1)
        auditAllocations.push(auditAllocation);
    });

    this.auditService.allocateAudits(auditAllocations).subscribe(data => {
      console.log('allocateAudits response = ', data);
    });
  }

  onMoveToTarget(event) {
    console.log('event onMoveToTarget = ', event);
  }

  onMoveToSource(event) {
    console.log('event onMoveToSource = ', event);
  }
}




