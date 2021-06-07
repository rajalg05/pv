import { Job } from "./job";
import { Address } from "./address";
import { Resource } from "./resource";

export class Audit { 

	public id: number;
	
	public jobId: number;

	public jobName: string; // use it when new Audit tab is added from job-view 
	//public job: Job;
	
	public address: Address;
	
	public auditStatus: string;
    
	public datesOfAudits: string;

	public auditName: string;
    
	//public auditLocationAddressId: number;
    
	public statusUpdatedBy: string;
    
	public paymentReceived: number;
    
	public createdTs: Date;
    
	public updatedTs: Date;

	allocatedResources: Resource[] = [];

	unAllocatedResources: Resource[] = [];
}