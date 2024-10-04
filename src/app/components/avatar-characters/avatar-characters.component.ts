import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-avatar-characters',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './avatar-characters.component.html',
  styleUrl: './avatar-characters.component.scss'
})
export class AvatarCharactersComponent {
  @Input() avatar?: any;
}
