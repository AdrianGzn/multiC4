import { TestBed } from '@angular/core/testing';

import { GeolacationService } from './geolacation.service';

describe('GeolacationService', () => {
  let service: GeolacationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolacationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
