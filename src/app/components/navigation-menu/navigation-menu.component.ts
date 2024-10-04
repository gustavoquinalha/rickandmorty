import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
  selectedTheme = 'dark';
  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme-rickandmorty');
    if (savedTheme) {
      this.onThemeSelect(savedTheme);
    }
  }

  onThemeSelect(value: string): void {
    this.selectedTheme = value;
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('light', 'dark', 'pickle-rick', 'rick-and-morty');
    htmlElement.classList.add(this.selectedTheme);
    localStorage.setItem('theme-rickandmorty', this.selectedTheme);
  }
}
