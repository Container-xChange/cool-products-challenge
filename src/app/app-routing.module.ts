import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/product-list-page/product-list-page.component')
            .then((m) => m.ProductListPageComponent)
    },
    {
        path: 'not-found',
        loadComponent: () => import('./core/pages/not-found-page/not-found-page.component')
            .then((m) => m.NotFoundPageComponent)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
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
