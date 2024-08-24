import { ProfileSettingsForm } from "../Forms/ProfileSettingsForm";
import styles from "./EditProfile.module.css";

export const EditProfile = ({
    showToast,
}: {
    showToast: (message: string, toastType: "info" | "warning") => void;
}) => {
    return (
        <section className={styles["settings__edit-profile"]}>
            <div className={styles["edit-profile__title"]}>
                <h3>Edite o seu perfil</h3>
            </div>
            <div>
                <ProfileSettingsForm showToast={showToast} />
            </div>
        </section>
    );
};
