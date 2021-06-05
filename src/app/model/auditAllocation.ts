import { Audit } from "./audit";
import { Resource } from "./resource";

export class AuditAllocation {
     public audit: Audit;
     public resource: Resource;
     public allocatedAt: Date;
     public allocatedBy: String;
     public auditDate: Date;
     public auditDay: number;
     constructor() {}
}