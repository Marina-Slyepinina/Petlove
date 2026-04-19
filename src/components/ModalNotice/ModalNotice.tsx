import clsx from 'clsx';
import { useFavoritesStore } from '../../store/favoritesStore';
import type { Note } from '../../types/notices';
import { Modal } from '../Modal/Modal'
import { NavButton } from '../NavButton/NavButton';
import css from "./ModalNotice.module.css";

interface ModalNoticeProps {
    onClose: () => void;
    note: Note;
}

const MAX_STARS = 5;

export const ModalNotice = ({ onClose, note }: ModalNoticeProps) => {

    const addFavorite = useFavoritesStore(state => state.addFavorite);
    const removeFavorite = useFavoritesStore(state => state.removeFavorite);
    const favoriteIds = useFavoritesStore(state => state.favoriteIds);
    const isFavorite = favoriteIds.find(item => item === note._id);

    const handleLikeBtn = (note: Note) => {

        if (favoriteIds.includes(note._id)) {
            removeFavorite(note._id);
            return;
        };

        addFavorite(note);
    }

    return (
        <Modal onClose={onClose}>
            <div className={css.container}>

                <div className={css.imgWrapper}>
                    <span className={css.categoryBadge}>{note.category}</span>
                    <img src={note.imgURL} alt={note.name} />
                </div>

                <div className={css.header}>
                    <p className={css.title}>{note.title}</p>
                    <div className={css.rating}>
                        {[...Array(MAX_STARS)].map(() => {
                            return (
                                <svg width={16} height={16} className={clsx(css.star, MAX_STARS <= note.popularity && css.accentStar)}>
                                    <use href="sprite.svg#star"></use>
                                </svg>
                            )
                        })}

                        <span>{note.popularity}</span>
                    </div>
                </div>

                <ul className={css.chracteristicsList}>
                    <li className={css.chracteristicItem}>
                        <p className={css.chracteristicCategoty}>Name</p>
                        <p className={css.chracteristicData}>{note.name}</p>
                    </li>
                    <li className={css.chracteristicItem}>
                        <p className={css.chracteristicCategoty}>Birthday</p>
                        <p className={css.chracteristicData}>{note.birthday}</p>
                    </li>
                    <li className={css.chracteristicItem}>
                        <p className={css.chracteristicCategoty}>Sex</p>
                        <p className={css.chracteristicData}>{note.sex}</p>
                    </li>
                    <li className={css.chracteristicItem}>
                        <p className={css.chracteristicCategoty}>Species</p>
                        <p className={css.chracteristicData}>{note.species}</p>
                    </li>
                    <li className={css.chracteristicItem}>
                        <p className={css.chracteristicCategoty}>Category</p>
                        <p className={css.chracteristicData}>{note.category}</p>
                    </li>
                </ul>

                <p className={css.text}>{note.comment}</p>

                <div className={css.price}>${note.price || ' Free'}</div>

                <div className={css.btnWrapper}>
                    <NavButton to={''} variant='primary' isFullWidth={true} onClick={() => handleLikeBtn(note)}>{isFavorite ? 'Remove' : 'Add to'}
                        <svg width={18} height={18} className={css.svg}>
                            {isFavorite ?
                                <use href='sprite.svg#trash'></use>
                                : <use href='sprite.svg#heart'></use>
                            }
                        </svg>
                    </NavButton>
                    <NavButton to={''} variant='secondary' isFullWidth={true}>Contact</NavButton>
                </div>
            </div>
        </Modal>
    )
}
