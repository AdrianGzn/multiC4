import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartpatientComponent } from './cartpatient.component';

describe('CartpatientComponent', () => {
  let component: CartpatientComponent;
  let fixture: ComponentFixture<CartpatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartpatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
