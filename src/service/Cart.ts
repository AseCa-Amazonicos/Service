import {Product} from '../../test/service/Product';

export class Cart {
    private readonly products: Map<Product, number>;

    constructor(products?: Map<Product, number>) {
        if (products === undefined) this.products = new Map<Product, number>();
        else this.products = products;
    }

    public IsEmpty(): Boolean {
        return this.products.size === 0;
    }

    AddProduct(product: Product): Cart {
        const products = this.products.set(product, 1);
        return new Cart(products);
    }
}
