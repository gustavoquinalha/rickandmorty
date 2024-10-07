import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterEpisodesCardComponent } from './character-episodes-card.component';

describe('CharacterEpisodesCardComponent', () => {
  let component: CharacterEpisodesCardComponent;
  let fixture: ComponentFixture<CharacterEpisodesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterEpisodesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterEpisodesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
