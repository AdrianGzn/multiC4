import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardQuoteDoctorComponent } from './card-quote-doctor.component';

describe('CardQuoteDoctorComponent', () => {
  let component: CardQuoteDoctorComponent;
  let fixture: ComponentFixture<CardQuoteDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardQuoteDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardQuoteDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
