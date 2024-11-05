import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeReceptionistComponent } from './welcome-receptionist.component';

describe('WelcomeReceptionistComponent', () => {
  let component: WelcomeReceptionistComponent;
  let fixture: ComponentFixture<WelcomeReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeReceptionistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
