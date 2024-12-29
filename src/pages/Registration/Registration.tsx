import { Link } from "react-router-dom";

import { RegistrationForm } from "../../components/Forms/RegistrationForm/RegistrationForm";

import styles from "./Registration.module.css";

export const Registration = () => {
    return (
        <main role={"main"} className={styles["registration"]}>
            <section className={styles["registration__main"]}>
                <div className={styles["registration__title"]}>
                    <h1>Crie a sua conta</h1>
                </div>
                <div className={styles["registration__form__container"]}>
                    <RegistrationForm  />
                </div>
                <div className={styles["registration__links"]}>
                    <Link to="/login">Já cadastrado? Entre aqui </Link>
                    <Link to="/privacy">Políticas de Privacidade</Link>
                </div>
            </section>
        </main>
    );
};
