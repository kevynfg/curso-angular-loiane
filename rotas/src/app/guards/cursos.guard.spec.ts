import { TestBed } from '@angular/core/testing';

import { CursosGuard } from './cursos.guard';

describe('CursosGuardGuard', () => {
  let guard: CursosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CursosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
