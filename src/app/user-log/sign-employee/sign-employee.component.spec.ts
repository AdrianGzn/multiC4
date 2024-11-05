import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignEmployeeComponent } from './sign-employee.component';

describe('SignEmployeeComponent', () => {
  let component: SignEmployeeComponent;
  let fixture: ComponentFixture<SignEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
