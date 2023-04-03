import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductListSettingsComponent } from './components/product-list-settings/product-list-settings.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PageLoaderComponent } from '../../core/pages/page-loader/page-loader.component';
import { PortalDirective } from '../../core/directives/portal.directive';
import { CdkPortal } from '@angular/cdk/portal';
import { ProductsManualService } from '../../core/services/products-manual.service';
import { ProductManualModalUiService } from './modules/product-manual-modal/services/product-manual-modal-ui.service';
import { map, switchMap } from 'rxjs';
import { ProductManualFormModel } from './interfaces/product-manual-form.interface';
import { ProductManualModalModule } from './modules/product-manual-modal';

@Component({
    selector: 'xc-product-list-page',
    templateUrl: './product-list-page.component.html',
    styleUrls: ['./product-list-page.component.scss'],
    standalone: true,
    imports: [
        CdkPortal,
        PageLoaderComponent,
        PortalDirective,
        ProductListComponent,
        ProductListSettingsComponent,
        ProductManualModalModule
    ],
    providers: [ProductManualModalUiService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListPageComponent {
    constructor(
        private readonly productsManualService: ProductsManualService,
        private readonly productManualModalUiService: ProductManualModalUiService
    ) {
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
        console.warn('needs implementation', this.productsManualService.add, id, product);
    }
}
