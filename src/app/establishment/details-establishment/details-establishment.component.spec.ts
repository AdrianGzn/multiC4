import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEstablishmentComponent } from './details-establishment.component';

describe('DetailsEstablishmentComponent', () => {
  let component: DetailsEstablishmentComponent;
  let fixture: ComponentFixture<DetailsEstablishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsEstablishmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsEstablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
