import { TestBed } from '@angular/core/testing';

import { ListaItemsService } from './lista-items.service';

describe('ListaItemsService', () => {
  let service: ListaItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
