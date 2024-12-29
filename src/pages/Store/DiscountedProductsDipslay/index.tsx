import { ProductCard } from "../../../components/Cards/ProductCard/ProductCard";
import styles from "./styles.module.css";
import { useHome } from "../context/HomepageContext";

export const DiscountedProductsDisplay = () => {
    const { productsOnSale } = useHome();

    if (productsOnSale.length === 0) return null;
    return (
        <div className={styles["discounted-products"]}>
            <div className={styles["discounted-products__title"]}>
                <h2>Produtos em Desconto</h2>
            </div>
            <div className={styles["discounted-products__container"]}>
                {productsOnSale.map(
                    ({ _id }: { _id: string }, index: React.Key) => (
                        <span className={styles["container__item"]} key={index}>
                            <ProductCard id={_id} />
                        </span>
                    )
                )}
            </div>
        </div>
    );
};
