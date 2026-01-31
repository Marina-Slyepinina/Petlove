import { NavLink, useLocation } from 'react-router'
import css from './UserBar.module.css'
import clsx from 'clsx';

export const UserBar = () => {

  const location = useLocation();
  const isHome = location.pathname === "/"

  return (
    <NavLink to="/profile" className={css.userBar}>
      <div className={clsx(css.userIcon, isHome && css.userIconWhite)}>
        <svg>
          <use href='sprite.svg#user'></use>
        </svg>
      </div>
      <p className={clsx(css.userName, isHome && css.userNameWhite)}>User name</p>
    </NavLink>
  )
}
