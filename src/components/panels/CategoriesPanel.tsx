import CategoryService from "../../services/CategoryService";
import { useEffect, useState } from "react";
import { SearchCategoryCard } from "../Cards/SearchCategoryCard";

import styles from "./CategoriesPanel.module.css";

export const CategoriesPanel = () => {
    let [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryService.getCategories().then((data) => {
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
