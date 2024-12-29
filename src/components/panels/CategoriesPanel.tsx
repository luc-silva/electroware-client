import { useEffect, useState } from "react";
import { SearchCategoryCard } from "../Cards/SearchCategoryCard";

import styles from "./CategoriesPanel.module.css";
import { getCategories } from "../../service";

export const CategoriesPanel = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((data) => {
            setCategories(data);
        });
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
