import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/services/data.service';
import { Coach } from '../../shared/models/coach.model';

@Component({
  selector: 'app-coaches',
  imports: [CommonModule],
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.css'
})
export class CoachesComponent implements OnInit {
  coaches: Coach[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.coaches = this.dataService.getCoaches();
  }
}
