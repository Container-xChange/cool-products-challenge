import { Compiler, Injectable, Injector } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ProductManualFormModel } from '../../../interfaces/product-manual-form.interface';
import { FormModalRef } from '../../../../../core/modules/form-modal/utils/form-modal-ref.util';
import { FormModalUiService } from '../../../../../core/modules/form-modal/services/form-modal-ui.service';

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
