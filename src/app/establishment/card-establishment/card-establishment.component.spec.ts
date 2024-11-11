import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEstablishmentComponent } from './card-establishment.component';

describe('CardEstablishmentComponent', () => {
  let component: CardEstablishmentComponent;
  let fixture: ComponentFixture<CardEstablishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardEstablishmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEstablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
