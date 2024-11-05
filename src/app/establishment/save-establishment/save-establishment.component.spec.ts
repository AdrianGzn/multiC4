import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEstablishmentComponent } from './save-establishment.component';

describe('SaveEstablishmentComponent', () => {
  let component: SaveEstablishmentComponent;
  let fixture: ComponentFixture<SaveEstablishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveEstablishmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveEstablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
