import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.scss'
})
export class NavigationMenuComponent {
  onThemeSelect(event: Event): void {
    const selectedTheme = (event.target as HTMLSelectElement).value;
    const htmlElement = document.documentElement;

    if (selectedTheme === 'light') {
      htmlElement.classList.remove('dark');
      htmlElement.classList.remove('pickle-rick');
      htmlElement.classList.add('light');
    } else if (selectedTheme === 'dark') {
      htmlElement.classList.remove('light');
      htmlElement.classList.remove('pickle-rick');
      htmlElement.classList.add('dark');
    } else if (selectedTheme === 'pickle-rick') {
      htmlElement.classList.remove('light');
      htmlElement.classList.remove('dark');
      htmlElement.classList.add('pickle-rick');
    }
  }
}
