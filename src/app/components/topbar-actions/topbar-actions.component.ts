import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-topbar-actions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './topbar-actions.component.html',
  styleUrl: './topbar-actions.component.scss'
})
export class TopbarActionsComponent {

  constructor(private router: Router) { }

  @Input() type?: string;
  @Input() id: number = 0;
  @Input() maxId: number = 0;

  goToPrevious() {
    if (this.id > 1) {
      this.router.navigate([`/${this.type}`, Number(this.id) - 1]);
    }
  }

  goToNext() {
    if (this.id < this.maxId) {
      this.router.navigate([`/${this.type}`, Number(this.id) + 1]);
    }
  }
}
