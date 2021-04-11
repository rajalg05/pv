import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Injectable, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { TabView } from 'primeng/tabview'; 
import { CoreService } from '../service/core.service';
import { ManPower } from '../model/manPower';
import { JobMaster } from '../model/jobMaster';
import { Associate } from '../model/associateMaster';

@Component({
  selector: 'app-associate-master',
  templateUrl: './associate-master.component.html',
  styleUrls: ['./associate-master.component.css'],
  providers:[MessageService]
})
export class AssociateComponent implements OnInit {
  
  storeData: any;
  condition: boolean;
  csvData: any;
  fileUploaded: File;
  uploadedFiles: any[] = [];
  worksheet: any;
  displayedColumns: string[] = ['education', 'excelSkills', 'TLNonTL', 'city', 'state', 'frequency', 'tlPune', 'tlMumbai', 'tlOthers', 'auditStatus'];
  searchValue: any;
  public items = [];
  public selectedTabIndex: number = 0;
  associate: Associate;
  @ViewChild(TabView) tabView: TabView;

  constructor(public _coreService: CoreService,
    private messageService: MessageService,
    private viewContainerRef: ViewContainerRef,
    private cd: ChangeDetectorRef,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.items.push({
      'header': 'Associates',
      'content': 'List of All Associates'
    });
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    /* wire up file reader */
    if (event.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(event.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      wb.SheetNames.forEach(wsname => {
        this.populateDataSource(wb, wsname);
      });
    };
    this.messageService.add({ severity: 'info', summary: 'File Selected', detail: '' });
  }

  uploadFile() {
    this.csvData = XLSX.utils.sheet_to_csv(this.worksheet);

    const data: Blob = new Blob([this.csvData], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(data, "CSVFile" + new Date().getTime() + '.csv');
  }
  populateDataSource(wb: XLSX.WorkBook, wsname: string) {
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    switch (wsname) {
      case 'Manpower': {
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        /* save data */
        const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
        this._coreService.dataSourceManPower = data as ManPower[];
        console.log(this._coreService.dataSourceManPower); // Data will be logged in array format containing objects
        break;
      }

      case 'ManpowerMaster': {
        break;
      }

      case 'Associate': {
        break;
      }
      case 'JobMaster': {
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        /* save data */
        const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
        this._coreService.dataSourceJobMaster = data as JobMaster[];
        console.log(this._coreService.dataSourceJobMaster); // Data will be logged in array format containing objects
        break;
      }

      case 'CostSheet': {
        break;
      }
    }
  }

  onRowEditInit(manPower: ManPower) {
  }

  onRowEditSave(manPower: ManPower) {
    /*  if (product.price > 0) {
         delete this.clonedProducts[product.id]; */
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'ManPower is updated' });
    /*  }  
     else { */
    /* this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
} */
  }

  onRowEditCancel(manPower: ManPower, index: number) {
    /* this.products2[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id]; */
  }

  handleClose(e) {
    //if (this.condition)
    if(e.index != 0) {
      e.close();
      this.items.splice(e.index, 1);
    }
  }

  addTab() {
  let index: number = this.items.findIndex(x => x.header === "New Associate");
   if (index == -1 )
      this.items.push({
        'header': 'New Associate',
        'content': 'Content of New Associate'
      }); 
      this.selectedTabIndex = this.items.length - 1;
  }

  public tabNameChangeEmit(data: any): void {
    // console.log('data =' , data);
    let index: number = this.items.findIndex(x => x.header === "New Associate");
    this.items[index]['header'] = data;
  }
  public receiveAssociate(associate: Associate) {
    this.items.push({
      'header': associate.basicContactDetail.firstName
    });
    this.selectedTabIndex = this.items.length - 1;
    console.log('associate sent from List view tab = ', associate)
    this.associate = associate;
  }

}
