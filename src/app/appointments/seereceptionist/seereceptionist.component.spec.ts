import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeereceptionistComponent } from './seereceptionist.component';

describe('SeereceptionistComponent', () => {
  let component: SeereceptionistComponent;
  let fixture: ComponentFixture<SeereceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeereceptionistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeereceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
