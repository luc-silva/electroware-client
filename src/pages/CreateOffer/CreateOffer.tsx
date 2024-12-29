import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProductForm } from "../components/Forms/ProductForm";
import { createrOfferFormInitialValue } from "../../constants/initialStates";

import styles from "./CreateOffer.module.css";
import { ImageBox } from "../../components/Misc/ImageBox/ImageBox";
import { UserContext } from "../../context/UserContext";
import { createProduct } from "../../service";

export const CreateOffer = () => {
    const { user } = useContext(UserContext);

    const navigate = useNavigate();
    useEffect(() => {
        if (!user.logged) {
            navigate("/login");
        }
    }, []);

    const blobInitialState = null as File | null;

    const [productImage, setProductImage] = useState("");
    const [productBlob, setProductBlob] = useState(blobInitialState);

    function setImage(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (files && files[0]) {
            setProductBlob(files[0]);
            setProductImage(URL.createObjectURL(files[0]));
        }
    }

    const [form, setForm] = useState(createrOfferFormInitialValue);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData();

        if (productBlob instanceof File) {
            formData.append("imageField", productBlob);
            formData.append("product", JSON.stringify(form, null));

            await createProduct(formData, user.token).then((data) => {
                navigate(`/product/${data.productID}`);
            });
        }
    }

    return (
        <main role={"main"} className={styles["create-offer"]}>
            <section className={styles["create-offer__title"]}>
                <h2>Crie o seu anúncio</h2>
            </section>
            <section className={styles["create-offer__main"]}>
                <section className={styles["create-offer__image"]}>
                    <div className={styles["create-offer__image-container"]}>
                        <ImageBox isLoading={false} imgSrc={productImage} />
                    </div>
                    <div className={styles["input-container"]}>
                        <input
                            type="file"
                            name="productImage"
                            onChange={setImage}
                        />
                    </div>
                </section>
                <div className={styles["create-offer__form-container"]}>
                    <ProductForm
                        user={user}
                        form={form}
                        method="POST"
                        submitBtnText="Criar Anúncio"
                        setForm={setForm}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </section>
        </main>
    );
};
