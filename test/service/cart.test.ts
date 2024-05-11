import {Cart, ProductInCart} from '../../src/service/Cart';
import {Product} from '../../src/service/Product';

test('create cart', () => {
    expect(new Cart().IsEmpty()).toBeTruthy();
});

test('add product to cart', () => {
    const cart = new Cart();
    expect(cart.IsEmpty()).toBeTruthy();
    cart.AddProduct(new Product('412441fsadfew'));
    expect(cart.IsEmpty()).toBeFalsy();
});

test('remove product from cart', () => {
    const cart = new Cart();
    cart.AddProduct(new Product('fqwiemfvp424r'));
    cart.RemoveProduct(new Product('fqwiemfvp424r'));
    expect(cart.IsEmpty()).toBeTruthy();
});

test('add same product 2 times', () => {
    const cart = new Cart();
    cart.AddProduct(new Product('fqwiemfvp424r'));
    cart.AddProduct(new Product('fqwiemfvp424r'));
    cart.RemoveProduct(new Product('fqwiemfvp424r'));
    expect(cart.IsEmpty()).toBeFalsy();
});

test('remove not existent product', () => {
    const cart = new Cart();
    cart.AddProduct(new Product('fqwiemfvp424r'));
    cart.RemoveProduct(new Product('fjsakfjl'));
    expect(cart.IsEmpty()).toBeFalsy();
});

test('add different type of products', () => {
    const cart = new Cart();
    cart.AddProduct(new Product('fqwiemfvp424r'));
    cart.AddProduct(new Product('aaaaaaaaaaaaa'));
    cart.RemoveProduct(new Product('fqwiemfvp424r'));
    expect(cart.IsEmpty()).toBeFalsy();
    const firsProduct = cart.ProductsInCart().next().value as ProductInCart;
    expect(firsProduct.product.id === 'aaaaaaaaaaaaa').toBeTruthy();
});
