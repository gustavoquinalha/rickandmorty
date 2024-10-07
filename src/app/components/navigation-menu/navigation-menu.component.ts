import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Theme } from '../../interface/characters';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule],
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})

export class NavigationMenuComponent implements OnInit {
  selectedTheme: Theme = {
    name: "DARK",
    value: "dark",
    icon: "🌑",
  };

  themes: Theme[] = [
    {
      name: "DARK",
      value: "dark",
      icon: "🌑",
    },
    {
      name: "LIGHT",
      value: "light",
      icon: "☀️",
    },
    {
      name: "RICK_AND_MORTY",
      value: "pickle-rick",
      icon: "🥒",
    },
    {
      name: "PICKLE_RICK",
      value: "rick-and-morty",
      icon: "👩‍🚀",
    },
  ]

  selectedLang = {
    name: 'INGLES',
    value: 'en',
    icon: '🇺🇸'
  };

  langs = [
    { name: 'INGLES', value: 'en', icon: '🇺🇸' },
    { name: 'PORTUGUES', value: 'pt', icon: '🇧🇷' },
    { name: 'ESPANHOL', value: 'es', icon: '🇪🇸' },
    { name: 'JAPONES', value: 'ja', icon: '🇯🇵' }
  ];

  constructor(private translate: TranslateService) { }
  ngOnInit(): void {
    this.initializeTheme();
    this.initializeLanguage();
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme-rickandmorty');
    if (savedTheme) {
      this.onThemeSelect(JSON.parse(savedTheme));
    }
  }

  private initializeLanguage(): void {
    const savedLang = localStorage.getItem('lang-rickandmorty');
    if (savedLang) {
      this.changeLanguage(JSON.parse(savedLang));
    } else {
      this.changeLanguage(this.selectedTheme);
    }
  }

  onThemeSelect(value: Theme): void {
    this.selectedTheme = value;
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('light', 'dark', 'pickle-rick', 'rick-and-morty');
    htmlElement.classList.add(this.selectedTheme.value);
    localStorage.setItem('theme-rickandmorty', JSON.stringify(this.selectedTheme));
  }

  changeLanguage(lang: { name: string, value: string, icon: string }) {
    this.selectedLang = lang;
    this.translate.use(lang.value);

    localStorage.setItem('lang-rickandmorty', JSON.stringify(this.selectedLang));
  }
}
