import { ChangeEvent, useEffect, useState } from "react";
import { imageInitialValue } from "../../constants/initialStates";

//components & utils
import ImageService from "../../services/ImageService";
import { createImage } from "../../utils/operations";
import { ImageBox } from "../Misc/ImageBox";

//style
import styles from "./UserImageInput.module.css";

export const UserImageInput = ({
    user,
    inputType,
    productId,
}: {
    user: UserSession;
    productId?: string;
    inputType: "userImage" | "productImage";
}) => {
    const [image, setImage] = useState(imageInitialValue);
    const [imageLoading, toggleImageLoading] = useState(true);

    useEffect(() => {
        if (inputType === "productImage" && productId) {
            ImageService.getProductImage(productId).then(({ data }) => {
                setImage(createImage(data));
            })
            .then(() => {
                toggleImageLoading(false);
            });
        } else {
            ImageService.getUserImage(user.id)
                .then(({ data }) => {
                    setImage(createImage(data));
                })
                .then(() => {
                    toggleImageLoading(false);
                });
        }
    }, [inputType, productId, user.id]);

    async function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const formData = new FormData();

        const files = event.target.files;
        if (event.target && files && files[0] instanceof File) {
            formData.append("imageField", files[0]);
            formData.append("imageType", inputType);
            await ImageService.uploadImage(formData, user.token);
        }
    }

    return (
        <div className={styles["profile-picture"]}>
            <ImageBox isLoading={imageLoading} imgSrc={image} />
            <input
                name={inputType}
                type="file"
                accept="jpeg jpg"
                size={1}
                onChange={handleChange}
            />
        </div>
    );
};
