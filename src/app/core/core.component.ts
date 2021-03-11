import { Component, OnInit } from '@angular/core';
import { CoreService } from '../service/core.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {
 

  constructor(public _coreService: CoreService) { }

  ngOnInit(): void {
  }
  
}
