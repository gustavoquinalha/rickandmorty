import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCharacterDetailComponent } from './card-character-detail.component';

describe('CardCharacterDetailComponent', () => {
  let component: CardCharacterDetailComponent;
  let fixture: ComponentFixture<CardCharacterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCharacterDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCharacterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
