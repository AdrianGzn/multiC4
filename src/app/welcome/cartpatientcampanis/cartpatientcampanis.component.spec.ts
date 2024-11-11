import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartpatientcampanisComponent } from './cartpatientcampanis.component';

describe('CartpatientcampanisComponent', () => {
  let component: CartpatientcampanisComponent;
  let fixture: ComponentFixture<CartpatientcampanisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartpatientcampanisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartpatientcampanisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
