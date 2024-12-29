import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./SearchResultCard.module.css";
import { productInitialState } from "../../../constants/initialStates";
import { getProductDetails, getUserInfo } from "../../../service";
import { ImageBox } from "../../Misc/ImageBox/ImageBox";
import { createImage } from "../../../utils/operations";
import { CardPriceDisplay } from "../../Displays/CardPriceDisplay/CardPriceDisplay";

export const SearchResultItem = ({ productId }: { productId: string }) => {
    const [isLoading, toggleLoading] = useState(true);
    const [seller, setSeller] = useState({ first: "", last: "" });
    const [productData, setProductData] = useState(productInitialState);

    useEffect(() => {
        if (productId) {
            getProductDetails(productId)
                .then((data) => {
                    setProductData(data);
                })
                .then(() => {
                    toggleLoading(false);
                });
        }
    }, [productId]);
    useEffect(() => {
        if (productData.product._id) {
            getUserInfo(productData.product.owner).then(({ name }) => {
                setSeller(name);
            });
        }
    }, [productData.product._id, productData.product.owner]);

    return (
        <div className={styles["product-card"]}>
            <Link to={`/product/${productData.product._id}`}>
                <div className={styles["product-image"]}>
                    <ImageBox
                        isLoading={isLoading}
                        imgSrc={createImage(productData.image.data.data)}
                    />
                </div>
                <div className={styles["product-details"]}>
                    <div className={styles["product-details__main"]}>
                        {(isLoading && (
                            <div className={styles["loading-line"]} />
                        )) || <h3>{productData.product.name}</h3>}
                        <div className={styles["details__seller"]}>
                            {(isLoading && (
                                <div className={styles["loading-line"]} />
                            )) || (
                                <p>
                                    Vendido por{" "}
                                    {`${seller.first} ${seller.last}`}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className={styles["product-details__info"]}>
                        {(isLoading && (
                            <div className={styles["loading-line"]} />
                        )) || (
                            <CardPriceDisplay
                                discount={productData.product.discount}
                                on_sale={productData.product.on_sale}
                                price={productData.product.price}
                            />
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};
