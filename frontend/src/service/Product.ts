/**
 * The id identifies a product, the same id means that is the same product.
 */
export class Product {
    public readonly id: string;

    constructor(id: string) {
        this.id = id;
    }
}
