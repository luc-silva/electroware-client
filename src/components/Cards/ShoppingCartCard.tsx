import ShoppingCartService from "../../services/ShoppingCartService";
import { useContext, useEffect, useMemo, useState } from "react";
import { createImage } from "../../utils/operations";
import { cardInitialState } from "../../constants/initialStates";

import { Trash } from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";
import { ImageBox } from "../Misc/ImageBox";

import styles from "./ShoppingCartCard.module.css";
import { UserContext } from "../../context/UserContext";

//rename to ShoppingCartCard
export const ProductCardSmall = ({
    instanceID,
    updateCart,
}: {
    instanceID: string;
    updateCart: Function;
}) => {
    const [instanceData, setInstanceData] = useState(cardInitialState);
    const [loading, toggleLoading] = useState(true);
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const userToken = useMemo(() => user.token, [user]);

    async function removeItem() {
        await ShoppingCartService.deleteCartInstance(
            instanceID,
            userToken
        ).then(() => {
            updateCart();
        });
    }

    function goToProductPage() {
        navigate(`/product/${instanceData.product._id}`);
    }

    useEffect(() => {
        ShoppingCartService.getSingleInstance(instanceID, user.token)
            .then(setInstanceData)
            .then(() => {
                toggleLoading(false);
            });
    }, [instanceID, user]);

    return (
        <div className={styles["container__item"]} onClick={goToProductPage}>
            <div className={styles["container__picture"]}>
                <ImageBox
                    isLoading={loading}
                    imgSrc={createImage(instanceData.productImage.data.data)}
                />
            </div>
            <div className={styles["container__details"]}>
                <div className={styles["details__main"]}>
                    <div className={styles["details__title"]}>
                        <p>{instanceData.product.name}</p>
                    </div>
                    <div className={styles["details__pricing"]}>
                        <strong>{`R$ ${
                            instanceData.quantity * instanceData.price
                        } `}</strong>
                        <p>{`UNIDS: ${instanceData.quantity} x ${instanceData.price} `}</p>
                    </div>
                </div>
                <div className={styles["container__footer"]}>
                    <p>{`Vendendor: ${instanceData.seller.name.first} ${instanceData.seller.name.last}`}</p>
                    <Trash
                        size={25}
                        color={`var(--text-color)`}
                        onClick={removeItem}
                    />
                </div>
            </div>
        </div>
    );
};
