import { Warning } from "phosphor-react";

import styles from "./DeleteAccount.module.css";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { deleteAccount } from "../../../service";
import { PrivacyCard } from "../../Cards/PrivacyCard/PrivacyCard";

export const DeleteAccount = () => {
    const { user } = useContext(UserContext);

    async function handleDeleteAccountBtn() {
        await deleteAccount(user.id, user.token);
    }

    return (
        <section className={styles["delete-account"]}>
            <div className={styles["delete-account__title"]}>
                <h3>Excluir conta</h3>
            </div>
            <div className={styles["delete-account__main"]}>
                <div className={styles["button-container"]}>
                    <div className={styles["warning-info"]}>
                        <Warning size={30} />
                        <p>
                            <strong>Aviso:</strong> Ao optar por "deletar
                            conta", você perderá todos os dados contidos, além
                            da reputação do perfil e de produtos. Não será
                            possivel retornar com a decisão depois.
                        </p>
                    </div>
                    <button onClick={handleDeleteAccountBtn}>
                        Excluir conta.
                    </button>
                </div>
            </div>
            <div className={styles["delete-account__extra"]}>
                <PrivacyCard />
            </div>
        </section>
    );
};
