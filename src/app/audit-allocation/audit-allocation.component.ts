import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Audit } from '../model/audit';
import { AuditAllocation } from '../model/auditAllocation';
import { Resource } from '../model/resource';
import { AuditService } from '../service/audit.service';
import { ResourceService } from '../service/resource.service';

@Component({
  selector: 'app-audit-allocation',
  templateUrl: './audit-allocation.component.html',
  styleUrls: ['./audit-allocation.component.css']
})
export class AuditAllocationComponent implements OnInit {

  resources: Resource[] = [];

  events: any[];

  options: any;
  // table data 

  audits: Audit[] = [];

  selectedAudit: Audit;

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
    private auditService: AuditService) {

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
    if(this.subscriptionResource != undefined)
      this.subscriptionResource.unsubscribe();

    if(this.subscriptionAudit != undefined)  
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
      auditAllocation.allocatedAt = new Date();
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
  deleteAudit(audit: Audit) {
    this.auditService.deleteAudit(audit).subscribe(data => {
      console.log('deleteAudit response = ', data);
      this.audits.splice(this.audits.indexOf(audit), 1);
    });
  }

  onMoveToTarget(event) {
    console.log('event onMoveToTarget = ', event);
  }

  onMoveToSource(event) {
    console.log('event onMoveToSource = ', event);
  }
  onRowSelect(event) {
    console.log('event onRowSelect = ', event);
  }
}