import React from "react";

const HomeScreen = () => {
    return (
        <div>
            <header>
                <h1>Tienda Online</h1>
            </header>
            <main>
                <section className="products">
                    <h2>Productos</h2>
                    <div id="product-list" className="product-list">
                        {/* Products will be dynamically loaded here */}
                    </div>
                </section>
                <section className="cart">
                    <h2>Carrito de Compras</h2>
                    <div id="cart-list" className="cart-list">
                        {/* Cart items will be dynamically loaded here */}
                    </div>
                    <button id="checkout-button" className="checkout-button" onClick={buyItems}>Finalizar Compra
                    </button>
                </section>
            </main>
            <script src="script.js"></script>
        </div>
    )
}

export default HomeScreen();
