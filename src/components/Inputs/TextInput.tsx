import { ChangeEvent, EventHandler } from "react";
import styles from "./TextInput.module.css";

export const TextInput = ({
    onChange,
    inputName,
    labelText = "",
    inputState,
    inputPlaceholder = "",
    minLenght = 0,
    maxLength,
    label = false,
    required = false,
}: {
    onChange: EventHandler<ChangeEvent>;
    inputName?: string;
    labelText?: string;
    inputPlaceholder?: string;
    inputState: string;
    minLenght?: number;
    maxLength: number;
    label?: boolean;
    required?: boolean;
}) => {
    return (
        <>
            {label && (
                <label
                    htmlFor={inputName}
                    className={styles["text-input__label"]}
                >
                    {labelText}
                </label>
            )}
            <input
                type="text"
                name={inputName}
                value={inputState}
                minLength={minLenght}
                maxLength={maxLength}
                onChange={onChange}
                required={required}
                placeholder={inputPlaceholder}
                className={styles["text-input__label"]}
            />
        </>
    );
};
