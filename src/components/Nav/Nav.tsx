import { NavButton } from "../NavButton/NavButton";
import css from "./Nav.module.css";

export const Nav = () => {
  return (
    <ul className={css.navContainer}>
      <NavButton to="news" variant="white">News</NavButton>
      <NavButton to="notices" variant="white">Find pet</NavButton>
      <NavButton to="friends" variant="white">Our friends</NavButton>
    </ul>
  )
}