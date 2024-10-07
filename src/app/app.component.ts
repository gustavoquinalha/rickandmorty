import { Component, Renderer2 } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { NavigationMenuComponent } from "./components/navigation-menu/navigation-menu.component";
import { NavigationFooterComponent } from './components/navigation-footer/navigation-footer.component';
import { ViewportScroller } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationMenuComponent, NavigationFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Rick and Morty';
  private routeSubscription: Subscription = new Subscription();

  constructor(private router: Router, private viewportScroller: ViewportScroller, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.renderer.removeClass(document.body, 'pb-16');
        if (event.url === '/' || event.url.includes('/episode/') || event.url.includes('/location/') || event.url.includes('/character/')) {
          this.renderer.addClass(document.body, 'pb-16');
        }
      }

      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
