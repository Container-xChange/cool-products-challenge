import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'products',
        loadChildren: () => import('./pages/product-list-page/product-list-page.module')
            .then((m) => m.ProductListPageModule)
    },
    {
        path: 'not-found',
        loadChildren: () => import('./pages/not-found-page/not-found-page.module')
            .then((m) => m.NotFoundPageModule)
    },
    {
        path: 'access-denied',
        loadChildren: () => import('./pages/access-denied-page/access-denied-page.module')
            .then((m) => m.AccessDeniedPageModule)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products'
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
