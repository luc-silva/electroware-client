//components
import { SubmitBtn } from "../../components/Buttons/SubmitButton/SubmitBtn";

//misc
import { Info, Warning } from "phosphor-react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Checkout.module.css";
import { UserContext } from "../../context/UserContext";
import { createTransaction, getCartInstances } from "../../service";

export const Checkout = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!user.logged) {
            navigate("/login");
        }
        getCartInstances(user.token).then((data) => {
            setItems(data);
        });
    }, [user]);

    function getTotalValue() {
        let total = 0;
        items.forEach(({ price, quantity }: CartItem) => {
            total += price * quantity;
        });
        return total;
    }
    const [paymentMethod, setPaymentMethod] = useState("Boleto");
    function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
        setPaymentMethod(event.target.value);
    }
    async function handleCheckout() {
        createTransaction({ paymentMethod }, user.token).then(() => {
            navigate("/settings");
        });
    }
    return (
        <main className={styles["checkout"]}>
            <section className={styles["checkout__main"]}>
                <div className={styles["checkout__main__values"]}>
                    <div className={styles["checkout__total-value"]}>
                        <p>Valor Total:</p>
                        <strong>{`${getTotalValue()} R$`}</strong>
                    </div>
                    <div className={styles["checkout__credit-value"]}>
                        <p>Seu Saldo:</p>
                        <strong>{`${user.funds} R$`}</strong>
                    </div>
                    <div className={styles["checkout__info"]}>
                        <Info size={30} color="var(--main-color)" />
                        <p>
                            {items.length === 1
                                ? `Você está comprando ${items.length} item.`
                                : `Você está comprando ${items.length} itens.`}
                        </p>
                    </div>
                </div>
                {getTotalValue() > user.funds && (
                    <div className={styles["checkout__warning"]}>
                        <div>
                            <Warning size={30} />
                            <strong>
                                Você não tem saldo o suficiente para finalizar a
                                compra.
                            </strong>
                        </div>
                        <Link to="/add-funds">Adicionar mais</Link>
                    </div>
                )}
                <div className={styles["checkout__footer"]}>
                    <div className={styles["payment-method__display"]}>
                        <p>FORMA DE PAGAMENTO:</p>
                        <select name="paymentMethod" onChange={handleSelect}>
                            <option value="Boleto" defaultChecked>
                                Boleto
                            </option>
                            <option value="Cartão de Crédito">
                                Cartão de Crédito
                            </option>
                            <option value="Bitcoin">Bitcoin</option>
                            <option value="Pix">Pix</option>
                        </select>
                    </div>
                    <div>
                        {(getTotalValue() > user.funds && (
                            <div>
                                <SubmitBtn
                                    textValue="FINALIZAR COMPRA"
                                    disabled
                                />
                            </div>
                        )) || (
                            <div onClick={handleCheckout}>
                                <SubmitBtn textValue="FINALIZAR COMPRA" />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};
