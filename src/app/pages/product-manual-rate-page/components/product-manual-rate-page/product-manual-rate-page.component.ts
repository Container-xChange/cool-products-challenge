import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductItem } from '@xc/core/interfaces/product-item.interface';
import { from, map, merge, Observable, shareReplay, Subject, switchMap } from 'rxjs';
import { ProductsManualService } from '@xc/core/services/products-manual.service';
import { FormBuilder } from '@angular/forms';
import { ProductManualListComponent } from '@xc/modules/product-manual-list/components/product-manual-list/product-manual-list.component';

@Component({
    selector: 'xc-product-manual-rate-page',
    templateUrl: './product-manual-rate-page.component.html',
    styleUrls: ['./product-manual-rate-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductManualRatePageComponent implements OnInit {

    product$!: Observable<ProductItem>;

    private readonly refreshProduct$: Subject<void> = new Subject();

    constructor(
        private readonly fb: FormBuilder,
        private readonly route: ActivatedRoute,
        private readonly productsManualService: ProductsManualService
    ) {
    }

    ngOnInit(): void {
        this.initSubscriptions();
    }

    update(product: ProductItem): void {
        from(this.productsManualService.update(product))
            .subscribe({
                next: () => this.refreshProduct$.next(),
                error: (error) => console.error(ProductManualListComponent.name, 'could not update product', error),
            });
    }

    private initSubscriptions(): void {
        this.product$ = merge(
            this.route.params.pipe(map((params) => +params['id'])),
            this.refreshProduct$.pipe(map(() => +this.route.snapshot.params['id']))
        ).pipe(
                switchMap((id: number) => from(this.productsManualService.get(id) as Promise<ProductItem>)),
                shareReplay(1)
            );
    }
}
