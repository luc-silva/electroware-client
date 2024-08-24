import { Link } from "react-router-dom";
import { userSessionInitialState } from "../constants/initialStates";

//styles
import { Money, Note, Question, SignOut, Sliders } from "phosphor-react";
import styles from "./ProfileMenu.module.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const ProfileMenu = ({
    isActive,
    toggleMenu,
}: {
    isActive: Boolean;
    toggleMenu: Function;
}) => {
    const { user, setUser } = useContext(UserContext);

    function handleLogout() {
        toggleMenu();
        setUser(userSessionInitialState);
    }

    if (!isActive || window.innerWidth < 769) return null;
    return (
        <div
            className={styles["profile-menu"]}
            role="menu"
            onClick={() => {
                toggleMenu();
            }}
        >
            <div className={styles["profile-menu__links"]}>
                <Link to={"/add-funds"}>
                    <Money size={20} color="var(--text-color)" />
                    <p>{`Saldo: ${user.funds} R$`}</p>
                </Link>
                <Link to={"/create-offer"}>
                    <Note size={20} color="var(--text-color)" />
                    <p>Anunciar Produto</p>
                </Link>
                <Link to={"/settings/"}>
                    <Sliders size={20} color="var(--text-color)" />
                    <p>Configurações</p>
                </Link>
                <Link to={"/faq"}>
                    <Question size={20} color="var(--text-color)" />
                    <p>FAQ</p>
                </Link>
            </div>
            <div className={styles["profile-menu__sign-out"]}>
                <Link to={"/"} onClick={handleLogout}>
                    <SignOut size={20} />
                    <p>Sair</p>
                </Link>
            </div>
        </div>
    );
};
