import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  public manpowerMaster: boolean = false;
  public associateMaster: boolean = false;
  public jobMaster: boolean = false;
  public jobAllocation: boolean = false;
  public costSheet: boolean = false;
  constructor() { }
}
