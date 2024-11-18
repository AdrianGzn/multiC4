import { TestBed } from '@angular/core/testing';

import { ServiceAndEstablishmentDataService } from './service-and-establishment-data.service';

describe('ServiceAndEstablishmentDataService', () => {
  let service: ServiceAndEstablishmentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAndEstablishmentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
