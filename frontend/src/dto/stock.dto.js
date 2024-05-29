export class StockDto {
    productId;
    itemName;
    quantity;

    constructor(stockDto) {
        this.productId = stockDto.productId;
        this.itemName = stockDto.itemName;
        this.quantity = stockDto.quantity;
    }
}
