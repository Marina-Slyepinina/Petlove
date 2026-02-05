import type { News } from "../../types/news";
import { formatDate } from "../../lib/utils";
import css from "./NewsItem.module.css";

export const NewsItem = ({ _id, imgUrl, title, text, date, url }: News) => {
  
  return (
    <li key={_id} className={css.card}>
      <img src={imgUrl} alt={title} className={css.img} />
      <div className={css.cardInfo}>
        <h2 className={css.cardTitle}>{title}</h2>
        <p className={css.cardText}>{text}</p>
      </div>
      <div className={css.cardFooter}>
        <p className={css.cardData}>{formatDate(date)}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className={css.link}>Read more</a>
      </div>
    </li>
  )
}