export class ProductCart {
    productId;
    quantity;
    name;
    constructor(productCart) {
        this.productId = productCart.productId;
        this.quantity = productCart.quantity;
        this.name = productCart.name;
    }
}
