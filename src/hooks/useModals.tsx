import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export const useModals = () => {
    const { toggleModal, setProductId } = useContext(ModalContext);

    function showCollectionModal(productId: string) {
        setProductId(productId);
        toggleModal("collectionModal");
    }

    return {showCollectionModal};
};
