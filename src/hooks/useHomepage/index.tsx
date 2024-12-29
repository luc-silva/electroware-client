import { useCallback, useEffect, useState } from "react";
import {
    getCategories,
    getProductsOnSale,
    getRecentProducts,
} from "../../service";

export const useHomepage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);

    const [productsOnSale, setProductsOnSale] = useState<ProductDetails[]>([]);
    const [isProductsOnSaleLoading, setIsProductsOnSaleLoading] =
        useState(false);

    const [recentlyListedProducts, setRecentlyListedProducts] = useState<
        ProductDetails[]
    >([]);
    const [isRecentlyListedProductsLoading, setIsRecentlyListedProducts] =
        useState(false);

    const loadCategories = useCallback(async () => {
        setIsCategoriesLoading(true);
        await getCategories()
            .then(setCategories)
            .finally(() => setIsCategoriesLoading(false));
    }, []);

    const loadProductsOnSale = useCallback(async () => {
        setIsProductsOnSaleLoading(true);
        await getProductsOnSale()
            .then(setProductsOnSale)
            .finally(() => setIsProductsOnSaleLoading(false));
    }, []);

    const loadRecentProducts = useCallback(async () => {
        setIsRecentlyListedProducts(true);
        await getRecentProducts()
            .then(setRecentlyListedProducts)
            .finally(() => setIsRecentlyListedProducts(false));
    }, []);

    useEffect(() => {
        loadCategories();
        loadProductsOnSale();
        loadRecentProducts();
    }, []);

    return {
        categories,
        productsOnSale,
        recentlyListedProducts,
        isCategoriesLoading,
        isProductsOnSaleLoading,
        isRecentlyListedProductsLoading,
    };
};
