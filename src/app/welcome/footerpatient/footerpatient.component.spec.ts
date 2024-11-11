import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterpatientComponent } from './footerpatient.component';

describe('FooterpatientComponent', () => {
  let component: FooterpatientComponent;
  let fixture: ComponentFixture<FooterpatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterpatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
