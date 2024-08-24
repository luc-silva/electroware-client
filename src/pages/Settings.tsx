import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { SettingsNavigation } from "../components/Buttons/SettingsNavigation";
import styles from "./Settings.module.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export const Settings = () => {
    let navigate = useNavigate();
    const { user } = useContext(UserContext);

    //refatorar. criar componente a parte que checa as páginas
    useEffect(() => {
        if (!user.logged) {
            navigate("/login");
        }
    }, [user]);

    return (
        <main role={"main"} className={styles["settings"]}>
            <div className={styles["settings__navigation"]}>
                <SettingsNavigation />
            </div>
            <div className={styles["settings__panel"]}>
                <Outlet />
            </div>
        </main>
    );
};
