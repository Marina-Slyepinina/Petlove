import axios from "axios";
import { useRef, useState } from "react";
import { NavLink } from "react-router";
import { useAuthStore } from "../../store/authStore";
import { CLOUDINARY } from "../../constants";
import { ModalEditUser } from "../ModalEditUser/ModalEditUser";
import { PetCard } from "../petCard/petCard";
import css from "./UserCard.module.css";

export const UserCard = () => {

    const userData = useAuthStore(state => state.user)
    const updateUser = useAuthStore((state) => state.updateUser);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isOpen, setIsOpen] = useState(false);

    const handleUploadClick = () => {
        if (!userData?.avatar && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY.UPLOAD_PRESET);

        try {
            const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY.CLOUD_NAME}/image/upload`, formData);
            const imageUrl = res.data.secure_url;

            if (!imageUrl) {
                throw new Error("Cloudinary did not return a URL");
            }

            await updateUser({ avatar: imageUrl });
            event.target.value = "";

        } catch (error) {
            console.error("Something went wrong:", error);
        }
    };

    return (
        <div className={css.cardContainer}>
            <div className={css.cardHeader}>
                <div className={css.userIconWrapper}>
                    <span>User</span>
                    <svg width={18} height={18}>
                        <use href="sprite.svg#user"></use>
                    </svg>
                </div>
                <button type="button" className={css.userEditWrapper} onClick={() => setIsOpen(!isOpen)}>
                    <svg width={18} height={18}>
                        <use href="sprite.svg#edit"></use>
                    </svg>
                </button>
            </div>
            <div className={css.userBlock}>
                <div className={css.userAvatarBlock}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: "none" }}
                    />
                    <div className={css.userAvatarWrapper}>
                        {userData?.avatar ? (
                            <img src={userData.avatar} alt="User's photo" className={css.avatarImage} />
                        ) : (
                            <svg width={40} height={40}>
                                <use href="sprite.svg#user"></use>
                            </svg>
                        )}
                    </div>
                    {!userData?.avatar && (
                        <p className={css.uploadText} onClick={handleUploadClick}>
                            Upload photo
                        </p>
                    )}
                </div>
                <div className={css.userInformationBlock}>
                    <p className={css.userInformationTitle}>My information</p>
                    <div className={css.userInformationList}>
                        <div className={css.userInformationItem}>{userData?.name}</div>
                        <div className={css.userInformationItem}>{userData?.email}</div>
                        <div className={css.userInformationItem}>{userData?.phone || "+380"}</div>
                    </div>
                </div>
            </div>

            <div className={css.petsBlock}>
                <div className={css.petsBlockHeader}>
                    <p>My pets</p>
                    <NavLink to="#" className={css.addPetBtn}>Add pet +</NavLink>
                </div>

                <ul className={css.petList}>
                    {userData?.pets.map(pet => (
                        <PetCard key={pet._id} {...pet} />
                    ))}
                </ul>
            </div>
            <button type="button" className={css.logOutBtn}>Log out</button>

            {isOpen && <ModalEditUser userData={userData} onClose={() => setIsOpen(false)} />}
        </div>
    )
}
