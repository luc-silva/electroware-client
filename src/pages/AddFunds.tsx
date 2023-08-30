import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import styles from "./AddFunds.module.css";
import { FundsCard } from "../components/Cards/FundsCard";
import { CustomFundsCard } from "../components/Cards/CustomFundsCard";

export const AddFunds = ({
    user,
    setUser,
}: {
    user: UserSession;
    setUser: Function;
}) => {
    let navigate = useNavigate();

    const options = [50, 100, 250, 500, 1000, 10000];
    useEffect(() => {
        if (!user.logged) {
            navigate("/login");
        }
        updateAccountDetails();
    }, []);

    async function updateAccountDetails() {
        await UserService.getUserPrivateInfo(user.id, user.token).then(
            (data) => {
                setUser(() => {
                    return { ...user, funds: data.funds };
                });
            }
        );
    }

    return (
        <main role={"main"} className={styles["add-funds"]}>
            <section className={styles["add-funds__main"]}>
                <div className={styles["add-funds__title"]}>
                    <h2>Adicione Fundos a sua carteira electroware!</h2>
                </div>
                <div className={styles["add-funds__card-container"]}>
                    {options.map((item) => {
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
