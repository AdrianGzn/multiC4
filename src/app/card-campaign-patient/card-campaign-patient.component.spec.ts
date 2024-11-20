import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCampaignPatientComponent } from './card-campaign-patient.component';

describe('CardCampaignPatientComponent', () => {
  let component: CardCampaignPatientComponent;
  let fixture: ComponentFixture<CardCampaignPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardCampaignPatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCampaignPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
