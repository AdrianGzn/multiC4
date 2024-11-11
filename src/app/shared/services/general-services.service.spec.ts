import { TestBed } from '@angular/core/testing';

import { GeneralServices } from './general-services.service';

describe('GeneralServicesService', () => {
  let service: GeneralServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
