import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { Associate } from 'src/app/model/associateMaster';
import { AssociateService } from 'src/app/service/associate.service';

@Component({
    selector: 'app-associate-view',
    templateUrl: './associate-view.component.html',
    styleUrls: ['./associate-view.component.css']
})
export class AssociateViewComponent implements OnInit {

    associates: Associate[];

    @Input() associate: Associate; // sent from resource-form on submit to resource-master which in turn sent via Input so update resource[] 
    
    sortOptions: SelectItem[];

    sortOrder: number;

    sortField: string;

    @Output() openExistingAssociateTabEmitter = new EventEmitter();

    constructor(
        private primengConfig: PrimeNGConfig,
        private associateService: AssociateService) { }
        ngOnChanges(changes: SimpleChanges): void {
            if (this.associate)
              this.associates = [...this.associates, this.associate]; // update the Resource list tab when a new Resource is added in Resource form
          }
    ngOnInit() {
        this.associateService.findAllAssociates().subscribe(data => {
            console.log('associate = ', data);
            this.associates = data;
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
    openAssociateTab(associate: Associate) {
        this.openExistingAssociateTabEmitter.emit(associate);
    }
    deleteAssociate(associate) {
        this.associates = this.associates.filter(o => o !== associate);
        this.associateService.deleteAssociate(associate).subscribe(job => {
            console.log('associates deleted = ', associate);
        });
    }
}
