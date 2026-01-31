import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { useAuthStore } from "../../store/authStore";
import { UserNav } from "../UserNav/UserNav";
import { AuthNav } from "../AuthNav/AuthNav";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { Nav } from "../Nav/Nav";
import css from "./Header.module.css";

export const Header = () => {

  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const logout = useAuthStore(state => state.logout)
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={css.headerContainer}>

      <NavLink to="/" className={css.logo}>
        <svg>
          <use href="sprite.svg#logo-dark"></use>
        </svg>
      </NavLink>

      <div className={css.navWrapper}>
        <Nav />
      </div>

      <div className={css.rightSection}>
        {!isLoggedIn ?
          <div className={css.authNavWrapper}>
            <AuthNav isHome={isHome} />
          </div>
          : <UserNav />}

        <button type="button" className={css.burgerMenu} onClick={() => setIsOpenMenu(true)}>
          <svg>
            <use href="sprite.svg#menu"></use>
          </svg>
        </button>
      </div>

      {isOpenMenu && <BurgerMenu onClose={() => setIsOpenMenu(false)} isLoggedIn={isLoggedIn} logout={logout} isHome={isHome} />}

    </div>
  )
}