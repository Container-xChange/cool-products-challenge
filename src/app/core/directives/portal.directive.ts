// noinspection JSDeprecatedSymbols
import { AfterContentInit, ApplicationRef, ComponentFactoryResolver, Directive, Host, Injector, Input, OnDestroy } from '@angular/core';
import { CdkPortal, DomPortalOutlet } from '@angular/cdk/portal';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[cdkPortal]',
    standalone: true
})
export class PortalDirective implements AfterContentInit, OnDestroy {

    @Input('cdkPortal') selector = 'body';

    private host!: DomPortalOutlet;

    constructor(
        @Host() private readonly portal: CdkPortal,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly applicationRef: ApplicationRef,
        private readonly injector: Injector) {
    }


    ngAfterContentInit() {
        this.host = new DomPortalOutlet(
            document.querySelector(this.selector)!,
            this.componentFactoryResolver,
            this.applicationRef,
            this.injector
        );
        this.host.attach(this.portal);
    }

    ngOnDestroy() {
        this.host.detach();
    }
}
