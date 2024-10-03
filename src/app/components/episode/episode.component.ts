import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-episode',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.scss'
})
export class EpisodeComponent {
  episodeId: any;
  episode?: any;
  maxLocation = 126;
  constructor(
    private route: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.episodeId = Number(params.get('id'));
      console.log('episodeId', this.episodeId);

      this.rickAndMortyService.getEpisodeById(this.episodeId!).subscribe((episode) => {
        console.log('episode', episode);
        this.episode = episode;
      });
    });
  }

  goToPreviousEpisode() {
    if (this.episodeId > 1) {
      this.router.navigate(['/episode', Number(this.episodeId) - 1]);
    }
  }

  goToNextEpisode() {
    if (this.episodeId) {
      this.router.navigate(['/episode', Number(this.episodeId) + 1]);
    }
  }

}
