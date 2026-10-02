import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/services/data.service';
import { Announcement } from '../../shared/models/announcement.model';

@Component({
  selector: 'app-announcements',
  imports: [CommonModule],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.css'
})
export class AnnouncementsComponent implements OnInit {
  announcements: Announcement[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.announcements = this.dataService.getAnnouncements();
  }
}
