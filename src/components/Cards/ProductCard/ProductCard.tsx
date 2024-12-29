import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./ProductCard.module.css";
import { productCardInitialState } from "../../../constants/initialStates";
import { getProductDetails } from "../../../service";
import { ImageBox } from "../../Misc/ImageBox/ImageBox";
import { createImage } from "../../../utils/operations";
import { CardInfo } from "../../Misc/CardInfo/CardInfo";

export const ProductCard = ({ id }: { id: string }) => {
    const [productData, setProductData] = useState(productCardInitialState);
    const [cardStatus, setCardStatus] = useState({
        loading: true,
        error: false,
    });
    useEffect(() => {
        getProductDetails(id)
            .then((data: any) => {
                setProductData(data);
            })
            .then(() => {
                setCardStatus({ loading: false, error: false });
            })
            .catch(() => {
                setCardStatus({ loading: false, error: true });
            });
    }, [id]);

    return (
        <Link className={styles["card-wrapper"]} to={`/product/${id}`}>
            <div className={styles["card-image"]}>
                <ImageBox
                    isLoading={cardStatus.loading}
                    imgSrc={createImage(productData.image.data.data)}
                />
            </div>
            <CardInfo
                product={productData.product as ProductDetails}
                isLoading={cardStatus.loading}
            />
        </Link>
    );
};
