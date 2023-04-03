import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductItem } from '@xc/core/interfaces/product-item.interface';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProductsService {

    constructor(private readonly httpClient: HttpClient) {
    }

    fetchProducts$(count: number): Observable<ProductItem[]> {
        return this.httpClient.get<ProductItem[]>(`${environment.API_ENDPOINT}/products`,
            { params: new HttpParams().append('limit', count) });
    }

}
