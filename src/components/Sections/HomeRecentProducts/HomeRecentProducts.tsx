import { useEffect, useState } from "react";
import styles from "./HomeRecentProducts.module.css";
import { getRecentProducts } from "../../../service";
import { ProductCard } from "../../Cards/ProductCard/ProductCard";

export const HomeRecentProducts = () => {
    const [recentProducts, setRecentProducts] = useState([]);

    useEffect(() => {
        getRecentProducts().then((data) => {
            setRecentProducts(data);
        });
    }, []);

    return (
        <section className={styles["recent-products"]}>
            <h2>Recém anunciados</h2>
            {recentProducts.length > 0 ? (
                <ul className={styles["products-container"]}>
                    {recentProducts.length > 0
                        ? recentProducts.map(
                              ({ _id }: ProductDetails, index: React.Key) => {
                                  return <ProductCard id={_id} key={index} />;
                              }
                          )
                        : ""}
                </ul>
            ) : (
                "Sem produtos disponíveis."
            )}
        </section>
    );
};
