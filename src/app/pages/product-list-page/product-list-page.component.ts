import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductListSettingsComponent } from './components/product-list-settings/product-list-settings.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PageLoaderComponent } from '../../core/pages/page-loader/page-loader.component';
import { PortalDirective } from '../../core/directives/portal.directive';
import { CdkPortal } from '@angular/cdk/portal';
import { ProductManualModalUiService } from './modules/product-manual-modal/services/product-manual-modal-ui.service';
import { ProductManualModalModule } from './modules/product-manual-modal';
import { ProductManualListService } from './services/product-manual-list.service';
import { FormsModule } from '@angular/forms';

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
        ProductManualModalModule,
        FormsModule
    ],
    providers: [ProductManualListService, ProductManualModalUiService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListPageComponent {

    constructor(private readonly manualProductListService: ProductManualListService) {
    }

    addProduct(): void {
        this.manualProductListService.addProduct();
    }
}
