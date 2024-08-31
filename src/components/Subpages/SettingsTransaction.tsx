import UserService from "../../services/UserService";
import { useContext, useEffect, useState } from "react";
import { TransactionCard } from "../Cards/TransactionCard";
import { NothingAvailableDialog } from "../Misc/NothingAvailableDialog";
import styles from "./SettingsTransaction.module.css";
import { UserContext } from "../../context/UserContext";

export const SettingsTransaction = () => {
    const [userTransactions, setUserTransactions] = useState([]);
    const { user } = useContext(UserContext);

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
