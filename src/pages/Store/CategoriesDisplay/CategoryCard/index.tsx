import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

interface IProps {
    data: CategoryDetails;
}
export const CategoryCard = ({ data: { _id, name } }: IProps) => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(`/category/${_id}`);
    };
    return (
        <div className={styles["category-card"]} onClick={handleRedirect}>
            <p>{name}</p>
        </div>
    );
};
