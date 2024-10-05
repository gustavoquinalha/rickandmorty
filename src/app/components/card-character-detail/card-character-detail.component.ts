import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card-character-detail.component.html',
  styleUrl: './card-character-detail.component.scss'
})
export class CardCharacterDetailComponent {
  @Input() character?: any;
}
