import { useState } from "react";
import UserService from "../../services/UserService";
import styles from "./CustomFundsCard.module.css";
import { NumberInput } from "inputify";


//refatorar

export const CustomFundsCard = ({
    user,
    updateAccountDetails,
}: {
    user: UserSession;
    updateAccountDetails: Function;
}) => {
    let [amount, setAmount] = useState(0);

    function handleAmountChange(event: React.ChangeEvent) {
        let target = event.target;
        if (target instanceof HTMLInputElement) {
            setAmount(Number(target.value));
        }
    }
    async function addAmount(event: React.MouseEvent) {
        await UserService.addFunds(amount, user.token).then(() => {
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
