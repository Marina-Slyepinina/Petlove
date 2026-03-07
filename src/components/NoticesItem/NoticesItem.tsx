import clsx from "clsx";
import type { Note } from "../../types/notices";
import css from "./NoticesItem.module.css";

interface NoticesItemProps {
    note: Note;
}

export const NoticesItem = ({ note }: NoticesItemProps) => {
    return (
        <li className={css.container}>
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
                    <button type="button" className={clsx(css.btn, css.btnMore)}>Learn more</button>
                    <button type="button" className={clsx(css.btn, css.btnLike)}>
                        <svg width={18} height={18}>
                            <use href="sprite.svg#heart"></use>
                        </svg>
                    </button>
                </div>
            </div>
        </li>
    )
}
