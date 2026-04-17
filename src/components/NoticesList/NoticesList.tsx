import { useLocation } from "react-router";
import clsx from "clsx";
import type { Note } from "../../types/notices";
import { NoticesItem } from "../NoticesItem/NoticesItem"
import css from "./NoticesList.module.css";

interface NoticesListProps {
  data: Note[];
  variant: 'general' | 'like' | 'delete';
}

export const NoticesList = ({ data, variant }: NoticesListProps) => {

  const location = useLocation();

  return (
    <ul className={clsx(css.container, location.pathname === '/profile' && css.profilePageListContainer)}>
      {data.map(item => <NoticesItem key={item._id} note={item} variant={variant} />)}
    </ul>
  )
}
