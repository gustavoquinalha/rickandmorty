import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarActionsComponent } from './topbar-actions.component';

describe('TopbarActionsComponent', () => {
  let component: TopbarActionsComponent;
  let fixture: ComponentFixture<TopbarActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbarActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopbarActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
