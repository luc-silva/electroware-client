import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createrOfferFormInitialValue } from "../../constants/initialStates";
import { UserImageInput } from "../Inputs/UserImageInput";

import { ProductForm } from "../Forms/ProductForm";

import styles from "./EditProduct.module.css";
import { PromoBox } from "../Misc/PromoBox";
import { UserContext } from "../../context/UserContext";
import { useToast } from "../../hooks/useToast";
import { getProductDetails, updateProduct } from "../../service";

export const EditProduct = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { setToastMessage } = useToast();

    const { id } = useParams();

    const [form, setForm] = useState(createrOfferFormInitialValue);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (id) {
            updateProduct(form, user.token, id).then((data) => {
                setToastMessage(data.message, "info");

                navigate(`/product/${id}`);
            });
        }
    }

    useEffect(() => {
        if (id) {
            getProductDetails(id).then(({ product, image }) => {
                setForm(product);
            });
        }
    }, []);
    return (
        <section className={styles["edit-product"]}>
            <div className={styles["edit-product__title"]}>
                <h2>Edite o produto</h2>
            </div>
            <div className={styles["edit-product__image-container"]}>
                <UserImageInput
                    inputType="productImage"
                    user={user}
                    productId={id}
                />
            </div>
            <div className={styles["edit-product__promo_container"]}>
                <PromoBox form={form} setForm={setForm} />
            </div>
            <div className={styles["edit-product__form-container"]}>
                <ProductForm
                    form={form}
                    method="PUT"
                    submitBtnText="Atualizar Produto"
                    handleSubmit={handleSubmit}
                    setForm={setForm}
                    user={user}
                />
            </div>
        </section>
    );
};
