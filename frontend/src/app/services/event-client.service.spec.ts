import { TestBed } from '@angular/core/testing';

import { EventClientService } from './event-client.service';

describe('EventClientService', () => {
  let service: EventClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
