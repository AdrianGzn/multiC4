import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSeeComponent } from './user-see.component';

describe('UserSeeComponent', () => {
  let component: UserSeeComponent;
  let fixture: ComponentFixture<UserSeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
