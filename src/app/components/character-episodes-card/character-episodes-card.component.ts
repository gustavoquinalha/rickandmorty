import { Episode } from './../../interface/characters';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardEpisodeComponent } from '../card-episode/card-episode.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-character-episodes-card',
  standalone: true,
  imports: [CommonModule, RouterModule, CardEpisodeComponent],
  templateUrl: './character-episodes-card.component.html',
  styleUrl: './character-episodes-card.component.scss'
})
export class CharacterEpisodesCardComponent {
  @Input() episodes?: Episode[];
}
