import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { productPageInitialState } from "../../constants/initialStates";

import { ProductAbout } from "../../components/Sections/ProductAbout/ProductAbout";
import { ProductReviews } from "../../components/Sections/ProductReviews/ProductReviews";

import { RecentViewedProducts } from "../../components/Displays/RecentViewedProducts/RecentViewedProducts";
import { UserContext } from "../../context/UserContext";
import { getProductDetails } from "../../service";
import styles from "./Product.module.css";

export const Product = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(
        productPageInitialState
    );
    const [infoStatus, toggleInfoStatus] = useState(true);

    useEffect(() => {
        if (id) {
            getProductDetails(id)
                .then((data: any) => {
                    toggleInfoStatus(false);
                    setProductDetails(data);
                })
                .catch(() => {
                    navigate("/not-found");
                });
        }
    }, [id, navigate]);
    useEffect(() => {
        let viewedProducts: string[] = [];

        if (user.logged) {
            viewedProducts = [...user.viewedProducts];
            const product = productDetails.product._id;

            if (!viewedProducts.includes(product) && product) {
                if (viewedProducts.length === 5) {
                    viewedProducts.pop();
                }
                viewedProducts.unshift(productDetails.product._id);
                setUser({ ...user, viewedProducts });
            }
        }
    }, [user.logged, productDetails.product._id, setUser]);

    return (
        <main className={styles["product"]}>
            <div className={styles["product__about__section"]}>
                <ProductAbout
                    user={user}
                    productDetails={productDetails}
                    status={infoStatus}
                />
            </div>
            <div className={styles["product__reviews__section"]}>
                <ProductReviews product={productDetails.product} />
            </div>
            <div className={styles["product__recent__section"]}>
                <RecentViewedProducts viewedProducts={user.viewedProducts} />
            </div>
        </main>
    );
};
