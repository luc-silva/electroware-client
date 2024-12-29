import { WebsiteLogo } from "../WebsiteLogo/WebsiteLogo";
import { UserPanel } from "../UserPanel/UserPanel";
import { SearchForm } from "../../Forms/SearchForm/SearchForm";

import styles from "./Header.module.css";
import { HMenuBtn } from "../../Buttons/HamburguerMenuButton/HMenuBtn";
import { ProfileMenu } from "../ProfileMenu/ProfileMenu";
import { useState } from "react";

export const Header = () => {
    const [infoMenuActive, toggleInfoMenu] = useState(false);

    function handleInfoMenu() {
        toggleInfoMenu(!infoMenuActive);
    }

    return (
        <header className={styles["header"]}>
            <div className={styles["header__main"]}>
                <WebsiteLogo />
            </div>
            <div className={styles["header__form"]}>
                <SearchForm />
            </div>
            <div className={styles["header__hmenu"]}>
                <HMenuBtn toggleHMenu={() => {}} />
                {/* 
                    <HMenu
                        toggleHMenu={toggleHMenu}
                        isMenuActive={isHMenuActive}
                    />
                */}
            </div>
            <div className={styles["header__panel"]}>
                <UserPanel
                    isMenuActive={infoMenuActive}
                    handleInfoMenu={handleInfoMenu}
                />

                <ProfileMenu
                    isActive={infoMenuActive}
                    toggleMenu={handleInfoMenu}
                />
            </div>
        </header>
    );
};
