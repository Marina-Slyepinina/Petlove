import clsx from "clsx";
import type { Note } from "../../types/notices";
import css from "./NoticesItem.module.css";


const demoData: Note = {
    _id: "6589436d05a6bcd9b9379420",
    species: "dog",
    category: "sell",
    price: 150,
    title: "Golden Retriever Puppies",
    name: "Max",
    birthday: "2022-01-10",
    comment: "Adorable puppy looking for a loving home.",
    sex: "male",
    location: "641ffcc1ae4e889a02d25ca5",
    imgURL: "https://ftp.goit.study/img/pets/1.webp",
    createdAt: "2023-12-11T10:43:28.477Z",
    user: "6576e7d0c4cc99fc5ef94221",
    popularity: 2,
    updatedAt: "2023-12-25T11:41:12.493Z"
}

export const NoticesItem = () => {
    return (
        <li className={css.container}>
            <div className={css.imgWrapper}><img src={demoData.imgURL} alt={demoData.title} className={css.img} /></div>
            <div className={css.info}>
                <div className={css.header}>
                    <p className={css.title}>{demoData.title}</p>
                    <div className={css.rating}>
                        <svg width={16} height={16}>
                            <use href="sprite.svg#star"></use>
                        </svg>
                        <span>{demoData.popularity}</span>
                    </div>
                </div>

                <ul className={css.chracteristicsList}>
                    <li className={css.chracteristicItem}>
                        <p className={css.chracteristicCategoty}>Name</p>
                        <p className={css.chracteristicData}>{demoData.name}</p>
                    </li>
                    <li className={css.chracteristicItem}>
                        <p className={css.chracteristicCategoty}>Birthday</p>
                        <p className={css.chracteristicData}>{demoData.birthday}</p>
                    </li>
                    <li className={css.chracteristicItem}>
                        <p className={css.chracteristicCategoty}>Sex</p>
                        <p className={css.chracteristicData}>{demoData.sex}</p>
                    </li>
                    <li className={css.chracteristicItem}>
                        <p className={css.chracteristicCategoty}>Species</p>
                        <p className={css.chracteristicData}>{demoData.species}</p>
                    </li>
                    <li className={css.chracteristicItem}>
                        <p className={css.chracteristicCategoty}>Category</p>
                        <p className={css.chracteristicData}>{demoData.category}</p>
                    </li>
                </ul>

                <p className={css.text}>{demoData.comment}</p>
            </div>

            <div className={css.footer}>
                <div className={css.price}>${demoData.price}</div>
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
