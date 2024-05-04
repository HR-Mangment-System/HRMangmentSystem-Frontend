import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-attendance-departure',
  templateUrl: './attendance-departure.component.html',
  styleUrls: ['./attendance-departure.component.css'],
})
export class AttendanceDepartureComponent {
  constructor() { }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });

      const firstSheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[firstSheetName];

      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Extract column headers from the first row
      const headers = jsonData[0];

      // Convert the rest of the rows into objects with keys from column headers
      const formattedData = jsonData.slice(1).map(row => {
        const formattedRow: any = {};
        headers.forEach((header:any, index:any) => {
          formattedRow[header] = row[index];
        });
        return formattedRow;
      });

      console.log(formattedData);
    };

    reader.readAsArrayBuffer(file);
  }
}
