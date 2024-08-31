import { FormEvent, useContext, useEffect, useState } from "react";
import { CloseBtn } from "../Buttons/CloseBtn";
import { CollectionForm } from "../Forms/CollectionForm";

import UserService from "../../services/UserService";
import WishlistService from "../../services/WishlistService";

import { CollectionCard } from "../Cards/CollectionCard";
import { stopEventPropagation } from "../../utils/operations";
import { ActionBtn } from "../Buttons/ActionBtn";

import styles from "./CreateCollectionModal.module.css";
import { NothingAvailableDialog } from "../Misc/NothingAvailableDialog";
import { UserContext } from "../../context/UserContext";
import { useToast } from "../../hooks/useToast";
import { ModalContext } from "../../context/ModalContext";
import { useModals } from "../../hooks/useModals";

export const CreateCollectionModal = () => {
    const [selectedCollectionId, setSelectedCollectionId] = useState("");
    const [collections, SetCollections] = useState<
        { _id: string; name: string }[]
    >([]);
    const { user } = useContext(UserContext);
    const { setToastMessage } = useToast();
    const { productId, active } = useContext(ModalContext);
    const { showCollectionModal } = useModals();

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (productId) {
            const data = {
                product: productId,
                group: selectedCollectionId,
            };
            await WishlistService.createWishlistInstance(data, user.token)
                .then(({ message }) => {
                    setToastMessage(message);
                    showCollectionModal(productId);
                })
                .catch(({ response }) => {
                    setToastMessage(response.data, "warning");
                });
        }
    }

    async function getUserCollections() {
        await UserService.getUserCollections(user.id, user.token).then(
            (data) => {
                SetCollections(data);
            }
        );
    }
    useEffect(() => {
        if (user.id) {
            getUserCollections();
        }
    }, [user.id, active.collectionModal]);

    if (!active.collectionModal) return null;
    return (
        <div
            className={styles["create-collection"]}
            onClick={() => {
                showCollectionModal(productId);
            }}
        >
            <div
                className={styles["create-collection__wrapper"]}
                onClick={stopEventPropagation}
            >
                <CloseBtn onClick={() => showCollectionModal(productId)} />
                <div className={styles["create-collection__title"]}>
                    <h2>Suas listas de desejos</h2>
                    <p>Adicione esse produto à uma lista personalizada.</p>
                </div>
                <div className={styles["create-collection__main"]}>
                    <div className={styles["create-collection__form"]}>
                        <CollectionForm
                            user={user}
                            updateCollections={getUserCollections}
                        />
                    </div>
                    <div className={styles["create-collection__container"]}>
                        <div
                            className={
                                styles["create-collection__container__title"]
                            }
                        >
                            <h3>Escolha uma lista</h3>
                        </div>
                        <div
                            className={
                                styles["create-collection__card__container"]
                            }
                        >
                            {(collections.length > 0 &&
                                collections.map((collection, index) => {
                                    return (
                                        <CollectionCard
                                            data={collection}
                                            setChosenCollection={
                                                setSelectedCollectionId
                                            }
                                            selectedCollection={
                                                selectedCollectionId
                                            }
                                            key={index}
                                        />
                                    );
                                })) || (
                                <NothingAvailableDialog text="Você precisar criar uma lista" />
                            )}
                        </div>
                    </div>
                    <div className={styles["create-collection__action-btn"]}>
                        <ActionBtn
                            textValue="Adicionar Item"
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
