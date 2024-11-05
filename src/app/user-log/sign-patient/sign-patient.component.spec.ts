import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignPatientComponent } from './sign-patient.component';

describe('SignPatientComponent', () => {
  let component: SignPatientComponent;
  let fixture: ComponentFixture<SignPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignPatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
