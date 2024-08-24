import { createContext, useState } from "react";

type Modals = { [key: string]: boolean };

interface ModalContextProps {
    active: Modals;
    productId: string;
    setProductId: React.Dispatch<React.SetStateAction<string>>;
    toggleModal: (modalKey: string) => void;
}

const modalsContextInitialState: ModalContextProps = {
    active: {
        collectionModal: false,
    },
    productId: "",
    toggleModal: () => {},
    setProductId: () => {},
};

export const ModalContext = createContext(modalsContextInitialState);

export const ModalProvider = ({ children }: { children: JSX.Element }) => {
    const [productId, setProductId] = useState<string>('');
    const [modals, setModals] = useState<Modals>({
        collectionModal: false,
    });

    const toggleModal = (key: string) => {
        setModals((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const config = {
        active: modals,
        toggleModal,
        productId,
        setProductId,
    };

    return (
        <ModalContext.Provider value={config}>{children}</ModalContext.Provider>
    );
};
