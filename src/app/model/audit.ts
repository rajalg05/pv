import { Job } from "./job";
import { Address } from "./address";

export class Audit { 

	public jobId: number;

	public address: Address;
	
	public auditStatus: string;
    
	public dateOfAudit: Date;

	public auditName: string;
    
	//public auditLocationAddressId: number;
    
	public statusUpdatedBy: string;
    
	public paymentReceived: number;
    
	public createdTs: Date;
    
	public updatedTs: Date;
}