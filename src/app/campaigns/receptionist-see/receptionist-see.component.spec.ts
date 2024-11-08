import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistSeeComponent } from './receptionist-see.component';

describe('ReceptionistSeeComponent', () => {
  let component: ReceptionistSeeComponent;
  let fixture: ComponentFixture<ReceptionistSeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceptionistSeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
