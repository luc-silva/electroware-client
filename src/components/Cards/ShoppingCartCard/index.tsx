import { useEffect, useMemo, useState } from "react";
import { createImage } from "../../../utils/operations";
import { cardInitialState } from "../../../constants/initialStates";

import { Trash } from "phosphor-react";
import { ImageBox } from "../../Misc/ImageBox/ImageBox";

import styles from "./styles.module.css";
import { useCart } from "../../../pages/ShoppingCart/context";
import { ContainerDetails } from "./ContainerDetails";

//rename to ShoppingCartCard
export const ProductCardSmall = ({ instanceID }: { instanceID: string }) => {
    const {
        goToProductPage,
        loadProductDetails,
        isCurrentCartProductLoading,
        currentCartProduct,
    } = useCart();

    const handleRedirect = () => {
        goToProductPage(instanceID);
    };

    useEffect(() => {
        loadProductDetails(instanceID);
    }, [instanceID]);

    const productImage = useMemo(() => {
        if (currentCartProduct) {
            return createImage(currentCartProduct.image.data.data);
        }
        return "";
    }, []);

    return (
        <div className={styles["container__item"]} onClick={handleRedirect}>
            <div className={styles["container__picture"]}>
                <ImageBox isLoading={isCurrentCartProductLoading} imgSrc={productImage} />
            </div>
            <ContainerDetails />
        </div>
    );
};
