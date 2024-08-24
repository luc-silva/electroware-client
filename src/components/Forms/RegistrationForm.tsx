import UserService from "../../services/UserService";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrationFormInitialValues } from "../../constants/initialStates";

import { SubmitBtn } from "../Buttons/SubmitBtn";

import styles from "./RegistrationForm.module.css";
import { PasswordInput, TextInput } from "inputify";
import { useToast } from "../../hooks/useToast";

export const RegistrationForm = () => {
    let [form, setForm] = useState(registrationFormInitialValues);
    const navigate = useNavigate();
    const { setToastMessage } = useToast();

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let target = event.target;
        if (target instanceof HTMLInputElement) {
            setForm({ ...form, [target.name]: target.value });
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let data = {
            ...form,
            name: {
                first: form.first,
                last: form.last,
            },
            location: {
                state: form.state,
                country: form.country,
            },
        };

        await UserService.registerUser(data)
            .then(() => {
                navigate("/login");
            })
            .catch(({ response }) => {
                setToastMessage(response.data, "warning");
            });
    }
    return (
        <form
            action="POST"
            onSubmit={handleSubmit}
            className={styles["registration__form"]}
        >
            <div className={styles["input__container"]}>
                <TextInput
                    inputName="first"
                    maxLength={15}
                    onChange={handleChange}
                    inputType="text"
                    stateValue={form.first}
                    placeholder
                    placeholderText="John"
                    required
                    label
                    labelText="Nome"
                />
                <TextInput
                    inputName="last"
                    maxLength={15}
                    onChange={handleChange}
                    inputType="text"
                    stateValue={form.last}
                    required
                    placeholder
                    placeholderText="Doe"
                    label
                    labelText="Sobrenome:"
                />
            </div>

            <div className={styles["input__container"]}>
                <TextInput
                    inputName="state"
                    maxLength={40}
                    onChange={handleChange}
                    inputType="text"
                    stateValue={form.first}
                    required
                    placeholder
                    placeholderText="São Paulo"
                    label
                    labelText="Estado:"
                />
                <TextInput
                    inputName="country"
                    maxLength={40}
                    onChange={handleChange}
                    inputType="text"
                    stateValue={form.last}
                    required
                    placeholder
                    placeholderText="Brasil"
                    label
                    labelText="País:"
                />
            </div>

            <div className={styles["input__container"]}>
                <TextInput
                    inputType="email"
                    inputName="email"
                    stateValue={form.email}
                    onChange={handleChange}
                    maxLength={50}
                    required
                    placeholder
                    placeholderText="j.doe@user.com"
                    label
                    labelText="Email:"
                />
            </div>
            <div className={styles["input__container"]}>
                <PasswordInput
                    inputName="password"
                    onChange={handleChange}
                    maxLength={40}
                    stateValue={form.password}
                    required
                    placeholder
                    placeholderText="senha"
                    label
                    labelText="Senha:"
                />
            </div>
            <div className={styles["submit-input__container"]}>
                <SubmitBtn textValue="Crie uma conta" />
            </div>
        </form>
    );
};
