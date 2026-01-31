import clsx from "clsx";
import { NavButton } from "../NavButton/NavButton";
import css from "./Nav.module.css";

interface NavProps {
  isHome?: boolean;
  isBurger?: boolean;
}

export const Nav = ({ isHome, isBurger }: NavProps) => {
  return (
    <ul className={clsx(css.navContainer, isBurger && css.burger)}>
      <NavButton to="news" variant={isHome ? "outline" : "transparent"}>News</NavButton>
      <NavButton to="notices" variant={isHome ? "outline" : "transparent"}>Find pet</NavButton>
      <NavButton to="friends" variant={isHome ? "outline" : "transparent"}>Our friends</NavButton>
    </ul>
  )
}