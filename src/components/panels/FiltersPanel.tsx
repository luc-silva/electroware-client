import { useEffect, useState } from "react";
import styles from "./FiltersPanel.module.css";
import CategoryService from "../../services/CategoryService";

export const FiltersPanel = () => {
    let [categories, setCategories] = useState([] as Category[]);
    useEffect(() => {
        CategoryService.getCategories().then(setCategories);
    }, []);

    return (
        <div className={styles["filter-panel"]}>
            <div className={styles["filter-panel__title"]}>
                <h3>Filtros</h3>
            </div>
            <div className={styles["filter-panel__filters"]}>
                <form action="POST">
                    <div className={styles["input-container"]}>
                        <label htmlFor="orderBy">Ordernar por ordem:</label>
                        <select name="orderBy">
                            <option value="asc">Ascendente</option>
                            <option value="desc">Descendente</option>
                        </select>
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="category">Categoria:</label>
                        <select name="category">
                            {categories.map((item) => {
                                return (
                                    <option value={item._id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={styles["input-container"]}> 
                        <label htmlFor="price">Preço até:</label>
                        <input type="range" name="price" min={3} max={9999} defaultValue={undefined} />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="rating">Avaliação:</label>
                        <select name="rating">
                            <option value="any" defaultChecked>
                                Qualquer um
                            </option>
                            <option value="gt1">Acima de 1 estrela</option>
                            <option value="gt2">Acima de 2 estrelas</option>
                            <option value="gt3">Acima de 3 estrelas</option>
                            <option value="gt4">Acima de 4 estrelas</option>
                            <option value="eq5">Apenas 5 estrelas</option>
                        </select>
                    </div>
                    <div className={styles["submit-input-container"]}>
                        <input type="submit" value="Pesquisar" />
                    </div>
                </form>
            </div>
        </div>
    );
};
