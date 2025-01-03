import { TestBed } from '@angular/core/testing';

import { ProductManualListService } from './product-manual-list.service';
import { ProductManualModalUiService } from '../modules/product-manual-modal/services/product-manual-modal-ui.service';
import { ProductsManualService } from '../../../core/services/products-manual.service';
import { ProductsManualDbNameToken, ProductsManualStoreNameToken } from '../../../core/injectors/products-manual-db.injector';

describe('ProductManualListService', () => {
    let service: ProductManualListService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProductManualListService,
                ProductManualModalUiService,
                ProductsManualService,
                {
                    provide: ProductsManualDbNameToken,
                    useValue: 'productDB'
                },
                {
                    provide: ProductsManualStoreNameToken,
                    useValue: 'products'
                }
            ]
        });
        service = TestBed.inject(ProductManualListService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
