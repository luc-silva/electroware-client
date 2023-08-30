import { Link } from "react-router-dom";
import styles from "./SearchCategoryCard.module.css";

export const SearchCategoryCard = ({ item }: { item: Category }) => {
    return (
        <li className={styles["search-category-card"]}>
            <Link to={`/category/${item._id}`} >
                <p>{item.name}</p>
            </Link>
        </li>
    );
};
