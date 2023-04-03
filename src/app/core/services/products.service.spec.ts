import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { first, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { productItemsMock } from '@xc/test/mocks/product-list.mock';

describe('ProductsService', () => {
    let service: ProductsService;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductsService]
        });
        service = TestBed.inject(ProductsService);
        httpClient = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should request fake store api with the provided count limit', (done) => {
        const count = 10;
        const getSpy = jest.spyOn(httpClient, 'get').mockReturnValue(of(productItemsMock()));
        service.fetchProducts$(count).pipe(first())
            .subscribe((response) => {
                expect(response).toEqual(productItemsMock());
                expect(getSpy).toHaveBeenCalledWith('https://fakestoreapi.com/products',
                    { params: new HttpParams().append('limit', count) });
                done();
            });
    });
});
