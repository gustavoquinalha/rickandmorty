import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Location } from '../../interface/characters';

@Component({
  selector: 'app-card-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card-location.component.html',
  styleUrl: './card-location.component.scss'
})
export class CardLocationComponent {
  @Input() location?: Location;
  @Input() showTitle?: boolean = true;
}
