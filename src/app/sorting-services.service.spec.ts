import { TestBed } from '@angular/core/testing';

import { SortingServicesService } from './sorting-services.service';

describe('SortingServicesService', () => {
  let service: SortingServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
