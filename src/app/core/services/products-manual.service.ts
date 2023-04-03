import { Inject, Injectable } from '@angular/core';
import { openDB } from 'idb';
import { ProductsManualDbNameToken, ProductsManualStoreNameToken } from '../injectors/products-manual-db.injector';

type Entity = { id: number };

@Injectable()
export class ProductsManualService<T extends Entity = never> {

    private readonly dbVersion = 1;

    constructor(
        @Inject(ProductsManualDbNameToken) private readonly dbName: string,
        @Inject(ProductsManualStoreNameToken) private readonly storeName: string
    ) {}

    async add(product: T) {
        const db = await this.connectDB();
        const tx = db.transaction(this.storeName, 'readwrite');
        const store = tx.objectStore(this.storeName);
        await store.add(product);
        await tx.done;
    }

    async update(product: T) {
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

    async getAll(): Promise<T[]> {
        const db = await this.connectDB();
        const tx = db.transaction(this.storeName, 'readonly');
        const store = tx.objectStore(this.storeName);
        const products = await store.getAll();
        await tx.done;
        return products;
    }

    async get(id: number): Promise<T | null> {
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
