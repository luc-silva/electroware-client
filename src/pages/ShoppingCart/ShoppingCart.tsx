import { getTotalValue } from "../../../utils/operations";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ShoppingCart.module.css";
import { ShoppingCartItemsDisplay } from "../components/Displays/ShoppingCartItemsDisplay";
import { UserContext } from "../../../context/UserContext";
import { getCartInstances } from "../../../service";

export const ShoppingCart = () => {
    const { user } = useContext(UserContext);
    const [items, setItems] = useState([] as CartItem[]);
    const navigate = useNavigate();

    function handleCheckout() {
        navigate("/checkout");
    }

    async function updateCart() {
        getCartInstances(user.token).then((data) => {
            setItems(data);
        });
    }
    useEffect(() => {
        if (!user.logged) {
            navigate("/login");
        }
        updateCart();
    }, []);

    return (
        <main role={"main"} className={styles["shopping-cart"]}>
            <section className={styles["shopping-cart__main"]}>
                <div className={styles["shopping-cart__main__title"]}>
                    <h2>Carrinho de Compras</h2>
                </div>
                <div className={styles["shopping-cart__container"]}>
                    <ShoppingCartItemsDisplay
                        items={items}
                        update={updateCart}
                    />
                </div>
            </section>
            <aside className={styles["shopping-cart__panel"]}>
                <div className={styles["shopping-cart__panel__display"]}>
                    <p>Valor total:</p>
                    <strong>{`${getTotalValue(items)} R$`}</strong>
                </div>
                {(getTotalValue(items) > 0 && (
                    <button onClick={handleCheckout}>Finalizar Compra</button>
                )) || <button disabled>Finalizar Compra</button>}
            </aside>
        </main>
    );
};
