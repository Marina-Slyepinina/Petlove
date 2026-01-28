import { NavLink } from "react-router";
import { Nav } from "../Nav/Nav";
import { UserNav } from "../UserNav/UserNav";
import { AuthNav } from "../AuthNav/AuthNav";
import { useAuthStore } from "../../store/authStore";
import css from "./Header.module.css";

export const Header = () => {

  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

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
            <AuthNav />
          </div>
          : <UserNav />}

        <button type="button" className={css.burgerMenu}>
          <svg>
            <use href="sprite.svg#menu"></use>
          </svg>
        </button>
      </div>

    </div>
  )
}