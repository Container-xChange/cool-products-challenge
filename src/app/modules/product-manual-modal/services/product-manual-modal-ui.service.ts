import { Compiler, Injectable, Injector } from '@angular/core';
import { FormModalRef } from '@xc/modules/form-modal/utils/form-modal-ref.util';
import { from, Observable } from 'rxjs';
import { FormModalUiService } from '@xc/modules/form-modal/services/form-modal-ui.service';
import { ProductManualFormModel } from '@xc/core/interfaces/product-manual-form.interface';

@Injectable()
export class ProductManualModalUiService {
    constructor(private injector: Injector, private compiler: Compiler) {}

    load(): Observable<FormModalRef<ProductManualFormModel>> {
        return from(
            import('../index').then(async ({ ProductManualModalModule, ProductManualModalComponent }) =>
                this.compiler.compileModuleAsync(ProductManualModalModule)
                    .then((factory) => {
                        return factory.create(this.injector);
                    })
                    .then((moduleRef) => {
                        return moduleRef.injector.get(FormModalUiService)
                            .open(ProductManualModalComponent);
                    })
            )
        );
    }
}
