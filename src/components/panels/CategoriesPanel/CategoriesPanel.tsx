import { useEffect, useState } from "react";

import styles from "./CategoriesPanel.module.css";
import { getCategories } from "../../../service";
import { SearchCategoryCard } from "../../Cards/SearchCategoryCard/SearchCategoryCard";

export const CategoriesPanel = () => {
    const [categories, setCategories] = useState<CategoryDetails[]>([]);

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);
    return (
        <section className={styles["category-panel"]}>
            <div className={styles["category-panel__title"]}>
                <h3>Categorias</h3>
            </div>
            <ul className={styles["category-panel__categories"]}>
                {categories.map((item: Category) => (
                    <SearchCategoryCard item={item} key={item._id} />
                ))}
            </ul>
        </section>
    );
};
