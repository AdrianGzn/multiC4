import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDoctorComponent } from './user-doctor.component';

describe('UserDoctorComponent', () => {
  let component: UserDoctorComponent;
  let fixture: ComponentFixture<UserDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
