import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListSettingsComponent } from './components/product-list-settings/product-list-settings.component';

@NgModule({
    declarations: [ProductListSettingsComponent],
    imports: [CommonModule],
    exports: [ProductListSettingsComponent]
})
export class ProductListSettingsModule {
}
