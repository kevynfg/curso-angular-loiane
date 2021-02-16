import { TestBed } from '@angular/core/testing';

import { AlunoDetalheResolver } from './aluno-detalhe.resolver';

describe('AlunoDetalhe.ResolverGuard', () => {
  let guard: AlunoDetalheResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AlunoDetalheResolver);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
