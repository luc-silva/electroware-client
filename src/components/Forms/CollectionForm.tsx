import { ChangeEvent, FormEvent,  useState } from "react";
import styles from "./CollectionForm.module.css";
import { SubmitBtn } from "../Buttons/SubmitBtn";
import WishlistCollectionService from "../../services/WishlistCollectionService";
import { Check } from "phosphor-react";
import { TextInput } from "inputify";

export const CollectionForm = ({
    user,
    showToast,
    updateCollections
}: {
    user: UserSession;
    showToast: Function;
    updateCollections:Function
}) => {
    let [form, setForm] = useState({ name: "", privated: false });

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        WishlistCollectionService.createCollection(user.token, form)
            .then(({ message }) => {
                showToast(message);
                updateCollections()
            })
            .catch(({response}) => {
                showToast(response.data, "warning");
            });
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        let target = event.target;
        if (target) {
            setForm({ ...form, [target.name]: target.value });
        }
    }

    let [checkboxState, toggleCheckboxState] = useState(true);
    function handleCheckboxClick() {
        toggleCheckboxState(!checkboxState);
        setForm({ ...form, privated: checkboxState });
    }
    return (
        <form
            method="POST"
            onSubmit={handleSubmit}
            className={styles["collection-form"]}
        >
            <div className={styles["form__container"]}>
                <div className={styles["input-container"]}>
                    <TextInput
                        stateValue={form.name}
                        inputName="name"
                        labelText="Criar Lista:"
                        onChange={handleInputChange}
                        placeholder
                        placeholderText="Favoritos de 2023"
                        minLength={8}
                        maxLength={20}
                        label
                        required
                    />
                </div>
                <div className={styles["checkbox-container"]}>
                    {/* replace with component */}
                    <p>Privado?:</p>
                    <div
                        className={styles["checkbox"]}
                        onClick={handleCheckboxClick}
                    >
                        {checkboxState && <Check size={15} />}
                    </div>
                </div>
            </div>
            <div className={styles["submit-container"]}>
                <SubmitBtn textValue="Criar" />
            </div>
        </form>
    );
};
