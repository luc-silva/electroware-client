import { Link } from "react-router-dom";
import { LoginForm } from "../components/Forms/LoginForm";
import styles from "./Login.module.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const Login = ({ showToast }: { showToast: Function }) => {
    return (
        <main className={styles["login"]}>
            <div className={styles["login-text"]}>
                <h1>Login</h1>
                <p>Entre em sua conta e comece a gastar o seu dinheiro!</p>
            </div>
            <section className={styles["login__main"]}>
                <div className={styles["form__container"]}>
                    <LoginForm showToast={showToast} />
                </div>
                <div className={styles["login__main__links"]}>
                    <Link to="/registration">Crie uma conta</Link>
                    <Link to="/privacy">Políticas de Privacidade</Link>
                </div>
            </section>
        </main>
    );
};
