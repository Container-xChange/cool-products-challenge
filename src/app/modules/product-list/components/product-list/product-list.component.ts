import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, shareReplay, startWith, Subject, switchMap } from 'rxjs';
import { ProductItem } from '@xc/core/interfaces/product-item.interface';
import { loadedResourceError, loadedResourceSuccess, loadResource, Resource } from '@xc/core/interfaces/resource.interface';
import { ProductsService } from '@xc/core/services/products.service';

@Component({
    selector: 'xc-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, OnChanges {

    @Input() count!: number;

    productsResource$!: Observable<Resource<ProductItem[]>>;

    private readonly fetchProductsResources$: Subject<number> = new BehaviorSubject(this.count);

    constructor(private readonly productsService: ProductsService) {
    }

    ngOnInit(): void {
        this.initSubscriptions();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['count']) {
            this.fetchProductsResources$.next(changes['count'].currentValue);
        }
    }

    private initSubscriptions(): void {
        this.productsResource$ = this.fetchProductsResources$.pipe(
            switchMap((count) => this.productsService.fetchProducts$(count).pipe(
                    map((items) => loadedResourceSuccess(items)),
                    catchError(() => of(loadedResourceError<ProductItem[]>())),
                    startWith(loadResource<ProductItem[]>())
                )
            ),
            shareReplay(1)
        );
    }
}
