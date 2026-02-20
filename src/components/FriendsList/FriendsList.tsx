import { useLoaderData } from "react-router";
import type { Friend } from "../../types/friends";
import { FriendsItem } from "../FriendsItem/FriendsItem"
import css from "./FriendsList.module.css";

export const FriendsList = () => {

  const data = useLoaderData() as Friend[];

  return (
    <ul className={css.list}>
      {data.map(item => {
        return <FriendsItem key={item._id} friend={item} />
      })}
    </ul>
  )
}