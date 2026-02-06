import type { News } from "../../types/news";
import { NewsItem } from "../NewsItem/NewsItem"
import css from "./NewsList.module.css";

interface NewsListProps {
  data: News[];
}

export const NewsList = ({ data }: NewsListProps) => {
  return (
    <ul className={css.list}>
      {data.map((item) => <NewsItem {...item} />)}
    </ul>
  )
}
