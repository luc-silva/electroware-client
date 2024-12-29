import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./Category.module.css";
import { getCategory, getCategoryProducts } from "../../service";
import { ProductCard } from "../../components/Cards/ProductCard/ProductCard";

export const Category = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("");

    useEffect(() => {
        if (id) {
            getCategoryProducts(id).then((data) => {
                setProducts(data);
            });
            getCategory(id).then((data) => {
                setCategory(data.name);
            });
        }
    }, [id]);
    return (
        <main role="main" className={styles["category"]}>
            <section className={styles["category__main"]}>
                <div className={styles["category__products__title"]}>
                    <h2>{category}</h2>
                    <p>
                        {products.length == 1
                            ? `${products.length} produtos disponível!`
                            : `${products.length} produtos disponíveis!`}
                    </p>
                </div>
                <div className={styles["products__container"]}>
                    {products.map(
                        ({ _id }: { _id: string }, index: React.Key) => (
                            <ProductCard id={_id} key={index} />
                        )
                    )}
                </div>
            </section>
        </main>
    );
};
