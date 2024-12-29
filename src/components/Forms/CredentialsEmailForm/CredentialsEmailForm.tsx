import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./CredentialsEmailForm.module.css";
import { TextInput } from "inputify";
import { updateUserEmail } from "../../../service";
import { SubmitBtn } from "../../Buttons/SubmitButton/SubmitBtn";

export const CredentialsEmailForm = ({
    user,
    showToast,
}: {
    user: UserSession;
    showToast: Function;
}) => {
    const [emailForm, setEmailForm] = useState({
        email: "",
    });
    function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        if (target) {
            setEmailForm({ ...emailForm, [target.name]: target.value });
        }
    }
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        await updateUserEmail(user.token, emailForm)
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
                        <TextInput
                            inputType="email"
                            stateValue={emailForm.email}
                            onChange={handleEmailChange}
                            maxLength={50}
                            inputName="email"
                            placeholder
                            placeholderText="Novo email"
                            required
                        />
                    </div>
                </div>
                <div>
                    <SubmitBtn textValue="Atualizar Email" />
                </div>
            </form>
        </>
    );
};
