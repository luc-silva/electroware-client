import { useContext, useEffect, useState } from "react";

import { SettingsProductCard } from "../Cards/SettingsProductCard";
import { NothingAvailableDialog } from "../Misc/NothingAvailableDialog";
import styles from "./SettingsUserProducts.module.css";
import { UserContext } from "../../context/UserContext";
import { getUserProducts } from "../../service";

export const SettingsUserProducts = () => {
    const { user } = useContext(UserContext);

    const [products, setProducts] = useState([]);
    async function updateProducts() {
        await getUserProducts(user.id).then(setProducts);
    }

    useEffect(() => {
        if (user.id) {
            updateProducts();
        }
    }, []);
    return (
        <section className={styles["settings-products"]}>
            <div className={styles["settings-products__title"]}>
                <h2>Seus Produtos</h2>
            </div>
            <div className={styles["settings-products__container"]}>
                {(products.length > 0 &&
                    products.map(({ _id }: { _id: string }) => (
                        <SettingsProductCard
                            id={_id}
                            userToken={user.token}
                            update={updateProducts}
                        />
                    ))) || (
                    <NothingAvailableDialog text="Nenhum produto disponível." />
                )}
            </div>
        </section>
    );
};
