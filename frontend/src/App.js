import "./styles.css";

import React, { useEffect, useState } from "react";
import { addToCart, buyItems, listProducts, removeFromCart} from "./script.js";

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const productList = await listProducts();
                setProducts(productList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchProducts();
    }, []);

    const fetchAddToCart = async (productId) => {
        try {
            const updatedCart = await addToCart(productId, cart);
            setCart(prevCart => [...prevCart]);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    async function fetchProducts() {
        try {
            const productList = await listProducts();
            setProducts(productList);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    const handleRemoveFromCart = (productId) => {
        const updatedCart = removeFromCart(productId, cart);
        setCart(prevCart => [...prevCart]);
    };
    const handleBuyItems = () => {
        const updatedCart = buyItems(cart);
        if(updatedCart) setCart([]);

        fetchProducts()
    };

    return (
        <div>
            <header>
                <h1>Tienda Online</h1>
            </header>
            <main>
                <section className="products">
                    <h2>Productos</h2>
                    <div id="product-list" className="product-list">
                        {products.map((product) => (
                            <div key={product.productId} className="cart-item">
                                <span>{product.itemName}</span>
                                <span>Cantidad máxima: {product.quantity}</span>
                                <button onClick={() => fetchAddToCart(product.productId)}>Add to Cart</button>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="cart">
                    <h2>Carrito de Compras</h2>
                    <div id="cart-list" className="cart-list">
                        {cart.map((product) => (
                            <div key={product.productId} className="cart-item">
                                <span>{product.name}</span>
                                <span>Cantidad: {product.quantity}</span>
                                <button onClick={() => handleRemoveFromCart(product.productId)}>Eliminar</button>
                            </div>
                        ))}
                    </div>
                    <button
                        id="checkout-button"
                        className="checkout-button"
                        onClick={() => handleBuyItems()}
                    >
                        Finalizar Compra
                    </button>
                </section>
            </main>
        </div>
    );
}

export default App;
