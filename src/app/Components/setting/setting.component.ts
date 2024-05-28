import { Component } from '@angular/core';
import { Settings } from 'src/app/Models/settings';
import { SettingService } from 'src/app/Service/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent {
  settings: Settings = {} as Settings;
  message: string = '';
  daysOfWeek: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  constructor(private settingService: SettingService) {}

  createSettings() {
    this.settingService.creatSet(this.settings).subscribe(
      (response) => {
        console.log('Settings created successfully:', response);
        this.message = 'Settings Created Successfully!';
      },
      (error) => {
        console.error('Error creating settings:', error);
        this.message = 'Error Creating Settings!';
      }
    );
  }
}
