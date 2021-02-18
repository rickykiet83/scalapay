import { TestBed } from '@angular/core/testing';

import { Routing.BaseService } from './routing.base.service';

describe('Routing.BaseService', () => {
  let service: Routing.BaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Routing.BaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
