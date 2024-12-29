import { ProductCard } from "../../../components/Cards/ProductCard/ProductCard";
import { useHome } from "../context/HomepageContext";
import styles from "./styles.module.css";

export const RecentProducts = () => {
    const { recentlyListedProducts } = useHome();

    return (
        <section className={styles["recent-products"]}>
            <h2>Recém anunciados</h2>
            {!recentlyListedProducts.length && <p>Sem produtos disponíveis.</p>}
            {!!recentlyListedProducts.length && (
                <ul className={styles["products-container"]}>
                    {recentlyListedProducts.map(
                        ({ _id }: ProductDetails, index: React.Key) => (
                            <ProductCard id={_id} key={index} />
                        )
                    )}
                </ul>
            )}
        </section>
    );
};
