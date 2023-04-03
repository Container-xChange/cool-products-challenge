import { ProductsManualService } from './products-manual.service';
import { openDB } from 'idb';
import { TestBed } from '@angular/core/testing';
import { ProductsManualDbNameToken, ProductsManualStoreNameToken } from '../injectors/products-manual-db.injector';

const productItemsMock = () => [
    { id: 1 },
    { id: 2 }
];

const testDbName = 'TEST_PRODUCTS';
const testStoreName = 'PRODUCTS';

describe('ProductsManualService', () => {
    let service: ProductsManualService<{ id: number }>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [
                ProductsManualService,
                {
                    provide: ProductsManualDbNameToken,
                    useValue: testDbName
                },
                {
                    provide: ProductsManualStoreNameToken,
                    useValue: testStoreName
                }
            ]
        });
        service = TestBed.inject(ProductsManualService);
    });

    afterEach(async () => {
        const tx = (await db()).transaction(testStoreName, 'readwrite');
        await tx.objectStore(testStoreName).clear();
        await tx.done;
    });

    async function db(): Promise<any> {
        return await openDB(testDbName, 1, { upgrade: (db: any) => db.createObjectStore(testStoreName, { keyPath: 'id' }) });
    }

    it('should save a product to the IndexedDB store', async () => {
        const product = productItemsMock()[0];
        await service.add(product);
        const tx = (await db()).transaction(testStoreName, 'readonly');
        const savedProduct = await tx.objectStore(testStoreName).get(1);
        await tx.done;
        expect(savedProduct).toEqual(product);
    });

    it('should update a product in the IndexedDB store', async () => {
        let tx = (await db()).transaction(testStoreName, 'readwrite');
        await tx.objectStore(testStoreName).add(productItemsMock()[0]);
        await tx.done;
        const product = { ...productItemsMock()[1], id: productItemsMock()[0].id };
        await service.update(product);
        tx = (await db()).transaction(testStoreName, 'readonly');
        const savedProduct = await tx.objectStore(testStoreName).get(1);
        await tx.done;
        expect(savedProduct).toEqual(product);
    });

    it('should not update an existing product in the IndexedDB store', async () => {
        const oldProduct = productItemsMock()[0];
        let tx = (await db()).transaction(testStoreName, 'readwrite');
        await tx.objectStore(testStoreName).add(oldProduct);
        await tx.done;
        const product = productItemsMock()[1];
        await service.update(product);
        tx = (await db()).transaction(testStoreName, 'readonly');
        const savedProduct = await tx.objectStore(testStoreName).get(1);
        await tx.done;
        expect(savedProduct).not.toEqual(product);
        expect(savedProduct).toEqual(oldProduct);
    });

    it('should delete a product from the IndexedDB store', async () => {
        const product = productItemsMock()[0];
        let tx = (await db()).transaction(testStoreName, 'readwrite');
        await tx.objectStore(testStoreName).add(product);
        await tx.done;
        await service.delete(1);

        tx = (await db()).transaction(testStoreName, 'readonly');
        const deletedProduct = await tx.objectStore(testStoreName).get(1);
        await tx.done;
        expect(deletedProduct).toBeUndefined();
    });

    it('should get all products from the IndexedDB store', async () => {
        const products = productItemsMock();
        const tx = (await db()).transaction(testStoreName, 'readwrite');
        await Promise.all(products.map((product) => tx.objectStore(testStoreName).add(product)));
        await tx.done;
        const retrievedProducts = await service.getAll();
        expect(retrievedProducts).toEqual(products);
    });

    it('should get product from the IndexedDB store', async () => {
        const products = productItemsMock();
        const tx = (await db()).transaction(testStoreName, 'readwrite');
        await Promise.all(products.map((product) => tx.objectStore(testStoreName).add(product)));
        await tx.done;
        const retrievedProduct = await service.get(products[1].id);
        expect(retrievedProduct).toEqual(products[1]);
    });

});
