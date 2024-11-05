import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEstablishmentComponent } from './search-establishment.component';

describe('SearchEstablishmentComponent', () => {
  let component: SearchEstablishmentComponent;
  let fixture: ComponentFixture<SearchEstablishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchEstablishmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEstablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
