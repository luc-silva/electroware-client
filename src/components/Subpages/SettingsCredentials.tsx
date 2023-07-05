import { CredentialsPasswordForm } from "../Forms/CredintialsPasswordForm";
import { CredentialsEmailForm } from "../Forms/CredentialsEmailForm";

import styles from "./SettingsCredentials.module.css";

export const SettingsCredentials = ({
    showToast,
    user,
}: {
    user: UserSession;
    showToast: Function;
}) => {
    return (
        <section className={styles["settings-credentials"]}>
            <div className={styles["settings-credentials__title"]}>
                <h3>Credênciais</h3>
                <p>Altere seu email ou sua senha.</p>
            </div>
            <div className={styles["settings-credentials__container"]}>
                <div className={styles["settings-credentials__email-form"]}>
                    <CredentialsPasswordForm user={user} showToast={showToast}/>
                </div>
                <div
                    className={styles["settings-credentials__password-form"]}
                >
                   <CredentialsEmailForm user={user} showToast={showToast}/>
                </div>
            </div>
        </section>
    );
};
