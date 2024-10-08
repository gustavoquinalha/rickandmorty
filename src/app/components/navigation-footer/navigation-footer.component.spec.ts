import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationFooterComponent } from './navigation-footer.component';

describe('NavigationFooterComponent', () => {
  let component: NavigationFooterComponent;
  let fixture: ComponentFixture<NavigationFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
