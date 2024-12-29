import React, { useContext, useEffect, useState } from "react";

import { ReviewCard } from "../../Cards/ReviewCard/ReviewCard";
import { ReviewForm } from "../../Forms/ReviewForm/ReviewForm";
import { checkForUser } from "../../../utils/operations";

import styles from "./ReviewsContainer.module.css";
import { UserContext } from "../../../context/UserContext";
import { getProductReviews } from "../../../service";

export const ReviewsContainer = ({
    product,
    updateScore,
}: {
    product: ProductDetails;
    updateScore: Function;
}) => {
    const { setUser, user } = useContext(UserContext);

    const [reviews, setReviews] = useState([{ _id: "", author: "" }]);
    const [userHasNotReviewed, toggleUserHasNotReviewed] = useState(false);

    async function updateReviews() {
        getProductReviews(product._id)
            .then(setReviews)
            .then(() => {
                updateScore();
            });
    }

    useEffect(() => {
        if (product._id) {
            updateReviews();
        }
    }, [product]);
    useEffect(() => {
        if (checkForUser(reviews, user.id)) {
            toggleUserHasNotReviewed(true);
        } else {
            toggleUserHasNotReviewed(false);
        }
    }, [reviews]);
    return (
        <>
            <div className={styles["reviews__container"]}>
                {(reviews.length > 0 &&
                    reviews.map(({ _id }, index: React.Key) => {
                        return (
                            <ReviewCard
                                user={user}
                                reviewId={_id}
                                key={index}
                                updateReviews={updateReviews}
                            />
                        );
                    })) || <p>Sem avaliações para exibir</p>}
            </div>

            <div className={styles["reviews__form"]}>
                <ReviewForm
                    updateReviews={updateReviews}
                    product={product}
                    user={user}
                    isActive={userHasNotReviewed}
                />
            </div>
        </>
    );
};
