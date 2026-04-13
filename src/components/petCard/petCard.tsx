import { useAuthStore } from "../../store/authStore";
import { deletePet } from "../../lib/petsApi";
import css from "./petCard.module.css";

interface petCardProps {
    _id: string,
    name: string,
    title: string,
    imgURL: string,
    species: string,
    birthday: string,
    sex: string,
}

export const PetCard = ({ _id, name, imgURL, title, birthday, sex, species }: petCardProps) => {

    const removePetFromStore = useAuthStore(state => state.removeUserPet);

    const handleDeletePet = async (id: string) => {
        try {
            await deletePet(id);
            removePetFromStore(id);
        } catch (error) {
            console.error('Failed to delete pet: ', error);
        }
    };

    return (
        <li className={css.petCard}>
            <img className={css.petCardImage} src={imgURL} alt="pet photo" />
            <div className={css.petCardInfo}>
                <p className={css.petCardTitle}>{title}</p>
                <div className={css.petCardChracteristics}>
                    <div className={css.chracteristicItem}>
                        <p className={css.chracteristicCategoty}>Name</p>
                        <p className={css.chracteristicData}>{name}</p>
                    </div>
                    <div className={css.chracteristicItem}>
                        <p className={css.chracteristicCategoty}>Birthday</p>
                        <p className={css.chracteristicData}>{birthday}</p>
                    </div>
                    <div className={css.chracteristicItem}>
                        <p className={css.chracteristicCategoty}>Sex</p>
                        <p className={css.chracteristicData}>{sex}</p>
                    </div>
                    <div className={css.chracteristicItem}>
                        <p className={css.chracteristicCategoty}>Species</p>
                        <p className={css.chracteristicData}>{species}</p>
                    </div>
                </div>
            </div>

            <button type="button" className={css.deleteBtn} onClick={() => handleDeletePet(_id)}>
                <svg width={16} height={16}>
                    <use href="sprite.svg#trash"></use>
                </svg>
            </button>
        </li>
    )
}
