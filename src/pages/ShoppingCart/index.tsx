import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ShoppingCart.module.css";
import { UserContext } from "../../context/UserContext";
import { getCartInstances } from "../../service";
import { ShoppingCartItemsDisplay } from "../../components/Displays/ShoppingCartItems/ShoppingCartItemsDisplay";
import { getTotalValue } from "../../utils/operations";
import { ShoppingCartProvider, useCart } from "./context";

export const ShoppingCart = () => {
    const { redirectToCheckout, cartItems, cartTotalValue } = useCart();

    return (
        <ShoppingCartProvider>
            <main className={styles["shopping-cart"]}>
                <section className={styles["shopping-cart__main"]}>
                    <div className={styles["shopping-cart__main__title"]}>
                        <h2>Carrinho de Compras</h2>
                    </div>
                    <div className={styles["shopping-cart__container"]}>
                        <ShoppingCartItemsDisplay />
                    </div>
                </section>
                <aside className={styles["shopping-cart__panel"]}>
                    <div className={styles["shopping-cart__panel__display"]}>
                        <p>Valor total:</p>
                        <strong>{`${cartTotalValue} R$`}</strong>
                    </div>
                    {(cartTotalValue > 0 && (
                        <button onClick={redirectToCheckout}>
                            Finalizar Compra
                        </button>
                    )) || <button disabled>Finalizar Compra</button>}
                </aside>
            </main>
        </ShoppingCartProvider>
    );
};
