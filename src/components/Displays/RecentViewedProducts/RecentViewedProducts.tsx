import { ProductCard } from "../../Cards/ProductCard/ProductCard";
import styles from "./RecentViewedProducts.module.css";

export const RecentViewedProducts = ({
    viewedProducts,
}: {
    viewedProducts: string[];
}) => {
    if (!viewedProducts || viewedProducts.length === 0) return null;

    return (
        <div className={styles["recent-viewed"]}>
            <div className={styles["recent-viewed__title"]}>
                <h2>Visualizados Recentemente</h2>
            </div>
            <div className={styles["recent-viewed__products"]}>
                {viewedProducts.map((item) => {
                    return (
                        <div
                            className={styles["recent-viewed__products__card"]}
                        >
                            <ProductCard id={item} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
