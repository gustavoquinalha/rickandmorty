import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navigation-footer.component.html',
  styleUrl: './navigation-footer.component.scss'
})
export class NavigationFooterComponent {
  constructor() { }
}
