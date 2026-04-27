import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import clsx from "clsx";
import type { Note } from "../../types/notices";
import { useAuthStore } from "../../store/authStore";
import { useFavoritesStore } from "../../store/favoritesStore";
import { useViewedStore } from "../../store/useViewedStore";
import { ModalAttention } from "../ModalAttention/ModalAttention";
import { ModalNotice } from "../ModalNotice/ModalNotice";
import css from "./NoticesItem.module.css";

interface NoticesItemProps {
    note: Note;
    variant: 'general' | 'like' | 'delete';
}


export const NoticesItem = ({ note, variant }: NoticesItemProps) => {

    const location = useLocation();

    const fetchFavorites = useFavoritesStore(state => state.fetchFavorites);
    const addFavorite = useFavoritesStore(state => state.addFavorite);
    const removeFavorite = useFavoritesStore(state => state.removeFavorite);
    const favoriteIds = useFavoritesStore(state => state.favoriteIds);
    const isFavorite = favoriteIds.find(item => item === note._id)
    const addViewed = useViewedStore(state => state.addViewed);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites])

    const [isModalAttentionOpen, setIsModalAttentionOpen] = useState(false);
    const [isModalLearnMoreOpen, setIsModalLearnMoreOpen] = useState(false);

    const isLoggedIn = useAuthStore(state => state.isLoggedIn);

    const handleLearnMoreBtn = () => {
        if (!isLoggedIn) {
            setIsModalAttentionOpen(true)
            return;
        }
        setIsModalLearnMoreOpen(true)
        addViewed(note);
    }

    const handleLikeBtn = (note: Note) => {
        if (!isLoggedIn) {
            setIsModalAttentionOpen(true)
            return;
        }

        if (favoriteIds.includes(note._id)) {
            removeFavorite(note._id);
            return;
        };

        addFavorite(note);
    }

    return (
        <li className={clsx(css.container, location.pathname === '/profile' && css.profilePageItemContainer)}>
            <div className={css.imgWrapper}><img src={note.imgURL} alt={note.title} className={css.img} /></div>
            <div className={css.info}>
                <div className={css.header}>
                    <p className={css.title}>{note.title}</p>
                    <div className={css.rating}>
                        <svg width={16} height={16}>
                            <use href="sprite.svg#star"></use>
                        </svg>
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
            </div>

            <div className={css.footer}>
                <div className={css.price}>${note.price || ' Free'}</div>
                <div className={css.btnsContainer}>
                    <button type="button" className={clsx(css.btn, css.btnMore)} onClick={handleLearnMoreBtn}>Learn more</button>
                    {variant == 'like' && <button type="button" className={clsx(css.btn, css.btnLike)} onClick={() => handleLikeBtn(note)}>
                        <svg width={18} height={18} className={clsx(isFavorite && css.filled)}>
                            <use href="sprite.svg#heart"></use>
                        </svg>
                    </button>}
                    {variant == 'delete' && <button type="button" className={clsx(css.btn, css.btnDelete)} onClick={() => handleLikeBtn(note)}>
                        <svg width={18} height={18} className={clsx(isFavorite && css.filled)}>
                            <use href="sprite.svg#trash"></use>
                        </svg>
                    </button>}
                </div>
            </div>
            {isModalAttentionOpen && (
                <ModalAttention onClose={() => setIsModalAttentionOpen(false)} />
            )}
            {isModalLearnMoreOpen && (
                <ModalNotice note={note} onClose={() => setIsModalLearnMoreOpen(false)} />
            )}
        </li>
    )
}
