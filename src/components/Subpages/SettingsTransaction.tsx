import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import { TransactionCard } from "../Cards/TransactionCard";
import { NothingAvailableDialog } from "../Misc/NothingAvailableDialog";
import styles from "./SettingsTransaction.module.css";

export const SettingsTransaction = ({ user }: { user: UserSession }) => {
    let [userTransactions, setUserTransactions] = useState([]);
    useEffect(() => {
        UserService.getUserTransactions(user.id, user.token).then((data) => {
            setUserTransactions(data);
        });
    }, [user.id, user.token]);
    return (
        <section className={styles["transactions"]} id="transactions">
            <div className={styles["transactions__title"]}>
                <h3>Compras Realizadas</h3>
            </div>
            {(userTransactions.length > 0 && (
                <div className={styles["transactions__container"]}>
                    {userTransactions.map(
                        (transaction: Transaction, index: React.Key) => {
                            return (
                                <TransactionCard
                                    transaction={transaction}
                                    key={index}
                                />
                            );
                        }
                    )}
                </div>
            )) || <NothingAvailableDialog text="Nenhuma compra realizada." />}
        </section>
    );
};
