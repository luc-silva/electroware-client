import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import CategoryService from "../../services/CategoryService";

import { SubmitBtn } from "../Buttons/SubmitBtn";
import { createrOfferFormInitialValue } from "../../constants/initialStates";

import styles from "./ProductForm.module.css";
import { NumberInput, TextInput, TextareaInput } from "inputify";
import { SelectInput } from "../Inputs/SelectInput";

export const ProductForm = ({
    user,
    form = createrOfferFormInitialValue,
    method,
    setForm,
    handleSubmit,
    submitBtnText,
}: {
    user: UserSession;
    form?: ProductForm;
    method: "POST" | "PUT";
    setForm: React.Dispatch<React.SetStateAction<ProductForm>>;
    handleSubmit: FormEventHandler<HTMLFormElement>;
    submitBtnText: string;
}) => {
    let [categories, setCategories] = useState([{ name: "", _id: "" }]);
    useEffect(() => {
        CategoryService.getCategories().then((data) => {
            setCategories(data);
        });
    }, []);

    function handleChange(event: ChangeEvent<HTMLElement>) {
        let target = event.target;
        if (
            target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement ||
            target instanceof HTMLSelectElement
        ) {
            setForm({ ...form, [target.name]: target.value });
        }
    }

    return (
        <form
            action={method}
            onSubmit={handleSubmit}
            className={styles["product-form"]}
        >
            <div className={styles["input-container"]}>
                <TextInput
                    stateValue={form.name}
                    inputName="name"
                    label
                    labelText="Produto"
                    maxLength={30}
                    required
                    onChange={handleChange}
                />
            </div>
            <div className={styles["larger-input-container"]}>
                <div className={styles["input-container"]}>
                    <NumberInput
                        stateValue={form.price}
                        inputName="price"
                        labelText="Preço"
                        minValue={1}
                        maxValue={10000}
                        required
                        label
                        onChange={handleChange}
                    />
                </div>
                <div className={styles["input-container"]}>
                    <NumberInput
                        stateValue={form.quantity}
                        inputName="quantity"
                        labelText="Unidades"
                        maxValue={300}
                        minValue={0}
                        required
                        label
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles["larger-input-container"]}>
                <div className={styles["input-container"]}>
                    <TextInput
                        stateValue={form.brand}
                        inputName="brand"
                        labelText="Marca"
                        maxLength={15}
                        onChange={handleChange}
                        required
                        label
                    />
                </div>
                <div className={styles["input-container"]}>
                    <SelectInput
                        initialValue={form.category}
                        arrayOfOptions={categories}
                        inputName="category"
                        inputText="Categoria"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles["input-container"]}>
                <TextareaInput
                    stateValue={form.description}
                    inputName="description"
                    label
                    labelText="Descrição"
                    maxLength={200}
                    onChange={handleChange}
                />
            </div>
            <div>
                <SubmitBtn textValue={submitBtnText} />
            </div>
        </form>
    );
};
