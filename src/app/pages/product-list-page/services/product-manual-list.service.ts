import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, of, shareReplay, startWith, Subject, switchMap } from 'rxjs';
import { loadedResourceError, loadedResourceSuccess, loadResource, Resource } from '../../../core/interfaces/resource.interface';
import { ProductItem } from '../interfaces/product-item.interface';
import { ProductsManualService } from '../../../core/services/products-manual.service';
import { ProductManualModalUiService } from '../modules/product-manual-modal/services/product-manual-modal-ui.service';
import { ProductManualFormModel } from '../interfaces/product-manual-form.interface';
import { toProductItem } from '../mappers/product-manual.mapper';

@Injectable()
export class ProductManualListService {

    productsResource$!: Observable<Resource<ProductItem[]>>;

    private readonly fetchProductsResources$: Subject<void> = new BehaviorSubject(undefined as void);

    constructor(
        private readonly productsManualService: ProductsManualService<ProductItem>,
        private readonly productManualModalUiService: ProductManualModalUiService
    ) {
        this.initObservables();
    }

    addProduct(): void {
        this.productManualModalUiService.load()
            .pipe(
                switchMap((ref) => ref.send$),
                map((product) => ({ id: Math.random(), product }))
            )
            .subscribe(({ id, product }) => this.add(id, product));
    }

    private add(id: number, product: ProductManualFormModel): void {
        this.productsManualService.add(toProductItem(product, id))
            .then(() => this.refresh())
            .catch((error) => console.error(ProductManualListService.name, 'could not add manual product', error));
    }

    private refresh(): void {
        this.fetchProductsResources$.next();
    }

    private initObservables(): void {
        this.productsResource$ = this.fetchProductsResources$.pipe(
            switchMap(() => from(this.productsManualService.getAll()).pipe(
                    map((items) => loadedResourceSuccess(items)),
                    catchError(() => of(loadedResourceError<ProductItem[]>())),
                    startWith(loadResource<ProductItem[]>())
                )
            ),
            shareReplay(1)
        );
    }
}
