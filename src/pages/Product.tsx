import ProductService from "../services/ProductService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { productPageInitialState } from "../constants/initialStates";

import { ProductAbout } from "../components/Sections/ProductAbout";
import { ProductReviews } from "../components/Sections/ProductReviews";

import styles from "./Product.module.css";

export const Product = ({
    user,
    showToast,
    toggleCollectionModal,
}: {
    user: UserSession;
    showToast: Function;
    toggleCollectionModal: Function;
}) => {
    let { id } = useParams();
    const navigate = useNavigate();

    let [productDetails, setProductDetails] = useState(productPageInitialState);
    let [infoStatus, toggleInfoStatus] = useState(true);



    useEffect(() => {
        if (id) {
            ProductService.getProductDetails(id)
                .then((data: any) => {
                    toggleInfoStatus(false);
                    setProductDetails(data);
                })
                .catch(() => {
                    navigate("/not-found");
                });
        }
    }, [id]);
   

    return (
        <main className={styles["product"]}>
            <div className={styles["product__about__section"]}>
                <ProductAbout
                    user={user}
                    productDetails={productDetails}
                    status={infoStatus}
                    showToast={showToast}
                    toggleCollectionModal={toggleCollectionModal}
                />
            </div>
            <div className={styles["product__reviews__section"]}>
                <ProductReviews user={user} product={productDetails.product}/>
            </div>
        </main>
    );
};
