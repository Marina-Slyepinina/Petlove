import { useState } from "react";
import clsx from "clsx";
import { useAuthStore } from "../../store/authStore";
import { useViewedStore } from "../../store/useViewedStore";
import { NoticesList } from "../NoticesList/NoticesList";
import css from "./MyNotices.module.css";

export const MyNotices = () => {

    const favourites = useAuthStore(state => state.user?.noticesFavorites)
    const viewed = useViewedStore(state => state.viewedNotices)

    const [isFavoriteActive, setIsFavoriteActive] = useState(true);
    const [isViewedActive, setIsViewedActive] = useState(false);

    const setFavoritesActive = () => {
        setIsFavoriteActive(true);
        setIsViewedActive(false);
    }
    const setViewedActive = () => {
        setIsViewedActive(true);
        setIsFavoriteActive(false);
    }

    return (
        <div className={css.noticesContainer}>
            <div className={css.switchesBtns}>
                <button type="button" onClick={setFavoritesActive} className={clsx(css.btn, isFavoriteActive && css.active)}>My favorite pets</button>
                <button type="button" onClick={setViewedActive} className={clsx(css.btn, isViewedActive && css.active)}>Viewed</button>
            </div>
            <div className={css.noticesList}>
                {isFavoriteActive && favourites && <NoticesList data={favourites} variant="delete" />}
                {isViewedActive && viewed && <NoticesList data={viewed} variant="general" />}
            </div>
        </div>
    )
}
