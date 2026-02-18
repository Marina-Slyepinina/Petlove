import type { Friend } from "../../types/friends"
import { WorkingHours } from "../WorkingHours/WorkingHours"
import css from "./FriendsItem.module.css";

interface FriendsItemProps {
  friend: Friend;
}

export const FriendsItem = ({ friend }: FriendsItemProps) => {
  return (
    <li className={css.container}>
      <WorkingHours workDays={friend.workDays} />
      <div className={css.contentWrapper}>
        <img src={friend.imageUrl} alt={friend.title} className={css.img} />
        <div className={css.info}>
          <p className={css.title}>{friend.title}</p>
          <div className={css.contacts}>
            <p>Email: <a href={`mailto:${friend.email}`} className={css.contactsInfo}>{friend.email}</a></p>
            <p>Address: <a href={friend.addressUrl} target="_blank" rel="noopener noreferrer" className={css.contactsInfo}>{friend.address}</a></p>
            <p>Phone: <a href={`tel:${friend.phone}`} className={css.contactsInfo}>{friend.phone}</a></p>
          </div>
        </div>
      </div>
    </li>
  )
}