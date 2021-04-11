import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { Resource } from 'src/app/model/resource';
import { ResourceService } from 'src/app/service/resource.service';

@Component({
  selector: 'app-associate-view',
  templateUrl: './associate-view.component.html',
  styleUrls: ['./associate-view.component.css']
})
export class AssociateViewComponent implements OnInit {


  resources: Resource[];
    
  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  constructor(private primengConfig: PrimeNGConfig,
      private resourceService: ResourceService) { }

  ngOnInit() {
      this.resourceService.getResources().subscribe(data => {
          console.log('resource = ', data);
          this.resources = data;
      })

      this.sortOptions = [
          { label: 'Price High to Low', value: '!price' },
          { label: 'Price Low to High', value: 'price' }
      ];

      this.primengConfig.ripple = true;
  }

  onSortChange(event) {
      let value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      }
      else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }
  @Output() sendResourceEmitter = new EventEmitter();

  openTab(resource: Resource) {
      this.sendResourceEmitter.emit(resource);
  }
}
