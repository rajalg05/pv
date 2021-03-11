import { Injectable } from '@angular/core';
import { JobMaster } from '../model/jobMaster';
import { ManPower } from '../model/manPower';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  public manpowerMaster: boolean = false;
  public associateMaster: boolean = false;
  public jobMaster: boolean = false;
  public jobAllocation: boolean = false;
  public costSheet: boolean = false;
  dataSourceManPower: ManPower[] = [];
  dataSourceJobMaster: JobMaster[] = [];
  constructor() { }
}
