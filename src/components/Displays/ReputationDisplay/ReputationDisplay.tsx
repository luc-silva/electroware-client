import { getAverage } from "../../../utils/operations";
import { StarsContainer } from "../../Containers/StarsContainer/StarsContainer";
import styles from "./ReputationDisplay.module.css";

export const ReputationDisplay = ({ reviews }: { reviews: Review[] }) => {
    return (
        <div className={styles["user-profile__details__reputation"]}>
            <p>Reputação</p>
            <div>
                <strong>{getAverage(reviews)}</strong>
                <div>
                    <StarsContainer size={20} score={getAverage(reviews)} />
                </div>
            </div>
        </div>
    );
};
