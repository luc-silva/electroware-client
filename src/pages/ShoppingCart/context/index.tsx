import { createContext, useContext } from "react";
import { useShoppingCart } from "../../../hooks/useShoppingCart";

export const ShoppingCartContext = createContext(
    {} as ReturnType<typeof useShoppingCart>
);

interface IProps {
    children: React.ReactNode;
}
export const ShoppingCartProvider = ({ children }: IProps) => {
    const config = useShoppingCart();

    return (
        <ShoppingCartContext.Provider value={config}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export const useCart = () => useContext(ShoppingCartContext);
