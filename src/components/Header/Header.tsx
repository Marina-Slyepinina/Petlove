import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { useAuthStore } from "../../store/authStore";
import { UserNav } from "../UserNav/UserNav";
import { AuthNav } from "../AuthNav/AuthNav";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { Nav } from "../Nav/Nav";
import clsx from "clsx";
import css from "./Header.module.css";

export const Header = () => {

  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const logout = useAuthStore(state => state.logout)
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={clsx(css.headerContainer, isHome && css.home)}>

      <NavLink to="/" className={css.logo}>
        <svg>
          {isHome ? <use href="sprite.svg#logo-white"></use>
            : <use href="sprite.svg#logo-dark"></use>}
        </svg>
      </NavLink>

      <div className={css.navWrapper}>
        <Nav isHome={isHome} />
      </div>

      <div className={css.rightSection}>
        {!isLoggedIn ?
          <div className={css.authNavWrapper}>
            <AuthNav isHome={isHome} />
          </div>
          : <UserNav isHome={isHome} />}

        <button type="button" className={css.burgerMenu} onClick={() => setIsOpenMenu(true)}>
          <svg className={clsx(isHome && css.homeSvg)}>
            <use href="sprite.svg#menu"></use>
          </svg>
        </button>
      </div>

      {isOpenMenu && <BurgerMenu onClose={() => setIsOpenMenu(false)} isLoggedIn={isLoggedIn} logout={logout} isHome={isHome} />}

    </div>
  )
}