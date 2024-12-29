import { useCart } from "../../../pages/ShoppingCart/context";
import { ProductCardSmall } from "../../Cards/ShoppingCartCard";
import styles from "./ShoppingCartItemsDisplay.module.css";

export const ShoppingCartItemsDisplay = () => {
    const { cartItems } = useCart();
    if (cartItems.length === 0)
        return (
            <div className={styles["message"]}>
                <p>Carrinho de compras vazio.</p>
            </div>
        );
    return (
        <div className={styles["shopping-cart-container"]}>
            {cartItems.map(({ _id }: CartItem, index: any) => (
                <ProductCardSmall instanceID={_id} key={index} />
            ))}
        </div>
    );
};
