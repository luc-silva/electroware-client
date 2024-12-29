
import { NotePencil, Trash } from "phosphor-react";
import styles from "./SettingsProductCard.module.css";
import { useNavigate } from "react-router-dom";
import { removeProduct } from "../../../service";
import { useToast } from "../../../hooks/useToast";
import { UserProductCard } from "../UserProductCard/UserProductCard";

export const SettingsProductCard = ({
    id,
    userToken,
    update,
}: {
    id: string;
    userToken: string;
    update: Function;
}) => {
    const navigate = useNavigate();
    const { setToastMessage } = useToast();

    async function deleteProduct() {
        await removeProduct(id, userToken).then(({ data }) => {
            setToastMessage(data.message, "info");
            update();
        });
    }
    function editProduct() {
        navigate(`${id}`);
    }

    return (
        <div className={styles["settings-product"]}>
            <div className={styles["settings-product__card"]}>
                <UserProductCard id={id} />
            </div>
            <div className={styles["settings-product__buttons"]}>
                <button className={styles["edit-btn"]}>
                    <NotePencil size={30} onClick={editProduct} />
                </button>
                <button className={styles["close-btn"]}>
                    <Trash size={30} onClick={deleteProduct} />
                </button>
            </div>
        </div>
    );
};
