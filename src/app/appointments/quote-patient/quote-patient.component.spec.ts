import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotePatientComponent } from './quote-patient.component';

describe('QuotePatientComponent', () => {
  let component: QuotePatientComponent;
  let fixture: ComponentFixture<QuotePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuotePatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
