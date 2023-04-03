import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'list',
        loadChildren: () => import('./pages/product-list-page/product-list-page.module')
            .then((m) => m.ProductListPageModule)
    },
    {
        path: '**',
        redirectTo: 'list'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
