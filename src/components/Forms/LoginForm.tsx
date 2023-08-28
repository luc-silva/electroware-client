import UserService from "../../services/UserService";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFormInitialValue } from "../../constants/initialStates";
import { SubmitBtn } from "../Buttons/SubmitBtn";
import { PasswordInput, TextInput } from "inputify";

import styles from "./LoginForm.module.css";
export const LoginForm = ({
    setUser,
    showToast,
}: {
    showToast: Function;
    setUser: Function;
}) => {
    let [form, setForm] = useState(loginFormInitialValue);
    let navigate = useNavigate();

    function setCurrentUser(data: UserSession) {
        setUser(() => {
            return { ...data, logged: true };
        });
    }
    function handleChange(event: ChangeEvent<HTMLElement>) {
        let target = event.target;
        if (target instanceof HTMLInputElement) {
            setForm({ ...form, [target.name]: target.value });
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        UserService.logInUser(form)
            .then(setCurrentUser)
            .then(() => {
                navigate("/");
            })
            .catch(({ response }) => {
                showToast(response.data, "warning");
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
