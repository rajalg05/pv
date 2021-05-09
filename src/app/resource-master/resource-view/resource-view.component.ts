import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { Resource } from '../../model/resource';
import { ResourceService } from '../../service/resource.service';

@Component({
    selector: 'app-resource-view',
    templateUrl: './resource-view.component.html',
    styleUrls: ['./resource-view.component.css']
})
export class ResourceViewComponent implements OnInit, OnChanges {

    resources: Resource[];

    @Input() resource: Resource; // sent from resource-form on submit to resource-master which in turn sent via Input so update resource[] 

    sortOptions: SelectItem[];

    sortOrder: number;

    sortField: string;

    @Output() openExistingResourceTabEmitter = new EventEmitter();
    
    constructor(private primengConfig: PrimeNGConfig,
        private resourceService: ResourceService) { }
    ngOnChanges(changes: SimpleChanges): void {
        if(this.resource && this.resources) 
        this.resources = [...this.resources, this.resource]; // update the Resource list tab when a new Resource is added in Resource form
    }

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

    openTab(resource: Resource) {
        this.openExistingResourceTabEmitter.emit(resource);
    }

    deleteResource(resource: Resource) {
        this.resources = this.resources.filter(o => o!== resource);
        this.resourceService.deleteResource(resource).subscribe(data => {
            console.log('data = ', data);
        });
    }

}
