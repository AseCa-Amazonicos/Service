// script.js

// Define the Product and CartItem objects
const products = [
    { id: 1, name: "Producto 1", price: 10.00, stock: 5 },
    { id: 2, name: "Producto 2", price: 15.00, stock: 3 },
    { id: 3, name: "Producto 3", price: 20.00, stock: 2 },
];

const cart = [];

function listProducts() {
    const productList = document.getElementById('product-list'); // on html, product-list is the id of the div

    if (productList) {
        productList.innerHTML = '';  // Clear any existing content

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <span>${product.name}</span>
                <span>$${product.price.toFixed(2)}</span>
                <span>Stock: ${product.stock}</span>
                <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
            `;
            productList.appendChild(productDiv);
        });
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error(`Product with ID ${productId} not found`);
        return;
    }

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (cartItem.quantity < product.stock) {
            cartItem.quantity++;
        } else {
            console.log(`No more stock available for ${product.name}`);
        }
    } else {
        if(product.stock > 0)
            cart.push({ ...product, quantity: 1 });
        else
            console.log(`No more stock available for ${product.name}`);
    }

    listCartItems();
}

function listCartItems() {
    const cartList = document.getElementById('cart-list');

    if (cartList) {
        cartList.innerHTML = '';  // Clear any existing content

        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <span>${item.name}</span>
                <span>$${(item.price*item.quantity).toFixed(2)}</span>
                <span>Cantidad: ${item.quantity}</span>
                <button onclick="removeFromCart(${item.id})">Eliminar</button>
            `;
            cartList.appendChild(cartItemDiv);
        });
    }
}

function removeFromCart(productId) {
    const cartIndex = cart.findIndex(item => item.id === productId);
    if (cartIndex > -1) {
        cart.splice(cartIndex, 1);
        listCartItems();
    }
}

function buyItems(){
    const checkoutButton = document.getElementById('checkout-button');
    if(checkoutButton){
        for (let i = 0; i < cart.length; i++){
            const product = products.find(p => p.id === cart[i].id);
            product.stock -= cart[i].quantity;
            removeFromCart(cart[i].id);
        }
        listProducts()
    }
}

// Call the listProducts function to initially populate the product list
document.addEventListener('DOMContentLoaded', listProducts);
