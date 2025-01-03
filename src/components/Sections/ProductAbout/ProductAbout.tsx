import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createImage } from "../../../utils/operations";
import { ProductBtnPanel } from "../../Buttons/ProductButton/ProductBtnPanel";
import { ImageBox } from "../../Misc/ImageBox/ImageBox";
import { CardPriceDisplay } from "../../Displays/CardPriceDisplay/CardPriceDisplay";
import { BookmarkBtn } from "../../Buttons/BookmarkButton/BookmarkBtn";


import styles from "./ProductAbout.module.css";
import { useToast } from "../../../hooks/useToast";
import { ModalContext } from "../../../context/ModalContext";
import { useModals } from "../../../hooks/useModals";
import { getCategory, getUserInfo } from "../../../service";

export const ProductAbout = ({
    productDetails,
    user,
    status,
}: {
    productDetails: ProductData;
    user: UserSession;
    status: boolean;
}) => {
    const [owner, setOwner] = useState({ first: "", last: "" });
    const [category, setCategory] = useState("");
    const { showCollectionModal } = useModals();

    async function handleWishlist() {
        showCollectionModal(productDetails.product._id);
    }

    useEffect(() => {
        if (productDetails.product.owner) {
            getUserInfo(productDetails.product.owner).then((data) => {
                setOwner(data.name);
            });
        }
        getCategory(productDetails.product.category).then((data) => {
            setCategory(data.name);
        });
    }, [productDetails]);

    return (
        <section className={styles["product__about"]}>
            <div className={styles["product-image"]}>
                <ImageBox
                    isLoading={status}
                    imgSrc={createImage(productDetails.image.data.data)}
                />
            </div>
            <div className={styles["product-details"]}>
                <div className={styles["details-info"]}>
                    <div className={styles["details-header"]}>
                        <div className={styles["details-main"]}>
                            <div className={styles["details-title"]}>
                                {(status && (
                                    <div className={styles["loading-line"]} />
                                )) || <h1>{productDetails.product.name}</h1>}
                            </div>
                            <div className={styles["details-category"]}>
                                {(status && (
                                    <div className={styles["loading-line"]} />
                                )) || (
                                    <em>
                                        <Link
                                            to={`/category/${productDetails.product.category}`}
                                        >
                                            {category}
                                        </Link>
                                    </em>
                                )}
                            </div>
                        </div>
                        {user.logged &&
                            user.id !== productDetails.product.owner && (
                                <BookmarkBtn onClick={handleWishlist} />
                            )}
                    </div>
                    <div className={styles["details-pricing"]}>
                        <div className={styles["details-seller"]}>
                            {(status && (
                                <div className={styles["loading-line"]} />
                            )) || (
                                <p>
                                    {`Vendedor: `}
                                    <Link
                                        to={`/user/${productDetails.product.owner}`}
                                    >{`${owner.first} ${owner.last}`}</Link>
                                </p>
                            )}
                        </div>
                        <div className={styles["details-price"]}>
                            {(status && (
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
                    <div className={styles["details-description"]}>
                        {(status && (
                            <div className={styles["loading-line"]} />
                        )) ||
                            productDetails.product.description ||
                            "Nenhuma descrição disponível"}
                    </div>
                </div>
                <div className={styles["details-misc"]}>
                    <p>{`Unidades disponíveis: ${productDetails.product.quantity}`}</p>
                    <ProductBtnPanel
                        user={user}
                        product={productDetails.product}
                    />
                </div>
            </div>
        </section>
    );
};
