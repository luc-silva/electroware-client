import { StarsContainer } from "../../Containers/StarsContainer/StarsContainer";
import { ScoreLevels } from "../../Misc/ScoreLevels/ScoreLevels";
import styles from "./ScoreDisplay.module.css";

export const ScoreDisplay = ({ data }: { data: ProductScoreMetrics }) => {

    return (
        <div className={styles["score-display"]}>
            <div className={styles["score-display__average"]}>
                <strong>{data.average.score}/5</strong>
                <div className={styles["score-display__stars-container"]}>
                    <StarsContainer size={30} score={Number(data.average.score)} />
                </div>
            </div>
            <div className={styles["score-display"]}>
                <ScoreLevels data={data}/>
            </div>
        </div>
    );
};
