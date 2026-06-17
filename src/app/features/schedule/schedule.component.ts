import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/services/data.service';
import { Schedule } from '../../shared/models/schedule.model';

@Component({
  selector: 'app-schedule',
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {
  schedules: Schedule[] = [];
  showModal = false;
  activeImage = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.schedules = this.dataService.getSchedules();
  }

  openModal(imagePath: string): void {
    this.activeImage = imagePath;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.activeImage = '';
  }
}
