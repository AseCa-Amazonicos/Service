import {Cart} from '../../src/service/Cart';
import {Product} from './Product';

test('create cart', () => {
    expect(new Cart().IsEmpty()).toBeTruthy();
});

test('add product to cart', () => {
    let cart = new Cart();
    expect(cart.IsEmpty()).toBeTruthy();
    cart = cart.AddProduct(new Product('412441fsadfew'));
    expect(cart.IsEmpty()).toBeFalsy();
});
