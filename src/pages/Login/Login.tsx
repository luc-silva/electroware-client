import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { LoginForm } from "../../components/Forms/LoginForm/LoginForm";

export const Login = () => {
    return (
        <main className={styles["login"]}>
            <div className={styles["login-text"]}>
                <h1>Login</h1>
                <p>Entre em sua conta e comece a gastar o seu dinheiro!</p>
            </div>
            <section className={styles["login__main"]}>
                <div className={styles["form__container"]}>
                    <LoginForm />
                </div>
                <div className={styles["login__main__links"]}>
                    <Link to="/registration">Crie uma conta</Link>
                    <Link to="/privacy">Políticas de Privacidade</Link>
                </div>
            </section>
        </main>
    );
};
