import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Misc/Header/Header";
import { useState } from "react";

//pages
import { Store } from "./pages/Store";
import { Login } from "./pages/Login/Login";
import { Registration } from "./pages/Registration/Registration";
import { Product } from "./pages/Product/Product";
import { Faq } from "./pages/Faq/Faq";
import { SearchResults } from "./pages/SearchResults/SearchResults";
import { NotFound } from "./pages/NotFound/NotFound";
import { UserProfile } from "./pages/UserProfile/UserProfile";
import { Checkout } from "./pages/Checkout/Checkout";
import { CreateOffer } from "./pages/CreateOffer/CreateOffer";
import { AddFunds } from "./pages/AddFunds/AddFunds";
import { Settings } from "./pages/Settings/Settings";
import { Category } from "./pages/Category/Category";
import { Wishlist } from "./pages/Wishlist/Wishlist";

import { PrivacyPolicy } from "./pages/PrivacyPolicy/PrivacyPolicy";
import { InfoToast } from "./components/Misc/InfoToast/InfoToast";

import { EditProfile } from "./components/Subpages/EditProfile/EditProfile";
import { SettingsUserProducts } from "./components/Subpages/SettingsUserProducts/SettingsUserProducts";
import { EditProduct } from "./components/Subpages/EditProduct/EditProduct";
import { SettingsCredentials } from "./components/Subpages/SettingsCredentials/SettingsCredentials";
import { ScrollToTop } from "./components/Misc/ScrollToTop";
import { ContextWrapper } from "./ContextWrapper";
import { CreateCollectionModal } from "./components/Misc/CreateCollectionModal/CreateCollectionModal";
import { SettingsTransaction } from "./components/Subpages/SettingsTransactions/SettingsTransaction";
import { DeleteAccount } from "./components/Subpages/DeleteAccount/DeleteAccount";
import { Footer } from "./components/Misc/Footer/Footer";
import { ShoppingCart } from "phosphor-react";

function Electroware() {
    //refatorar

    return (
        <div className="electroware">
            <ContextWrapper>
                <Router>
                    {/* misc */}
                    <ScrollToTop />

                    {/* modals/toasts */}
                    <InfoToast />
                    <CreateCollectionModal />

                    {/* heading/menus */}
                    <Header />

                    {/* pages */}
                    <Routes>
                        <Route path="/" element={<Store />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/registration"
                            element={<Registration />}
                        />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/faq" element={<Faq />} />

                        {/* need params */}
                        <Route path="/user/:id" element={<UserProfile />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route
                            path="/search/:search"
                            element={<SearchResults />}
                        />
                        <Route path="/category/:id" element={<Category />} />

                        {/* protected */}
                        <Route
                            path="/shopping-cart"
                            element={<ShoppingCart />}
                        />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/create-offer" element={<CreateOffer />} />
                        <Route path="/add-funds" element={<AddFunds />} />
                        <Route path="/settings" element={<Settings />}>
                            <Route path="" element={<EditProfile />} />
                            <Route
                                path="products/"
                                element={<SettingsUserProducts />}
                            />

                            <Route
                                path="products/:id"
                                element={<EditProduct />}
                            />
                            <Route
                                path="delete-account"
                                element={<DeleteAccount />}
                            />
                            <Route
                                path="transactions"
                                element={<SettingsTransaction />}
                            />
                            <Route
                                path="credentials"
                                element={<SettingsCredentials />}
                            />
                        </Route>

                        {/* misc */}
                        <Route path="/*" element={<NotFound />} />
                        <Route path="/not-found" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </Router>
            </ContextWrapper>
        </div>
    );
}

export default Electroware;
