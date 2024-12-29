import { useContext, useEffect, useState } from "react";
import { TransactionCard } from "../Cards/TransactionCard/TransactionCard";
import { NothingAvailableDialog } from "../Misc/NothingAvailableDialog/NothingAvailableDialog";
import styles from "./SettingsTransaction.module.css";
import { UserContext } from "../../context/UserContext";
import { getUserTransactions } from "../../service";

export const SettingsTransaction = () => {
    const [userTransactions, setUserTransactions] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        getUserTransactions(user.id, user.token).then((data) => {
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
