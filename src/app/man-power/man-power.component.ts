import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ManPower } from '../model/manPower';

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
  dataSource: ManPower[] = [];
  displayedColumns: string[] = ['education', 'excelSkills', 'TLNonTL', 'city', 'state', 'frequency', 'tlPune', 'tlMumbai', 'tlOthers', 'auditStatus'];
  constructor() { }

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
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      this.dataSource = data as ManPower[];
      console.log(this.dataSource); // Data will be logged in array format containing objects
    };
  }

  uploadFile() {
    this.csvData = XLSX.utils.sheet_to_csv(this.worksheet);

    const data: Blob = new Blob([this.csvData], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(data, "CSVFile" + new Date().getTime() + '.csv');
  }
}
