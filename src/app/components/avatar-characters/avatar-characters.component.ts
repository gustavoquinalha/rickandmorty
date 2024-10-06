import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Character } from '../../interface/characters';

@Component({
  selector: 'app-avatar-characters',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './avatar-characters.component.html',
  styleUrl: './avatar-characters.component.scss'
})
export class AvatarCharactersComponent {
  @Input() character?: Character;
}
