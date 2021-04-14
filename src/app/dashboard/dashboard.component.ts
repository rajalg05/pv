import { Component, OnInit } from '@angular/core';
import { Resource } from '../model/resource';
import { ResourceService } from '../service/resource.service';
import * as Chart from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  basicData: any;
    
  basicOptions: any;
  resources: Resource[] = [];
  responsiveOptions;
  constructor(resourceService: ResourceService) {  
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
    resourceService.getResources().subscribe(resources => {
    this.resources = resources;
    })
} 
ngOnInit() { 

  this.basicData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: '#42A5F5',
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: 'My Second dataset',
            backgroundColor: '#FFA726',
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};
}
 
  }

   
 