import { format } from "date-fns";
import { Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    imageInitialValue,
    reviewsInitialState,
} from "../../../constants/initialStates";

import { createImage } from "../../../utils/operations";
import { ImageBox } from "../../Misc/ImageBox/ImageBox";
import { StarsContainer } from "../../Containers/StarsContainer/StarsContainer";

import styles from "./ReviewCard.module.css";
import { deleteReview, getReview, getUserImage } from "../../../service";

export const ReviewCard = ({
    reviewId,
    user,
    updateReviews,
}: {
    reviewId: string;
    user: UserSession;
    updateReviews: Function;
}) => {
    const [cardInfo, setCardInfo] = useState(reviewsInitialState);
    const [userImage, setUserImage] = useState(imageInitialValue);
    const [isLoading, toggleLoading] = useState(true);

    useEffect(() => {
        if (reviewId) {
            getReview(reviewId).then(setCardInfo);
        }
    }, [reviewId]);
    useEffect(() => {
        if (cardInfo.author._id) {
            getUserImage(cardInfo.author._id)
                .then(({ data }) => {
                    setUserImage(data);
                })
                .catch(() => {
                    setUserImage("");
                })
                .finally(() => {
                    toggleLoading(false);
                });
        }
    }, [cardInfo.author._id]);

    async function handleDelete() {
        deleteReview(cardInfo._id, user.token).then(() => {
            updateReviews();
        });
    }

    function setImageSource() {
        const picture = `${process.env.PUBLIC_URL}/images/missing-profile-picture.jpg`
        return userImage ? createImage(userImage) : picture;
    }

    return (
        <div className={styles["rating-card"]}>
            <div className={styles["card-userinfo"]}>
                <div className={styles["user-photo"]}>
                    <ImageBox isLoading={isLoading} imgSrc={setImageSource()} />
                </div>
            </div>
            <div className={styles["user-review"]}>
                <div className={styles["review-detail"]}>
                    <div className={styles["review-author"]}>
                        {(isLoading && (
                            <div className={styles["loading-line"]} />
                        )) || (
                            <Link to={`/user/${cardInfo.author._id}`}>
                                <strong>{`${cardInfo.author.name.first} ${cardInfo.author.name.last}`}</strong>
                            </Link>
                        )}
                    </div>
                    <div className={styles["date-display"]}>
                        {(isLoading && (
                            <div className={styles["loading-line"]} />
                        )) || (
                            <p>
                                {format(
                                    new Date(cardInfo.createdAt),
                                    "dd/MM/yyyy"
                                )}
                            </p>
                        )}
                    </div>
                </div>
                <div className={styles["review-text"]}>
                    {(isLoading && (
                        <div className={styles["loading-line"]} />
                    )) ||
                        cardInfo.text || <em>Nenhum detalhe provido</em>}
                </div>
                <div className={styles["review-panel"]}>
                    <StarsContainer score={cardInfo.score} size={20} />
                    {user && user.id === cardInfo.author._id && (
                        <button onClick={handleDelete}>
                            <Trash size={20} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
