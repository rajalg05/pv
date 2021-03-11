import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pv';
  public manpowerMaster: boolean = false;
  public associateMaster: boolean = false;
  public jobMaster: boolean = false;
  public jobAllocation: boolean = false;
  public costSheet: boolean = false;

  ngOnInit() {
    document.getElementById("mySidenav").style.display = "block";
  }
  loadChild(childPage:string) {
    switch(childPage) {
      case 'manpowerMaster': {
        this.manpowerMaster = true;
      }
      break;
      case 'associateMaster': {
        this.associateMaster = true;
      }
      break;
      case 'jobMaster': {
        this.jobMaster = true;
      }
      break;
      case 'jobAllocation': {
        this.jobAllocation = true;
      }
      break;
      case 'costSheet': {
        this.costSheet = true;
      }
      break;
    }
  }
}
