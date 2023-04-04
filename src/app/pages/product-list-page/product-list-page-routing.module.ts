import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListPageComponent } from './components/product-list-page/product-list-page.component';

const routes: Routes = [
    {
        path: '',
        component: ProductListPageComponent,
        children: [
            {
                path: 'api',
                loadChildren: () => import('../product-api-list-page/product-api-list-page.module')
                    .then((m) => m.ProductApiListPageModule)
            },
            {
                path: 'manual',
                loadChildren: () => import('../product-manual-list-page/product-manual-list-page.module')
                    .then((m) => m.ProductManualListPageModule)
            },
            {
                path: '**',
                redirectTo: 'api'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductListPageRoutingModule {
}
