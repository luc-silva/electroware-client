import { CategoryCard } from "./CategoryCard";
import { useHome } from "../context/HomepageContext";
import styles from "./styles.module.css";

export const CategoriesDisplay = () => {
    const { categories } = useHome();
    return (
        <section className={styles["categories-display"]}>
            <div className={styles["display__title"]}>
                <h2>Categorias</h2>
            </div>
            <div className={styles["display__container"]}>
                {categories.map((data: CategoryDetails, index: React.Key) => (
                    <CategoryCard data={data} key={index} />
                ))}
            </div>
        </section>
    );
};
