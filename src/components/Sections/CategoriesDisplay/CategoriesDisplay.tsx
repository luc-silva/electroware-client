import { useEffect, useState } from "react";

import styles from "./CategoriesDisplay.module.css";
import { getCategories } from "../../../service";
import { CategoryCard } from "../../Cards/CategoryCard/CategoryCard";

export const CategoriesDisplay = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);
    return (
        <section className={styles["categories-display"]}>
            <div className={styles["display__title"]}>
                <h2>Categorias</h2>
            </div>
            <div className={styles["display__container"]}>
                {categories.map(
                    (
                        { _id, name }: { _id: string; name: string },
                        index: React.Key
                    ) => {
                        return (
                            <CategoryCard id={_id} name={name} key={index} />
                        );
                    }
                )}
            </div>
        </section>
    );
};
