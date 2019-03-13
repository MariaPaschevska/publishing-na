import { TestBed } from '@angular/core/testing';

import { UiDispatcherService } from './ui-dispatcher.service';

describe('UiDispatcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UiDispatcherService = TestBed.get(UiDispatcherService);
    expect(service).toBeTruthy();
  });
});
