import { ProductCard } from "../Cards/ProductCard";
import styles from "./RecentViewedProducts.module.css";

export const RecentViewedProducts = ({ user }: { user: UserSession }) => {
    if (!user.viewedProducts || user.viewedProducts.length === 0) return null;
    return (
        <div className={styles["recent-viewed"]}>
            <div className={styles["recent-viewed__title"]}>
                <h2>Visualizados Recentemente</h2>
            </div>
            <div className={styles["recent-viewed__products"]}>
                {user.viewedProducts.map((item) => {
                    return (
                        <div className={styles["recent-viewed__products__card"]}>
                            <ProductCard id={item} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
