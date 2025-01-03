import { Link } from "react-router-dom";
import styles from "./HMenu.module.css";
import { X } from "phosphor-react";

import { HMenuNavigation } from "../HamburguerMenuNavigation/HMenuNavigation";
import { PageIcons } from "../PageIcons/PageIcons";
import { SearchForm } from "../../Forms/SearchForm/SearchForm";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { HMenuUserDetails } from "../HamburguerMenuUserDetails/HMenuUserDetails";

export const HMenu = ({
    isMenuActive,
    toggleHMenu,
}: {
    isMenuActive: boolean;
    toggleHMenu: Function;
}) => {
    const { setUser, user } = useContext(UserContext);

    function closeMenu() {
        toggleHMenu();
    }

    if (!isMenuActive) return null;
    return (
        <div className={styles["hmenu"]}>
            <div className={styles["hmenu__header"]}>
                <div className={styles["hmenu__main"]}>
                    {(user.logged && <HMenuUserDetails user={user} />) || null}
                </div>
                <div className={styles["hmenu__close-btn"]}>
                    <X size={30} weight="bold" onClick={closeMenu} />
                </div>
            </div>
            {(user.logged && (
                <>
                    <div className={styles["hmenu__search"]}>
                        <SearchForm closeModal={closeMenu} />
                    </div>
                    <div className={styles["hmenu__icons"]}>
                        <PageIcons onClick={closeMenu} />
                    </div>
                    <HMenuNavigation closeMenu={closeMenu} setUser={setUser} />
                </>
            )) || (
                <div className={styles["hmenu__login-dialog"]}>
                    <h2>Entre em sua conta.</h2>
                    <ul className={styles["hmenu__login-dialog__links"]}>
                        <li onClick={closeMenu}>
                            <Link to={"/login"}>Acessar conta.</Link>
                        </li>
                        <li onClick={closeMenu}>
                            <Link to={"/registration"}>Criar conta.</Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};
