import { useEffect, useState } from "react";
import styles from "./ProductReviews.module.css";
import { ReviewsContainer } from "../../Misc/ReviewsContainer/ReviewsContainer";
import { productRatingInitialState } from "../../../constants/initialStates";
import { getProductScore } from "../../../service";
import { ScoreDisplay } from "../../Displays/ScoreDisplay/ScoreDisplay";

export const ProductReviews = ({ product }: { product: ProductDetails }) => {
    const [data, setData] = useState(productRatingInitialState);

    function updateProductScore() {
        getProductScore(product._id).then((data) => {
            setData(data);
        });
    }

    useEffect(() => {
        if (product._id) {
            updateProductScore();
        }
    }, [product]);

    return (
        <section className={styles["ratings"]}>
            <div className={styles["ratings__main"]}>
                <div className={styles["ratings__title"]}>
                    <h2>Avaliações do produto</h2>
                </div>
                <div className={styles["ratings__score"]}>
                    <ScoreDisplay data={data} />
                </div>
            </div>
            <div className={styles["ratings__reviews"]}>
                <ReviewsContainer
                    product={product}
                    updateScore={updateProductScore}
                />
            </div>
        </section>
    );
};
