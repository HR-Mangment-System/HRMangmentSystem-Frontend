import { AttendanceService } from './../../Service/attendance.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AlertComponent } from 'src/app/Pop up/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateAttendenceComponent } from 'src/app/Pop up/update-attendence/update-attendence.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-attendance-departure',
  templateUrl: './attendance-departure.component.html',
  styleUrls: ['./attendance-departure.component.css'],
})
export class AttendanceDepartureComponent implements OnInit {
  attendancereport: any;
  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialog,
    public AttendanceService: AttendanceService
  ) {}
  ngOnInit(): void {
    this.AttendanceService.getallAttendance().subscribe((data) => {
      this.attendancereport = data;
      console.log(this.attendancereport);
    });
  }

  @ViewChild('content', { static: false }) content!: ElementRef;
  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });

      const firstSheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[firstSheetName];

      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });

      const headers = jsonData[0];

      const formattedData = jsonData.slice(1).map((row) => {
        const formattedRow: any = {};
        headers.forEach((header: any, index: any) => {
          formattedRow[header] = row[index];
        });
        return formattedRow;
      });

      console.log(formattedData);
    };

    reader.readAsArrayBuffer(file);
  }

  SavePDF(): void {
    const table = this.content.nativeElement;
    table
      .querySelectorAll(`th:nth-child(${7}), td:nth-child(${7})`)
      .forEach((cell: HTMLElement) => {
        cell.style.display = 'none';
      });

    const doc = new jsPDF();
    autoTable(doc, { html: table });
    doc.save('table.pdf');
  }
  delete(id: number) {
    this.dialogRef.open(AlertComponent, {
      data: { id: id, alerttype: 'delete' },
    });
  }
  edit(data: any) {
    this.dialogRef.open(UpdateAttendenceComponent, {
      data: { report: data },
    });
  }
}
