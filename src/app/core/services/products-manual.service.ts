import { Inject, Injectable } from '@angular/core';
import { openDB } from 'idb';
import { ProductItem } from '@xc/core/interfaces/product-item.interface';
import { ProductsManualDbNameToken, ProductsManualStoreNameToken } from '@xc/core/injectors/products-manual-db.injector';

@Injectable()
export class ProductsManualService {

    private readonly dbVersion = 1;

    constructor(
        @Inject(ProductsManualDbNameToken) private readonly dbName: string,
        @Inject(ProductsManualStoreNameToken) private readonly storeName: string
    ) {}

    async add(product: ProductItem) {
        const db = await this.connectDB();
        const tx = db.transaction(this.storeName, 'readwrite');
        const store = tx.objectStore(this.storeName);
        await store.add(product);
        await tx.done;
    }

    async update(product: ProductItem) {
        const db = await this.connectDB();
        const tx = db.transaction(this.storeName, 'readwrite');
        const store = tx.objectStore(this.storeName);
        const record = await store.get(product.id);
        if (record) {
            await store.put(product);
        }
        await tx.done;
    }

    async delete(productId: number) {
        const db = await this.connectDB();
        const tx = db.transaction(this.storeName, 'readwrite');
        const store = tx.objectStore(this.storeName);
        await store.delete(productId);
        await tx.done;
    }

    async getAll(): Promise<ProductItem[]> {
        const db = await this.connectDB();
        const tx = db.transaction(this.storeName, 'readonly');
        const store = tx.objectStore(this.storeName);
        const products = await store.getAll();
        await tx.done;
        return products;
    }

    async get(id: number): Promise<ProductItem | null> {
        const db = await this.connectDB();
        const tx = db.transaction(this.storeName, 'readonly');
        const store = tx.objectStore(this.storeName);
        const product = await store.get(id);
        await tx.done;
        return product;
    }

    private async connectDB() {
        return await openDB(this.dbName, this.dbVersion, {
            upgrade: (db) => {
                db.createObjectStore(this.storeName, { keyPath: 'id' });
            }
        });
    }

}
