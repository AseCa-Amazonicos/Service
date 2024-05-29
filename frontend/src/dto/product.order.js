export class ProductOrder {
    productId;
    quantity;
    constructor(productOrder) {
        this.productId = productOrder.productId;
        this.quantity = productOrder.quantity;
    }
}
