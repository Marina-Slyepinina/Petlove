import { NavLink } from "react-router";
import { Nav } from "../Nav/Nav";
import css from "./Header.module.css";
import { UserNav } from "../UserNav/UserNav";
import { AuthNav } from "../AuthNav/AuthNav";

export const Header = () => {

  const isAutehenticated = false;

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
        {!isAutehenticated ?
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