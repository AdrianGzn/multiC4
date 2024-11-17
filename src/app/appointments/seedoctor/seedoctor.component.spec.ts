import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedoctorComponent } from './seedoctor.component';

describe('SeedoctorComponent', () => {
  let component: SeedoctorComponent;
  let fixture: ComponentFixture<SeedoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeedoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeedoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
