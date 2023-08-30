import { ProductCardSmall } from "../Cards/ShoppingCartCard";

import styles from "./ShoppingCartItemsDisplay.module.css";

export const ShoppingCartItemsDisplay = ({
    user,
    update,
    items,
}: {
    user: UserSession;
    update: Function;
    items: CartItem[];
}) => {
    if (items.length === 0)
        return (
            <div className={styles["message"]}>
                <p>Carrinho de compras vazio.</p>
            </div>
        );
    return (
        <div className={styles["shopping-cart-container"]}>
            {items.map(({ _id }: CartItem, index: any) => {
                return (
                    <ProductCardSmall
                        updateCart={update}
                        instanceID={_id}
                        user={user}
                        key={index}
                    />
                );
            })}
        </div>
    );
};
