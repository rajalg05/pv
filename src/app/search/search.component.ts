import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { Resource } from '../model/resource';
import { ResourceService } from '../service/resource.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

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
