import ShoppingCartService from "../services/ShoppingCartService";
import { getTotalValue } from "../utils/operations";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ShoppingCart.module.css";
import { ShoppingCartItemsDisplay } from "../components/Displays/ShoppingCartItemsDisplay";

export const ShoppingCart = ({
    user,
    setUser,
}: {
    user: UserSession;
    setUser: React.Dispatch<UserSession>;
}) => {
    let [items, setItems] = useState([] as CartItem[]);
    let navigate = useNavigate();

    function handleCheckout() {
        navigate("/checkout");
    }

    async function updateCart() {
        ShoppingCartService.getCartInstances(user.token).then((data) => {
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
                       <ShoppingCartItemsDisplay user={user} items={items} update={updateCart} />
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
