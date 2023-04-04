import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalDirective } from './directives/portal.directive';
import { PortalModule as CdkPortalModal } from '@angular/cdk/portal';

@NgModule({
    declarations: [PortalDirective],
    imports: [CommonModule, CdkPortalModal],
    exports: [PortalDirective, CdkPortalModal]
})
export class PortalModule {
}
