import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { useState } from "react";

//pages
import { Store } from "./pages/Store";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { Product } from "./pages/Product";
import { Faq } from "./pages/Faq";
import { SearchResults } from "./pages/SearchResults";
import { NotFound } from "./pages/NotFound";
import { ShoppingCart } from "./pages/ShoppingCart";
import { UserProfile } from "./pages/UserProfile";
import { Checkout } from "./pages/Checkout";
import { CreateOffer } from "./pages/CreateOffer";
import { AddFunds } from "./pages/AddFunds";
import { Settings } from "./pages/Settings";
import { Category } from "./pages/Category";
import { Wishlist } from "./pages/Wishlist";

//
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Footer } from "./components/Misc/Footer";
import { InfoToast } from "./components/InfoToast";
import { CreateCollectionModal } from "./components/Modals/CreateCollectionModal";

// subpages
import { EditProfile } from "./components/Subpages/EditProfile";
import { DeleteAccount } from "./components/Subpages/DeleteAccount";
import { SettingsTransaction } from "./components/Subpages/SettingsTransaction";
import { SettingsUserProducts } from "./components/Subpages/SettingsUserProducts";
import { EditProduct } from "./components/Subpages/EditProduct";
import { SettingsCredentials } from "./components/Subpages/SettingsCredentials";
import { ScrollToTop } from "./components/Misc/ScrollToTop";
import { ContextWrapper } from "./ContextWrapper";

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
