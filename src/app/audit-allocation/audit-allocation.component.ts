import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
export class AuditAllocationComponent implements OnInit, OnChanges {

  resources: Resource[] = [];

  events: any[];

  options: any;

  audits: Audit[] = [];

  selectedAudit: Audit;

  private subscriptionResource: any = null;

  private subscriptionAudit: any = null;

  statuses: any[];

  loading: boolean = false;

  @ViewChild('dt') table: Table;

  activityValues: number[] = [0, 100];

  sourceList: Resource[] = [];
  
  sourceListFiltered: Resource[] = [];

  targetList: Resource[] = [];

  allocatedResources: number = 0;

  allocatedTLs: number = 0;

  unAllocatedResources: number = 0;

  unAllocatedTLs: number = 0;

  showPickList: boolean = false;

  allocatedAudits: AuditAllocation[] = [];

  unAllocatedAudits: AuditAllocation[] = [];

  constructor(resourceService: ResourceService,
    private auditService: AuditService) {

    this.subscriptionResource = resourceService.unAllocatedResources().subscribe(resources => {
      this.resources = resources;
      this.sourceList = [...resources];
      this.updateResourceCount(resources);
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
  }
  ngOnChanges(changes: SimpleChanges): void {
    // TO DO - Audits newly created/added to job should be stacked here as well. 
    
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
    if(audit.allocatedResources != null)
      this.targetList = audit.allocatedResources;
    else {
      this.targetList = [];
    }  
    this.showPickList = true;
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
  saveAllocateAuditAndResource(resource: Resource) {
    let aa: AuditAllocation = new AuditAllocation();
    aa.resource = resource;
    aa.resource.allocated = 'true';
    aa.audit = this.selectedAudit;

    let saveAllocatedAudits: AuditAllocation[] = [];

    saveAllocatedAudits.push(aa);

    this.auditService.allocateAudits(saveAllocatedAudits).subscribe(data => {
      console.log('allocatedAudits response = ', data);
    });
    // let auditAllocations: AuditAllocation[] = [];
    // this.targetList.forEach(selectedResource => {
    //   let auditAllocation: AuditAllocation = new AuditAllocation();
    //   auditAllocation.auditDate = audit.dateOfAudit;
    //   auditAllocation.allocatedAt = new Date();
    //   auditAllocation.audit = audit;
    //   selectedResource.allocated = 'true'; 
    //   auditAllocation.resource = selectedResource;
    //   // check if the Audit & Resource are already added in Audit Allocation
    //   let index: number = auditAllocations.findIndex(a => a.audit.auditName == audit.auditName
    //     && a.resource.basicContactDetail.firstName == selectedResource.basicContactDetail.firstName);

    //   if (index == -1)
    //     auditAllocations.push(auditAllocation);
    // });

    // this.auditService.allocateAudits(auditAllocations).subscribe(data => {
    //   console.log('allocateAudits response = ', data);
    // });
  }
  deleteAudit(audit: Audit) {
    this.auditService.deleteAudit(audit).subscribe(data => {
      console.log('deleteAudit response = ', data);
      this.audits.splice(this.audits.indexOf(audit), 1);
    });
  }

  onMoveToTarget(event) {
    console.log('event onMoveToTarget = ', event);
    event.items.forEach(item => {
      this.saveAllocateAuditAndResource(item);
    });
  }

  onMoveToSource(event) {
    console.log('event onMoveToSource = ', event);
    event.items.forEach(item => {
      this.unAllocateAuditAndResource(item);  
    });
    
  }
  onRowSelect(event) {
    console.log('event.data onRowSelect = ', event.data);
   
  }
  unAllocateAuditAndResource(resource: Resource) {
    let aa: AuditAllocation = new AuditAllocation();
    aa.resource = resource;
    aa.resource.allocated = 'false';
    aa.audit = this.selectedAudit;

    this.unAllocatedAudits.push(aa);
    this.auditService.unallocateAudits(this.unAllocatedAudits).subscribe(data => {
      console.log('unAllocatedAudits response = ', data);
    });
  }
}
