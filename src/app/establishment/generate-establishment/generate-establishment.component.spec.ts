import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateEstablishmentComponent } from './generate-establishment.component';

describe('GenerateEstablishmentComponent', () => {
  let component: GenerateEstablishmentComponent;
  let fixture: ComponentFixture<GenerateEstablishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateEstablishmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateEstablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
