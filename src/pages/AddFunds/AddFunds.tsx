import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AddFunds.module.css";
import { CustomFundsCard } from "../../components/Cards/CustomFundsCard/CustomFundsCard";
import { UserContext } from "../../context/UserContext";
import { getUserPrivateInfo } from "../../service";
import { FundsCard } from "../../components/Cards/FundsCard/FundsCard";

export const AddFunds = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const options = [50, 100, 250, 500, 1000, 10000];
    useEffect(() => {
        if (!user.logged) {
            navigate("/login");
        }
        updateAccountDetails();
    }, []);

    async function updateAccountDetails() {
        await getUserPrivateInfo(user.id, user.token).then((data) => {
            setUser(() => {
                return { ...user, funds: data.funds };
            });
        });
    }

    return (
        <main role={"main"} className={styles["add-funds"]}>
            <section className={styles["add-funds__main"]}>
                <div className={styles["add-funds__title"]}>
                    <h2>Adicione Fundos a sua carteira electroware!</h2>
                </div>
                <div className={styles["add-funds__card-container"]}>
                    {options.map((item) => {
                        //refatorar
                        return (
                            <FundsCard
                                amount={item}
                                updateAccountDetails={updateAccountDetails}
                                user={user}
                            />
                        );
                    })}
                    <CustomFundsCard
                        updateAccountDetails={updateAccountDetails}
                        user={user}
                    />
                </div>
            </section>
            <section className={styles["add-funds__current-fund"]}>
                <div className={styles["current-fund__title"]}>
                    <h3>Sua carteira Electroware</h3>
                </div>
                <div className={styles["current-fund__wallet"]}>
                    <p>Seu Saldo:</p>
                    <strong>{`R$ ${user.funds}`}</strong>
                </div>
                <div className={styles["current-fund__links"]}>
                    <Link to={"/config/transactions"}>Ver Transações</Link>
                </div>
            </section>
        </main>
    );
};
