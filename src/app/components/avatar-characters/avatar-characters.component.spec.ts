import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarCharactersComponent } from './avatar-characters.component';

describe('AvatarCharactersComponent', () => {
  let component: AvatarCharactersComponent;
  let fixture: ComponentFixture<AvatarCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarCharactersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
