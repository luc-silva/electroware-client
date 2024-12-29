import { useEffect, useState } from "react";
import { imageInitialValue } from "../../constants/initialStates";
import { createImage } from "../../utils/operations";
import styles from "./HMenuUserDetails.module.css";
import { ImageBox } from "./ImageBox/ImageBox";
import { getUserImage } from "../../service";

export const HMenuUserDetails = ({ user }: { user: UserSession }) => {
    const [userImage, setUserImage] = useState(imageInitialValue);
    const [isLoading, toggleLoading] = useState(true);
    useEffect(() => {
        if (user.id) {
            getUserImage(user.id)
                .then(({ data }) => {
                    setUserImage(data);
                })
                .then(() => {
                    toggleLoading(false);
                });
        }
    }, []);
    return (
        <>
            <div className={styles["hmenu__user-picture"]}>
                <ImageBox
                    isLoading={isLoading}
                    imgSrc={createImage(userImage)}
                />
            </div>
            <div className={styles["hmenu__user-info"]}>
                <strong>{user.username}</strong>
                <p>{user.funds} R$</p>
            </div>
        </>
    );
};
