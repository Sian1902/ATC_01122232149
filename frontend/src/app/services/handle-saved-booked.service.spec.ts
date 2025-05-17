import { TestBed } from '@angular/core/testing';

import { HandleSavedBookedService } from './handle-saved-booked.service';

describe('HandleSavedBookedService', () => {
  let service: HandleSavedBookedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleSavedBookedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
