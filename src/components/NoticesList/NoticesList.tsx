import type { Note } from "../../types/notices";
import { NoticesItem } from "../NoticesItem/NoticesItem"
import css from "./NoticesList.module.css";

interface NoticesListProps {
  data: Note[];
}

export const NoticesList = ({ data }: NoticesListProps) => {
  return (
    <ul className={css.container}>
      {data.map(item => <NoticesItem key={item._id} note={item} />)}

    </ul>
  )
}
