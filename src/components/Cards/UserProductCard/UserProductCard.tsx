import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./UserProductCard.module.css";
import { productInitialState } from "../../../constants/initialStates";
import { getProductDetails } from "../../../service";
import { ImageBox } from "../../Misc/ImageBox/ImageBox";
import { createImage } from "../../../utils/operations";
import { CardPriceDisplay } from "../../Displays/CardPriceDisplay/CardPriceDisplay";

export const UserProductCard = ({ id }: { id: string }) => {
    const [productDetails, setProductDetails] = useState(productInitialState);
    const [isLoading, toggleLoading] = useState(true);
    useEffect(() => {
        if (id) {
            getProductDetails(id)
                .then(setProductDetails)
                .then(() => {
                    toggleLoading(false);
                });
        }
    }, [id]);

    return (
        <Link to={`/product/${id}`}>
            <div className={styles["user-profile__product__item"]}>
                <div className={styles["product__picture"]}>
                    <ImageBox
                        isLoading={isLoading}
                        imgSrc={createImage(productDetails.image.data.data)}
                    />
                </div>
                <div className={styles["product__main"]}>
                    <div className={styles["product__name"]}>
                        {(isLoading && (
                            <div className={styles["loading-line"]} />
                        )) || <p>{productDetails.product.name}</p>}
                    </div>
                    <div className={styles["product__price"]}>
                        {(isLoading && (
                            <div className={styles["loading-line"]} />
                        )) || (
                            <CardPriceDisplay
                                discount={productDetails.product.discount}
                                on_sale={productDetails.product.on_sale}
                                price={productDetails.product.price}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};
