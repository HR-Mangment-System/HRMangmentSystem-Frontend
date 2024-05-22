import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { retry } from 'rxjs';
import { HolidayService } from 'src/app/Service/annual-holidays.service';
import { Holiday } from 'src/app/interfaces/Holiday';


@Component({
  selector: 'app-annual-holidays',
  templateUrl: './annual-holidays.component.html',
  styleUrls: ['./annual-holidays.component.css']
})
export class AnnualHolidaysComponent implements OnInit{
  Holidays: any=[];
  selectedHoliday!: Holiday;
  
  Holiday : Holiday = {
    holidayName: '',
    holidayDate: '',
    id: 0,
  };

  constructor(private holidayService: HolidayService, public router: Router) { }
  formHoliday = new FormGroup ({
  holidayName : new FormControl ("", [Validators.required,
                                      Validators.pattern("^[a-zA-Z ]"), 
                                      Validators.minLength(3),
                                      Validators.maxLength(50)]), 
  holidayDate : new FormControl ("", [Validators.required, 
    Validators.pattern("^[0-9]{4}-[0-9]{2}-[0-9]{2}$")])
  });


  get isholidayNameValid() : any {
    return this.formHoliday.controls.holidayName;
  } 

  get isholidayDateValid() : any {
    return this.formHoliday.controls.holidayDate;
  }


  ngOnInit(): void {
    console.log('Holidays GetHolidays:', this.Holidays);
    this.GetHolidays();
  }

  // Get
  GetHolidays() {
    this.holidayService.GetHolidays().subscribe ((res: any) => {
      this.Holidays = res.data; 
      console.log('Holidays after GetHolidays:', this.Holidays);
    }, error => {
      this.Holidays = [];
    });
  }


  // Post
  createHoliday(){
    this.holidayService.createHoliday(this.Holiday.holidayName, this.Holiday.holidayDate).subscribe((res: any) => {
      console.log('Holiday created:', res);
      this.GetHolidays();
    }, error => {
      console.error('Error creating holiday:', error);
    });
    this.formHoliday.reset();
    
  }
  // delete
  deleteHoliday(holidayId: number){
    this.holidayService.deleteHoliday(holidayId).subscribe((res: any) => {
      this.GetHolidays();
    
    }, error => {
      console.error('Error deleting holiday:', error);
    });
    
    
  }


  // update

  setUpdate(data:any){
    this.Holiday.holidayName = data.holidayName;
    this.Holiday.holidayDate = data.holidayDate;
    this.Holiday.id = data.id;
  }

  updateHoliday(){
    let bodydata = {
      "holidayName": this.Holiday.holidayName,
      "holidayDate": this.Holiday.holidayDate,
      "id": this.Holiday.id
    };
    this.holidayService.updateHoliday(bodydata).subscribe((res: any) => {
      this.GetHolidays();
      console.log('Holiday updated:', res);
    }, error => {
      console.error('Error updating holiday:', error);
    });
  }


  // save
  save() {
    if (this.Holiday?.id === 0) { 
      this.createHoliday();
    } else { 
      this.updateHoliday();
    }
    this.formHoliday.reset();
  }
}