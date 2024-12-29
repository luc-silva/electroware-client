import { RecentProducts } from "./RecentProducts";
import { Banner } from "./Banner";

import { DiscountedProductsDisplay } from "./DiscountedProductsDipslay";
import { CategoriesDisplay } from "./CategoriesDisplay";
import { FeaturedContainer } from "./FeaturedContainer";
import styles from "./styles.module.css";
import { HomepageProvider } from "./context/HomepageContext";

export const Store = () => {
    return (
        <HomepageProvider>
            <main className={styles["index"]}>
                <Banner />
                <section className={styles["featured"]}>
                    <div className={styles["featured__title"]}>
                        <h2>Por que você deveria comprar conosco?</h2>
                    </div>
                    <FeaturedContainer />
                </section>
                <div className={styles["on-sale__container"]}>
                    <DiscountedProductsDisplay />
                </div>
                <div className={styles["categories__container"]}>
                    <CategoriesDisplay />
                </div>
                <div className={styles["recent-products__container"]}>
                    <RecentProducts />
                </div>
            </main>
        </HomepageProvider>
    );
};
