import { ChangeEvent, Dispatch, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFormInitialValue } from "../../constants/initialStates";
import { SubmitBtn } from "../Buttons/SubmitButton/SubmitBtn";
import { PasswordInput, TextInput } from "inputify";

import styles from "./LoginForm.module.css";
import { UserContext } from "../../context/UserContext";
import { useToast } from "../../hooks/useToast";
import { logInUser } from "../../service";

export const LoginForm = () => {
    const { user, setUser } = useContext(UserContext);
    const [form, setForm] = useState(loginFormInitialValue);
    const navigate = useNavigate();
    const { setToastMessage } = useToast();

    function setCurrentUser(data: UserSession) {
        setUser({ ...user, ...data, logged: true });
    }
    function handleChange(event: ChangeEvent<HTMLElement>) {
        const target = event.target;
        if (target instanceof HTMLInputElement) {
            setForm({ ...form, [target.name]: target.value });
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        logInUser(form)
            .then(setCurrentUser)
            .then(() => {
                navigate("/");
            })
            .catch(({ response }) => {
                setToastMessage(response.data, "warning");
            });
    }
    return (
        <form
            action="POST"
            onSubmit={handleSubmit}
            className={styles["login__form"]}
        >
            <div className={styles["input__container"]}>
                <TextInput
                    inputName="email"
                    onChange={handleChange}
                    maxLength={50}
                    stateValue={form.email}
                    required
                    placeholder
                    placeholderText="Email"
                />
            </div>
            <div className={styles["input__container"]}>
                <PasswordInput
                    inputName="password"
                    stateValue={form.password}
                    maxLength={50}
                    onChange={handleChange}
                    required
                    placeholder
                    placeholderText="Senha"
                />
            </div>
            <div className={styles["submit-input__container"]}>
                <SubmitBtn textValue="Entrar" />
            </div>
        </form>
    );
};
