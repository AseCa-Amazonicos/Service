import {ProductOrder} from './dto/product.order';
import {ProductCart} from './dto/product.cart';
import { createOrder, getStock } from './controlTower/ControlTower';

const cart = [];

async function listProducts() {
    const productList = document.getElementById('product-list'); // on html, product-list is the id of the div

    if (productList) {
        productList.innerHTML = ''; // Clear any existing content

        const products = await getStock();

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <span>${product.itemName}</span>
                <span>Stock: ${product.quantity}</span>
                <button onclick="addToCart(${product.productId})">Agregar al Carrito</button>
            `;
            productList.appendChild(productDiv);
        });
    }
}

export async function addToCart(productId) {
    const products = await getStock();
    const product = products.find(p => p.productId === productId);
    if (!product) {
        console.error(`Product with ID ${productId} not found`);
        return;
    }

    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        if (cartItem.quantity < product.quantity) {
            cartItem.quantity++;
        } else {
            console.log(`No more stock available for ${product.itemName}`);
        }
    } else {
        if (product.quantity > 0)
            cart.push({
                productId: product.productId,
                quantity: 1,
                name: product.itemName,
            });
        else console.log(`No more stock available for ${product.itemName}`);
    }

    listCartItems();
}

function listCartItems() {
    const cartList = document.getElementById('cart-list');

    if (cartList) {
        cartList.innerHTML = ''; // Clear any existing content

        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <span>${item.name}</span>
                <span>Cantidad: ${item.quantity}</span>
                <button onclick="removeFromCart(${item.productId})">Eliminar</button>
            `;
            cartList.appendChild(cartItemDiv);
        });
    }
}

function removeFromCart(productId) {
    const cartIndex = cart.findIndex(item => item.productId === productId);
    if (cartIndex > -1) {
        cart.splice(cartIndex, 1);
        listCartItems();
    }
}

function transformCartToOrder(){
    return cart.map(prodCart => getProdOrder(prodCart));
}

function getProdOrder(prodCart) {
    return {
        productId: prodCart.productId,
        quantity: prodCart.quantity,
    };
}

export async function buyItems() {
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        await listProducts();
        await createOrder(transformCartToOrder());
        for (let i = 0; i < cart.length; i++) {
            removeFromCart(cart[i].productId);
        }
    }
}

// Call the listProducts function to initially populate the product list
document.addEventListener('DOMContentLoaded', listProducts);
