import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessDeniedPageComponent } from './components/access-denied-page/access-denied-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AccessDeniedPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: AccessDeniedPageComponent }])
    ],
    exports: [AccessDeniedPageComponent]
})
export class AccessDeniedPageModule {
}
