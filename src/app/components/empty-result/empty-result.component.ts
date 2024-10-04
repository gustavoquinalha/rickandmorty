import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empty-result',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './empty-result.component.html',
  styleUrl: './empty-result.component.scss'
})
export class EmptyResultComponent {
  @Input() icons?: string;
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() back?: boolean;
}
