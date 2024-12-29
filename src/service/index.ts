import axios from "axios";
import {
    categoryUrl,
    collectionUrl,
    imageUrl,
    productUrl,
    reviewUrl,
    shoppingCartUrl,
    transactionUrl,
    userUrl,
    wishlistUrl,
} from "./proxy";

const createHeader = (authToken: string) => {
    return {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    };
};

//category
export const getCategory = async (categoryId: string) => {
    return await axios.get(categoryUrl + categoryId).then(({ data }) => {
        return data;
    });
};
export const getCategories = async () => {
    return await axios.get<Category[]>(categoryUrl).then(({ data }) => data);
};
export const getCategoryProducts = async (categoryId: string) => {
    const URL = `${categoryUrl}${categoryId}/products`;
    return await axios.get(URL).then(({ data }) => data);
};

//image
export const uploadImage = async (body: any, token: string) => {
    return await axios.post(imageUrl + "upload", body, createHeader(token));
};
export const getUserImage = async (userId: string) => {
    return axios.get(imageUrl + `user/${userId}`).then(({ data }) => data.data);
};
export const getProductImage = async (productId: string) => {
    return axios
        .get(imageUrl + `product/${productId}`)
        .then(({ data }) => data.data);
};

//product
export const createProduct = async (data: FormData, token: string) => {
    return await axios
        .post(productUrl + "create", data, createHeader(token))
        .then(({ data }) => data);
};
export const updateProduct = async (
    data: ProductDTO,
    token: string,
    productId: string
) => {
    return await axios
        .put(productUrl + productId, data, createHeader(token))
        .then(({ data }) => data);
};
export const getRecentProducts = async () => {
    return await axios
        .get<ProductDetails[]>(productUrl)
        .then(({ data }) => data);
};
export const getProductsOnSale = async () => {
    return await axios.get(productUrl + "discount").then(({ data }) => data);
};
export const getProductDetails = async (productId: string) => {
    return await axios
        .get(productUrl + `${productId}`)
        .then(({ data }) => data);
};
export const getProductReviews = async (productId: string) => {
    return await axios
        .get(productUrl + `${productId}/reviews`)
        .then(({ data }) => data);
};
export const searchProduct = async (keyword: string) => {
    return axios
        .post(productUrl + `search/${keyword}`)
        .then(({ data }) => data);
};
export const removeProduct = async (productId: string, token: string) => {
    return axios.delete(productUrl + productId, createHeader(token));
};
export const getProductScore = async (productId: string) => {
    return axios
        .get(productUrl + `${productId}/reviews/score`)
        .then(({ data }) => data);
};

//review
export const getReview = async (reviewId: string) => {
    return await axios.get(reviewUrl + reviewId).then(({ data }) => data);
};
export const submitReview = async (data: ReviewBody, token: string) => {
    return await axios.post(reviewUrl, data, createHeader(token));
};
export const deleteReview = async (reviewId: string, token: string) => {
    return await axios.delete(reviewUrl + reviewId, createHeader(token));
};

//cart
export const getCartInstances = async (token: string) => {
    return await axios
        .get(shoppingCartUrl, createHeader(token))
        .then(({ data }) => data);
};
export const getSingleInstance = async (instanceId: string, token: string) => {
    return await axios
        .get(shoppingCartUrl + `/${instanceId}`, createHeader(token))
        .then(({ data }) => data);
};
export const createCartInstance = async (
    body: CartInstanceBody,
    token: string
) => {
    return await axios
        .post(shoppingCartUrl, body, createHeader(token))
        .then(({ data }) => data);
};
export const deleteCartInstance = async (instanceId: string, token: string) => {
    return axios
        .delete(shoppingCartUrl + `/${instanceId}`, createHeader(token))
        .then((data) => data);
};

//transaction
export const createTransaction = async (
    body: TransactionBody,
    token: string
) => {
    return axios.post(transactionUrl, body, createHeader(token));
};
export const getTransactions = async () => {};

//user
export const registerUser = async (data: RegistrationBody) => {
    return await axios.post(userUrl + "register", data);
};
export const logInUser = async (data: LogInBody) => {
    return await axios.post(userUrl + "login", data).then(({ data }) => data);
};
export const updateUserPassword = async (
    token: string,
    data: { password: string; new_password: string }
) => {
    return axios.patch(
        userUrl + "private/details/password",
        data,
        createHeader(token)
    );
};

export const updateUserEmail = async (
    token: string,
    data: { email: string }
) => {
    return axios.patch(
        userUrl + "private/details/email",
        data,
        createHeader(token)
    );
};
export const getUserInfo = async (userId: string) => {
    return await axios.get(userUrl + `${userId}`).then(({ data }) => data);
};
export const getUserProducts = async (userId: string) => {
    return await axios
        .get(userUrl + `${userId}/products`)
        .then(({ data }) => data);
};
export const getUserProductsReceivedReviews = async (userId: string) => {
    return await axios
        .get(userUrl + `${userId}/products/reviews`)
        .then(({ data }) => data);
};
export const getUserPrivateInfo = async (userId: string, token: string) => {
    return await axios
        .get(userUrl + `private/${userId}`, createHeader(token))
        .then(({ data }) => data);
};
export const getUserTransactions = async (userId: string, token: string) => {
    return await axios
        .get(userUrl + `${userId}/transactions/`, createHeader(token))
        .then(({ data }) => data);
};
export const getUserPublicCollections = async (
    userId: string,
    token: string
) => {
    return await axios
        .get(userUrl + `${userId}/collections`)
        .then(({ data }) => data);
};
export const getUserCollections = async (userId: string, token: string) => {
    return await axios
        .get(userUrl + `${userId}/private/collections`, createHeader(token))
        .then(({ data }) => data);
};
export const addFunds = async (amount: number, token: string) => {
    return await axios
        .patch(userUrl + "billings/add", { amount }, createHeader(token))
        .then(({ data }) => data);
};
export const deleteAccount = async (userId: string, token: string) => {
    return await axios.delete(userUrl + userId, createHeader(token));
};
export const updateAccountDetails = async (
    userId: string,
    token: string,
    body: any
) => {
    return await axios.put(userUrl + userId, body, createHeader(token));
};

//collection
export const getCollectionProducts = async (collectionId: string) => {
    return await axios
        .get(collectionUrl + `${collectionId}/products`)
        .then(({ data }) => data);
};
export const createCollection = async (token: string, collectionData: any) => {
    return await axios
        .post(collectionUrl, collectionData, createHeader(token))
        .then(({ data }) => data);
};
export const deleteCollection = async (token: string, collectionId: string) => {
    return await axios
        .delete(collectionUrl + collectionId, createHeader(token))
        .then(({ data }) => data);
};
export const updateCollection = async (
    token: string,
    collectionId: string,
    updatedData: WishlistCollection
) => {
    return await axios
        .put(collectionUrl + collectionId, updatedData, createHeader(token))
        .then(({ data }) => data);
};

//wishlist
export const deleteWishlistInstance = async (
    token: string,
    instanceId: string
) => {
    return axios.delete(wishlistUrl + instanceId, createHeader(token));
};
export const getWishlistItems = async (token: string) => {
    return axios.get(wishlistUrl, createHeader(token)).then(({ data }) => data);
};
export const createWishlistInstance = async (
    data: WishlistBody,
    token: string
) => {
    return await axios
        .post(wishlistUrl, data, createHeader(token))
        .then(({ data }) => data);
};
