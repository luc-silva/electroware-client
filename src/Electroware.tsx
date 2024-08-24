import { userSessionInitialState } from "./constants/initialStates";
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
import { ProfileMenu } from "./components/ProfileMenu";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Footer } from "./components/Misc/Footer";
import { HMenu } from "./components/Misc/HMenu";
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
import { UserProvider } from "./context/UserContext";

function Electroware() {
    let [infoMenuActive, toggleInfoMenu] = useState(false);
    function handleInfoMenu() {
        toggleInfoMenu(!infoMenuActive);
    }

    //refatorar
    let [isHMenuActive, toggleHMenu] = useState(false);
    function toggleHamburguerMenu() {
        toggleHMenu(!isHMenuActive);
    }

    let [isToastActive, toggleToast] = useState(false);
    let [toastMessage, setToastMessage] = useState("");
    let [toastType, setToastType] = useState("info" as "info" | "warning");
    function showToast(
        message: string,
        toastType: "info" | "warning" = "info"
    ) {
        setToastType(toastType);
        setToastMessage(message);
        toggleToast(true);
    }

    let [isCollectionModalActive, toggleCollectionModal] = useState(false);
    let [product, setProduct] = useState("");
    function showCollectionModal(activate: boolean = true, productId: string) {
        setProduct(productId);
        toggleCollectionModal(activate);
    }

    return (
        <div className="electroware">
            <UserProvider>
                <Router>
                    {/* misc */}
                    <ScrollToTop />

                    {/* modals/toasts */}
                    <InfoToast
                        isActive={isToastActive}
                        toggle={toggleToast}
                        message={toastMessage}
                        type={toastType}
                    />
                    <CreateCollectionModal
                        toggleModal={toggleCollectionModal}
                        isActive={isCollectionModalActive}
                        showToast={showToast}
                        product={product}
                    />

                    {/* heading/menus */}
                    <Header
                        handleInfoMenu={handleInfoMenu}
                        isMenuActive={infoMenuActive}
                        toggleHMenu={toggleHamburguerMenu}
                    />
                    <ProfileMenu
                        isActive={infoMenuActive}
                        toggleMenu={toggleInfoMenu}
                    />
                    <HMenu
                        toggleHMenu={toggleHMenu}
                        isMenuActive={isHMenuActive}
                    />

                    {/* pages */}
                    <Routes>
                        <Route path="/" element={<Store />} />
                        <Route
                            path="/login"
                            element={<Login showToast={showToast} />}
                        />
                        <Route
                            path="/registration"
                            element={<Registration showToast={showToast} />}
                        />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/faq" element={<Faq />} />

                        {/* need params */}
                        <Route path="/user/:id" element={<UserProfile />} />
                        <Route
                            path="/product/:id"
                            element={
                                <Product
                                    showToast={showToast}
                                    toggleCollectionModal={showCollectionModal}
                                />
                            }
                        />
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
                        <Route
                            path="/wishlist"
                            element={<Wishlist showToast={showToast} />}
                        />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/create-offer" element={<CreateOffer />} />
                        <Route path="/add-funds" element={<AddFunds />} />
                        <Route path="/settings" element={<Settings />}>
                            <Route
                                path=""
                                element={<EditProfile showToast={showToast} />}
                            />
                            <Route
                                path="products/"
                                element={
                                    <SettingsUserProducts
                                        showToast={showToast}
                                    />
                                }
                            />

                            <Route
                                path="products/:id"
                                element={<EditProduct showToast={showToast} />}
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
                                element={
                                    <SettingsCredentials
                                        showToast={showToast}
                                    />
                                }
                            />
                        </Route>

                        {/* misc */}
                        <Route path="/*" element={<NotFound />} />
                        <Route path="/not-found" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </Router>
            </UserProvider>
        </div>
    );
}

export default Electroware;
