import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-empty-result',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './empty-result.component.html',
  styleUrl: './empty-result.component.scss'
})
export class EmptyResultComponent {
  @Input() icons?: string;
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() back?: boolean;
  @Input() fullScreen?: boolean = true;
}
