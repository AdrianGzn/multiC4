import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartslandingComponent } from './cartslanding.component';

describe('CartslandingComponent', () => {
  let component: CartslandingComponent;
  let fixture: ComponentFixture<CartslandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartslandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartslandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
