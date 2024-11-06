import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderReceptionistComponent } from './header-receptionist.component';

describe('HeaderReceptionistComponent', () => {
  let component: HeaderReceptionistComponent;
  let fixture: ComponentFixture<HeaderReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderReceptionistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
