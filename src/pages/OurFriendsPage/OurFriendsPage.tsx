import { FriendsList } from "../../components/FriendsList/FriendsList";
import { Title } from "../../components/Title/Title";
import css from "./OurFriendsPage.module.css";

const OurFriendsPage = () => {
  return (
    <div className={css.container}>
      <Title title="Our friends" />
      <FriendsList />
    </div>
  )
}
export default OurFriendsPage;