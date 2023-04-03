import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsManualDbNameToken, ProductsManualStoreNameToken } from './core/injectors/products-manual-db.injector';
import { ProductsManualService } from './core/services/products-manual.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [
        ProductsManualService,
        {
            provide: ProductsManualDbNameToken,
            useValue: 'productDB'
        },
        {
            provide: ProductsManualStoreNameToken,
            useValue: 'products'
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
