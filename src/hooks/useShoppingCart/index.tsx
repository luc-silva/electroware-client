import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import {
    deleteCartInstance,
    getCartInstances,
    getSingleInstance,
} from "../../service";
import { getTotalValue } from "../../utils/operations";

export const useShoppingCart = () => {
    const { user, userToken } = useContext(UserContext);

    const [cartItems, setCartItems] = useState([] as CartItem[]);
    const [isCartItemsLoading, setIsCartItemsLoading] = useState(false);

    const [currentCartProduct, setCurrentCartProduct] =
        useState<ProductData | null>(null);
    const [isCurrentCartProductLoading, setIsCurrentCartProductLoading] =
        useState(false);

    const navigate = useNavigate();

    const redirectToCheckout = () => {
        navigate("/checkout");
    };

    const loadShoppingCartItems = async () => {
        setIsCartItemsLoading(true);
        await getCartInstances(user.token)
            .then(setCartItems)
            .finally(() => setIsCartItemsLoading(false));
    };

    const removeItem = async (instanceID: string) => {
        await deleteCartInstance(instanceID, user.token).then(() => {
            loadShoppingCartItems();
        });
    };

    const goToProductPage = (productId: string) => {
        navigate(`/product/${productId}`);
    };

    const loadProductDetails = async (instanceID: string) => {
        setIsCurrentCartProductLoading(true);
        return await getSingleInstance(instanceID, userToken)
            .then(setCurrentCartProduct)
            .finally(() => {
                setIsCurrentCartProductLoading(false);
            });
    };

    const productDetails = useMemo(() => {
        if (currentCartProduct) {
            return currentCartProduct.product;
        }
        return null;
    }, [currentCartProduct]);

    const cartTotalValue = useMemo(() => {
        if (cartItems) {
            return getTotalValue(cartItems);
        }
        return 0;
    }, [cartItems]);

    useEffect(() => {
        if (!user.logged) {
            navigate("/login");
        }
        loadShoppingCartItems();
    }, []);

    return {
        cartItems,
        isCartItemsLoading,
        redirectToCheckout,
        removeItem,
        goToProductPage,
        currentCartProduct,
        productDetails,
        isCurrentCartProductLoading,
        loadProductDetails,
        cartTotalValue,
    };
};
