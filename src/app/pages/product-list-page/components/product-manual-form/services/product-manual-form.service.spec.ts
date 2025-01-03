import { TestBed } from '@angular/core/testing';

import { ProductManualFormService } from './product-manual-form.service';

describe('ProductManualFormService', () => {
  let service: ProductManualFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductManualFormService]
    });
    service = TestBed.inject(ProductManualFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
