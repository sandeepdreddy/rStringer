import { TestBed, inject } from '@angular/core/testing';

import { StringerService } from './stringer.service';

describe('StringerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StringerService]
    });
  });

  it('should be created', inject([StringerService], (service: StringerService) => {
    expect(service).toBeTruthy();
  }));
});
