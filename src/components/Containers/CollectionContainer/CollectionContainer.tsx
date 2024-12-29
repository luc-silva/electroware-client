import { useEffect, useState } from "react";

import { VisibilityBtn } from "../../Buttons/VisibilityButton/VisibilityBtn";
import { DeletebBtn } from "../../Buttons/DeleteButton/DeleteBtn";
import styles from "./CollectionContainer.module.css";
import { useToast } from "../../../hooks/useToast";
import {
    deleteCollection,
    getCollectionProducts,
    updateCollection,
} from "../../../service";
import { CollectionProductCard } from "../../Cards/CollectionProductCard/CollectionProductCard";

export const CollectionContainer = ({
    data,
    user,
    updateCollections,
}: {
    data: WishlistCollection;
    user: UserSession;
    updateCollections: Function;
}) => {
    const [items, setItems] = useState([]);
    const { setToastMessage } = useToast();

    async function handleUpdateCollection() {
        await getCollectionProducts(data._id).then((data) => {
            setItems(data);
        });
    }

    async function changeVisibility() {
        await updateCollection(user.token, data._id, {
            ...data,
            privated: !data.privated,
        }).then((data) => {
            updateCollections();
            setToastMessage(data.message);
        });
    }
    async function deletecCollection() {
        await deleteCollection(user.token, data._id)
            .then((data) => {
                updateCollections();
                setToastMessage(data.message);
            })
            .catch(({ response }) => {
                setToastMessage(response.data, "warning");
            });
    }

    useEffect(() => {
        if (data._id) {
            handleUpdateCollection();
        }
    }, [data._id]);
    return (
        <div className={styles["collection-container"]}>
            <div className={styles["collection-container__header"]}>
                <div className={styles["collection-container__title"]}>
                    <h3>{data.name}</h3>
                </div>
                <div className={styles["collection-container__btn-panel"]}>
                    <div className={styles["visibility-btn"]}>
                        <VisibilityBtn
                            isHidden={data.privated}
                            onClick={changeVisibility}
                        />
                    </div>
                    <div>
                        <DeletebBtn onClick={deletecCollection} />
                    </div>
                </div>
            </div>
            {(items.length > 0 && (
                <div className={styles["collection-container__itens"]}>
                    {items.map((item: WishlistItem, index: React.Key) => {
                        return (
                            <CollectionProductCard
                                data={item}
                                updateCollection={updateCollection}
                                userToken={user.token}
                                key={index}
                                showToast={setToastMessage}
                            />
                        );
                    })}
                </div>
            )) || (
                <div className={styles["collection-dialog"]}>
                    Coleção vazia.
                </div>
            )}
        </div>
    );
};
