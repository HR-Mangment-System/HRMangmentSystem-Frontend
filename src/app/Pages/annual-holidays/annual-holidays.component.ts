import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { retry } from 'rxjs';
import { HolidayService } from 'src/app/Service/annual-holidays.service';


@Component({
  selector: 'app-annual-holidays',
  templateUrl: './annual-holidays.component.html',
  styleUrls: ['./annual-holidays.component.css']
})
export class AnnualHolidaysComponent implements OnInit{
  holidayName: string = '';
  holidayDate: string = '';
  Holidays: any=[];
  
  constructor(private holidayService: HolidayService) { }
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
    this.GetHolidays();
  }


  // Get
  GetHolidays() {
    this.holidayService.GetHolidays().subscribe((res: any) => {
      this.Holidays = res.data; 
      console.log('Holidays after GetHolidays:', this.Holidays);
    }, error => {
      console.error('Error fetching holidays:', error);
    });
  }
  

  // Post
  createHoliday() {
    if (this.formHoliday.valid) {
      this.holidayService.createHoliday(this.holidayName, this.holidayDate).subscribe(res => {
      console.log(res);
      });
      this.formHoliday.reset();
    }
  }
}
