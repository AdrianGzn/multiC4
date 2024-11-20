import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartspatientComponent } from './cartspatient.component';

describe('CartspatientComponent', () => {
  let component: CartspatientComponent;
  let fixture: ComponentFixture<CartspatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartspatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartspatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
