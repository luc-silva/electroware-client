import styles from "./SettingsCredentials.module.css";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useToast } from "../../../hooks/useToast";
import { CredentialsPasswordForm } from "../../Forms/CredentialsPasswordForm/CredintialsPasswordForm";
import { CredentialsEmailForm } from "../../Forms/CredentialsEmailForm/CredentialsEmailForm";

export const SettingsCredentials = () => {
    const { user } = useContext(UserContext);
    const { setToastMessage } = useToast();

    return (
        <section className={styles["settings-credentials"]}>
            <div className={styles["settings-credentials__title"]}>
                <h3>Credênciais</h3>
                <p>Altere seu email ou sua senha.</p>
            </div>
            <div className={styles["settings-credentials__container"]}>
                <div className={styles["settings-credentials__email-form"]}>
                    <CredentialsPasswordForm
                        user={user}
                        showToast={setToastMessage}
                    />
                </div>
                <div className={styles["settings-credentials__password-form"]}>
                    <CredentialsEmailForm
                        user={user}
                        showToast={setToastMessage}
                    />
                </div>
            </div>
        </section>
    );
};
