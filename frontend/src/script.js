import { createOrder, getStock } from './controlTower/ControlTower';

const cart = [];

export async function listProducts() {
    try {
        return await getStock(); // Assuming your API response has a "products" key
    } catch (error) {
        console.error('Error listing products:', error);
        throw error; // Rethrow the error so it can be caught by the caller
    }
}

export async function addToCart(productId, cart) {
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

    return cart
}

export function listCartItems(cart) {
    const cartList = document.getElementById('cart-list');

    if (cartList) {
        cartList.innerHTML = ''; // Clear any existing content

        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <span>${item.name}</span>
                <span>Cantidad: ${item.quantity}</span>
                <button onClick={() => removeFromCart(${item.productId}, cart)}>Eliminar</button>
            `;
            cartList.appendChild(cartItemDiv);
        });
    }
}

export function removeFromCart(productId, cart) {
    const cartIndex = cart.findIndex(item => item.productId === productId);
    if (cartIndex > -1) {
        cart.splice(cartIndex, 1);
        return cart
    }
}

export function transformCartToOrder(cart){
    return cart.map(prodCart => getProdOrder(prodCart));
}

export function getProdOrder(prodCart) {
    return {
        productId: prodCart.productId,
        quantity: prodCart.quantity,
    };
}

export async function buyItems(cart) {
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        await listProducts();
        await createOrder(transformCartToOrder(cart));
        return true
    }
}

// Call the listProducts function to initially populate the product list
document.addEventListener('DOMContentLoaded', listProducts);
