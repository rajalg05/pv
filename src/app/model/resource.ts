import { Address } from "./address";
import { BasicContactDetail } from "./BasicContactDetail";
import { KYC } from "./kyc";

export class Resource {
    public constructor() {} 

	public  basicContactDetail: BasicContactDetail ;  
	
	public  kyc: KYC;
	
	public  address: Address;
	
	public  dateOfBirth: Date;
	
	public  qualification: string;
	
	public  excelSkills: string;
	
	public  stockAuditExp: string;
	
	public  resourceType: string;

	public  bike: string;
	
	public  createdTs; Date;
	
	public  updatedTs: Date;

    
}