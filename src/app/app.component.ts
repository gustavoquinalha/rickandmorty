import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationMenuComponent } from "./components/navigation-menu/navigation-menu.component";
import { NavigationFooterComponent } from './components/navigation-footer/navigation-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationMenuComponent, NavigationFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Rick and Morty';
}
