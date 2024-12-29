import { Cube, Gauge, Truck, Wallet } from "phosphor-react";
import styles from "./styles.module.css";

export const FeaturedContainer = () => {
    return (
        <div className={styles["featured__container"]}>
            <div className={styles["container-item"]}>
                Entrega para o mundo inteiro.
                <Truck size={45} color={"var(--main-color)"} />
            </div>
            <div className={styles["container-item"]}>
                Caixas de alta qualidade.
                <Cube size={45} color={"var(--main-color)"} />
            </div>
            <div className={styles["container-item"]}>
                Caminhões equipados com motores de última geração.
                <Gauge size={45} color={"var(--main-color)"} />
            </div>
            <div className={styles["container-item"]}>
                Pagamento mais seguro do universo.
                <Wallet size={45} color={"var(--main-color)"} />
            </div>
        </div>
    );
};
