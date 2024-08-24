import { WebsiteLogo } from "./Misc/WebsiteLogo";
import { UserPanel } from "./Misc/UserPanel";
import { SearchForm } from "./Forms/SearchForm";

import styles from "./Header.module.css";
import { HMenuBtn } from "./Buttons/HMenuBtn";
import { ProfileMenu } from "./ProfileMenu";
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
