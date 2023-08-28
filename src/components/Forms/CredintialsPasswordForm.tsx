import { ChangeEvent, FormEvent, useState } from "react";
import { SubmitBtn } from "../Buttons/SubmitBtn";
import styles from "./CredentialsPasswordForm.module.css";
import UserService from "../../services/UserService";
import { PasswordInput } from "inputify";

export const CredentialsPasswordForm = ({
    user,
    showToast,
}: {
    user: UserSession;
    showToast: Function;
}) => {
    let [passwordForm, setPasswordForm] = useState({
        password: "",
        new_password: "",
    });
    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        let target = event.target;
        if (target) {
            setPasswordForm({ ...passwordForm, [target.name]: target.value });
        }
    }
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        await UserService.updateUserPassword(user.token, passwordForm)
            .then(({ data }) => {
                showToast(data.message);
            })
            .catch(({ response }) => {
                showToast(response.data, "warning");
            });
    }
    return (
        <>
            <form
                method="POST"
                onSubmit={handleSubmit}
                className={styles["creditials-password-form"]}
            >
                <div className={styles["creditials-password-form__main"]}>
                    <div className={styles["input-container"]}>
                        <PasswordInput
                            stateValue={passwordForm.password}
                            inputName="password"
                            onChange={handlePasswordChange}
                            maxLength={30}
                            placeholder
                            placeholderText="Senha Antiga"
                            required
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <PasswordInput
                            stateValue={passwordForm.new_password}
                            inputName="new_password"
                            onChange={handlePasswordChange}
                            maxLength={30}
                            placeholder
                            placeholderText="Senha Nova"
                            required
                        />
                    </div>
                </div>
                <div>
                    <SubmitBtn textValue="Atualizar Senha" />
                </div>
            </form>
        </>
    );
};
