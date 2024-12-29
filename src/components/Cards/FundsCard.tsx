import { addFunds } from "../../service";
import styles from "./FundsCard.module.css";

//refatorar

export const FundsCard = ({
    amount,
    user,
    updateAccountDetails,
}: {
    amount: number;
    user: UserSession;
    updateAccountDetails: Function;
}) => {
    async function addAmount(event: React.MouseEvent) {
        await addFunds(amount, user.token).then(() => {
            updateAccountDetails();
        });
    }
    return (
        <div className={styles["add-funds-card"]}>
            <div className={styles["add-funds-card__main"]}>
                <p>Adicione</p>
                <strong>R$ {amount}</strong>
            </div>
            <div className={styles["add-funds-card__btn-panel"]}>
                <button onClick={addAmount}>Adicionar</button>
            </div>
        </div>
    );
};
