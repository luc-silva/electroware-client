import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../../services/CategoryService";
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
            <div>
                <h3>Categorias</h3>
            </div>
            <ul>
                {categories.map(
                    (
                        { name, _id }: { name: string; _id: string },
                        index: React.Key
                    ) => (
                        <li key={index}>
                            <Link to={`/category/${_id}`}>{name}</Link>
                        </li>
                    )
                )}
            </ul>
        </section>
    );
};
