import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ManPower } from '../model/manPower';
import { CoreService } from '../service/core.service';
import { JobMaster } from '../model/jobMaster';

@Component({
  selector: 'app-man-power',
  templateUrl: './man-power.component.html',
  styleUrls: ['./man-power.component.css']
})
export class ManPowerComponent implements OnInit {
  storeData: any;
  csvData: any;
  fileUploaded: File;
  worksheet: any; 
  displayedColumns: string[] = ['education', 'excelSkills', 'TLNonTL', 'city', 'state', 'frequency', 'tlPune', 'tlMumbai', 'tlOthers', 'auditStatus'];
  constructor(public _coreService: CoreService) { }

  ngOnInit(): void {
  }


  uploadedFile(files) {
    /* wire up file reader */
    if (files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      wb.SheetNames.forEach(wsname => {
        this.populateDataSource(wb, wsname);
      });



    };
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

      case 'AssociateMaster': {
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
}


