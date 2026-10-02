import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/services/data.service';
import { ClassOffering } from '../../shared/models/class.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  classes: ClassOffering[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.classes = this.dataService.getClasses();
  }
}
