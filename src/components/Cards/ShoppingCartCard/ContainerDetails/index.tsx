import { Trash } from "phosphor-react";
import { useCart } from "../../../../pages/ShoppingCart/context";
import styles from "./styles.module.css";
import { useMemo } from "react";

//rename to ShoppingCartCard
export const ContainerDetails = () => {
    const { removeItem, productDetails } = useCart();

    const handleRemoveItem = () => {
        if (productDetails) {
            removeItem(productDetails._id);
        }
    };

    if (!productDetails) return null;
    return (
        <div className={styles["container__details"]}>
            <div className={styles["details__main"]}>
                <div className={styles["details__title"]}>
                    <p>{productDetails.name}</p>
                </div>
                <div className={styles["details__pricing"]}>
                    <strong>{`R$ ${
                        productDetails.quantity * productDetails.price
                    } `}</strong>
                    <p>{`UNIDS: ${productDetails.quantity} x ${productDetails.price} `}</p>
                </div>
            </div>
            <div className={styles["container__footer"]}>
                <p>{`Vendendor: ${productDetails.seller.name.first} ${productDetails.seller.name.last}`}</p>
                <Trash
                    size={25}
                    color={`var(--text-color)`}
                    onClick={handleRemoveItem}
                />
            </div>
        </div>
    );
};
