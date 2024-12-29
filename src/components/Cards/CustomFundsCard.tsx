import { useState } from "react";
import styles from "./CustomFundsCard.module.css";
import { NumberInput } from "inputify";
import { addFunds } from "../../service";

//refatorar

export const CustomFundsCard = ({
    user,
    updateAccountDetails,
}: {
    user: UserSession;
    updateAccountDetails: Function;
}) => {
    const [amount, setAmount] = useState(0);

    function handleAmountChange(event: React.ChangeEvent) {
        const target = event.target;
        if (target instanceof HTMLInputElement) {
            setAmount(Number(target.value));
        }
    }
    async function addAmount(event: React.MouseEvent) {
        await addFunds(amount, user.token).then(() => {
            updateAccountDetails();
        });
    }
    return (
        <div className={styles["add-funds-card"]}>
            <div className={styles["add-funds-card__main"]}>
                <p>Valor específico:</p>
                <div className={styles["add-funds-card__amount-input"]}>
                    <NumberInput
                        inputName="amount"
                        maxValue={99999999}
                        onChange={handleAmountChange}
                        stateValue={amount}
                    />
                </div>
            </div>
            <div className={styles["add-funds-card__btn-panel"]}>
                <button onClick={addAmount}>Adicionar</button>
            </div>
        </div>
    );
};
