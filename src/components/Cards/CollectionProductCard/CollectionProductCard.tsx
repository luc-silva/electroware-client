import { deleteWishlistInstance } from "../../../service";
import { DeletebBtn } from "../../Buttons/DeleteButton/DeleteBtn";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./CollectionProductCard.module.css";

export const CollectionProductCard = ({
    data,
    userToken,
    updateCollection,
    showToast,
}: {
    data: WishlistItem;
    userToken: string;
    updateCollection: Function;
    showToast: Function;
}) => {
    async function deleteWishlistItem() {
        deleteWishlistInstance(userToken, data._id)
            .then(({ data }) => {
                updateCollection();
                showToast(data.message);
            })
            .catch(({ response }) => {
                showToast(response.data, "warning");
            });
    }
    return (
        <div className={styles["collection-card"]}>
            <ProductCard id={data.product} />
            <div className={styles["delete-btn"]}>
                <DeletebBtn onClick={deleteWishlistItem} />
            </div>
        </div>
    );
};
