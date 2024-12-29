import { Link } from "react-router-dom";

import { CaretDown, CaretUp } from "phosphor-react";
import { PageIcons } from "../PageIcons/PageIcons";
import styles from "./UserPanel.module.css";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

export const UserPanel = ({
    handleInfoMenu,
    isMenuActive,
}: {
    handleInfoMenu: Function;
    isMenuActive: boolean;
}) => {
    const { user } = useContext(UserContext);

    const showModal = () => {
        handleInfoMenu();
    };

    return (
        <>
            {(user.logged && (
                <div className={styles["panel__main--logged"]}>
                    <PageIcons />
                    <div className={styles["panel__user"]} onClick={showModal}>
                        <div>
                            <strong>{`Olá, ${user.username}`}</strong>
                            <p>Ver infos</p>
                        </div>
                        {(isMenuActive && (
                            <CaretUp size={30} color="white" />
                        )) || <CaretDown size={30} color="white" />}
                    </div>
                </div>
            )) || (
                <div className={styles["panel__main"]}>
                    <Link to="/login">Entre em sua conta</Link>
                </div>
            )}
        </>
    );
};
