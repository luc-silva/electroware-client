import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QuantityCounter } from "../../Misc/QuantityCounter/QuantityCounter";
import { ActionBtn } from "../ActionButton/ActionBtn";

import styles from "./ProductBtnPanel.module.css";
import { useToast } from "../../../hooks/useToast";
import { createCartInstance, removeProduct } from "../../../service";

export const ProductBtnPanel = ({
    user,
    product,
}: {
    product: ProductDetails;
    user: UserSession;
}) => {
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const { setToastMessage } = useToast();

    function redirect() {
        navigate("/login");
    }

    async function addToShoppingCart() {
        const data = {
            user: user.id,
            product: product._id,
            price: product.price,
            quantity: quantity,
        };

        await createCartInstance(data, user.token)
            .then(() => {
                navigate("/shopping-cart");
            })
            .catch(({ response }) => {
                setToastMessage(response.data.message, "warning");
            });
    }

    async function handleRemoveProduct() {
        await removeProduct(product._id, user.token).then(() => {
            navigate("/");
        });
    }

    return (
        <div className={styles["btn-panel"]}>
            {(user.logged &&
                ((user.id !== product.owner &&
                    ((product.quantity > 0 && (
                        <div className={styles["panel-container"]}>
                            <QuantityCounter
                                max={product.quantity}
                                quantity={quantity}
                                setQuantity={setQuantity}
                            />
                            <ActionBtn
                                onClick={addToShoppingCart}
                                textValue="Adicionar ao carrinho"
                            />
                        </div>
                    )) || (
                        <ActionBtn disabled textValue="Produto Esgotado" />
                    ))) || (
                    <div className={styles["panel-container"]}>
                        <ActionBtn
                            textValue="Remover anúncio"
                            onClick={handleRemoveProduct}
                        />
                    </div>
                ))) || (
                <button className={styles["login-button"]} onClick={redirect}>
                    Entre em sua conta para comprar
                </button>
            )}
        </div>
    );
};
