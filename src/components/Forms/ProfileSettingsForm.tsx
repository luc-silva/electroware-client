import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { profileSettingsFormInitalState } from "../../constants/initialStates";
import { AxiosResponse } from "axios";
import UserService from "../../services/UserService";

//components & utils
import { SubmitBtn } from "../Buttons/SubmitBtn";
import { UserImageInput } from "../Inputs/UserImageInput";

//style
import styles from "./ProfileSettingsForm.module.css";
import { TextInput, TextareaInput } from "inputify";
import { UserContext } from "../../context/UserContext";

export const ProfileSettingsForm = ({ showToast }: { showToast: Function }) => {
    let [form, setForm] = useState(profileSettingsFormInitalState);
    const {user} = useContext(UserContext);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await UserService.updateAccountDetails(user.id, user.token, form).then(
            ({ data }: AxiosResponse) => {
                showToast(data.message, "info");
            }
        );
    }

    function handleChange(event: ChangeEvent<HTMLElement>) {
        if (
            event.target instanceof HTMLInputElement ||
            event.target instanceof HTMLSelectElement ||
            event.target instanceof HTMLTextAreaElement
        ) {
            let targetName = event.target.name;
            let targetValue = event.target.value;
            if (targetName === "first" || targetName === "last") {
                setForm({
                    ...form,
                    name: { ...form.name, [targetName]: targetValue },
                });
            } else if (targetName === "state" || targetName === "country") {
                setForm({
                    ...form,
                    location: { ...form.location, [targetName]: targetValue },
                });
            } else {
                setForm({ ...form, [targetName]: targetValue });
            }
        }
    }

    useEffect(() => {
        UserService.getUserInfo(user.id).then(setForm);
    }, [user.id]);
    return (
        <form
            className={styles["edit-profile__form"]}
            action="POST"
            name="edit-form"
            onSubmit={handleSubmit}
        >
            <div className={styles["form__image"]}>
                <div className={styles["image-input__container"]}>
                    <UserImageInput inputType="userImage" user={user} />
                </div>
            </div>
            <div className={styles["form__main"]}>
                <section className={styles["form__main__basic-info"]}>
                    <div className={styles["form__main__basic-info__title"]}>
                        <h3>Dados Básicos</h3>
                    </div>
                    <div className={styles["form__main__basic-info__inputs"]}>
                        <div className={styles["input-container"]}>
                            <TextareaInput
                                stateValue={form.description}
                                inputName="description"
                                label
                                labelText="Descrição do perfil"
                                maxLength={200}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles["input-container"]}>
                            <TextInput
                                stateValue={form.name.first}
                                inputName="first"
                                label
                                labelText="Nome"
                                maxLength={15}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles["input-container"]}>
                            <TextInput
                                stateValue={form.name.last}
                                inputName="last"
                                label
                                labelText="Sobrenome"
                                maxLength={15}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles["input-container"]}>
                            <TextInput
                                stateValue={form.location.country}
                                inputName="country"
                                label
                                labelText="País"
                                maxLength={40}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles["input-container"]}>
                            <TextInput
                                stateValue={form.location.state}
                                inputName="state"
                                label
                                labelText="Estado"
                                maxLength={40}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </section>

                <div className={styles["form__main__submit"]}>
                    <SubmitBtn textValue="Salvar" />
                </div>
            </div>
        </form>
    );
};
