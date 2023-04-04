import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [NotFoundPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: NotFoundPageComponent }])
    ],
    exports: [NotFoundPageComponent]
})
export class NotFoundPageModule {
}
