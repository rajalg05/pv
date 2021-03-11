import { Component, OnInit } from '@angular/core';
import { CoreService } from '../service/core.service';

@Component({
  selector: 'app-job-master',
  templateUrl: './job-master.component.html',
  styleUrls: ['./job-master.component.css']
})
export class JobMasterComponent implements OnInit {

  constructor(public _coreService: CoreService) { }

  ngOnInit(): void {
  }

}
