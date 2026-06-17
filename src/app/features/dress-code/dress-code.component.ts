import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dress-code',
  imports: [CommonModule],
  templateUrl: './dress-code.component.html',
  styleUrl: './dress-code.component.css'
})
export class DressCodeComponent {
  girlsDressCode = [
    'Any fitted leotard or tank top',
    'Spandex/fitted shorts or leggings',
    'No watches, bulky jewelry, dangle earrings, etc.'
  ];

  boysDressCode = [
    'Tight fitting shirts',
    'Fitted shorts or pants without buttons',
    'No watches, bulky jewelry, dangle earrings, etc.'
  ];

  hairGuidelines = [
    'All athletes hair should be pulled away from face at all times during class',
    'Hair must be secured in a placement that allows safe execution of rolls',
    'No bulky buns (causes athlete pain during rolls)',
    'Hair tie charge applied if child does not comply consistently'
  ];
}
