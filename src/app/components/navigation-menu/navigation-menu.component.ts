import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.scss'
})
export class NavigationMenuComponent {
  onThemeSelect(event: Event): void {
    const selectedTheme = (event.target as HTMLSelectElement).value;
    const htmlElement = document.documentElement;

    if (selectedTheme === 'light') {
      htmlElement.classList.remove('dark');
      htmlElement.classList.add('light');
    } else if (selectedTheme === 'dark') {
      htmlElement.classList.remove('light');
      htmlElement.classList.add('dark');
    }
  }
}
