import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductsManualService } from '@xc/core/services/products-manual.service';
import { ProductManualFormModel } from '@xc/core/interfaces/product-manual-form.interface';
import { toProductItem } from '@xc/core/mappers/product-manual.mapper';
import {
    BehaviorSubject,
    catchError,
    concatMap,
    filter,
    first,
    from,
    map,
    Observable,
    of,
    shareReplay,
    startWith,
    Subject,
    switchMap
} from 'rxjs';
import { ProductItem } from '@xc/core/interfaces/product-item.interface';
import { ProductManualModalUiService } from '@xc/modules/product-manual-modal/services/product-manual-modal-ui.service';
import { loadedResourceError, loadedResourceSuccess, loadResource, Resource } from '@xc/core/interfaces/resource.interface';
import { ActivatedRoute } from '@angular/router';
import { ProductsRatePermissionService } from '@xc/core/services/products-rate-permission.service';

@Component({
    selector: 'xc-product-manual-list',
    templateUrl: './product-manual-list.component.html',
    styleUrls: ['./product-manual-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductManualListComponent implements OnInit {

    productsResource$!: Observable<Resource<ProductItem[]>>;

    private readonly fetchProductsResources$: Subject<void> = new BehaviorSubject(undefined as void);

    constructor(
        public readonly route: ActivatedRoute,
        public readonly ratePermissionService: ProductsRatePermissionService,
        private readonly productsManualService: ProductsManualService,
        private readonly productManualModalUiService: ProductManualModalUiService
    ) {}

    ngOnInit(): void {
        this.initSubscriptions();
    }

    addProduct(): void {
        this.productManualModalUiService.load()
            .pipe(
                switchMap((ref) => ref.send$),
                concatMap((product) => this.productsResource$.pipe(
                        filter((resource) => resource.isLoaded),
                        first(),
                        map(({ data }) => ({ id: data?.length ? +data[data.length - 1].id + 1 : 1, product }))
                    )
                )
            )
            .subscribe(({ id, product }) => this.add(id, product));
    }

    deleteProduct(id: number) {
        this.productsManualService.delete(id)
            .then(() => this.refresh())
            .catch((error) => console.error(ProductManualListComponent.name, 'could not delete manual product', error));
    }

    trackBy(_: number, product: ProductItem): number {
        return product.id;
    }

    private add(id: number, product: ProductManualFormModel): void {
        this.productsManualService.add(toProductItem(product, id))
            .then(() => this.refresh())
            .catch((error) => console.error(ProductManualListComponent.name, 'could not add manual product', error));
    }

    private refresh(): void {
        this.fetchProductsResources$.next();
    }

    private initSubscriptions(): void {
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
