import { Associate } from "./associateMaster";

export class Job {
  public associate: Associate;

	public jobName: string;
	
	public clientName: number;

	public frequencyOfAudit: string;

	public paymentType: string;

	public totalPayment: number;

	public resourcesNeeded: number;

	public createdTs: Date;

	public updatedTs: Date;
  }