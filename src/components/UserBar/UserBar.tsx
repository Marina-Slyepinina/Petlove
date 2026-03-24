import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router'
import { useAuthStore } from '../../store/authStore';
import css from './UserBar.module.css'

export const UserBar = () => {

  const location = useLocation();
  const isHome = location.pathname === "/"

  const user = useAuthStore(state => state.user);
  console.log(user);

  return (
    <NavLink to="/profile" className={css.userBar}>
      <div className={clsx(css.userIcon, isHome && css.userIconWhite)}>
        {user?.avatar ? <img src={user.avatar} alt="Avatar" className={css.userAvatar} />
          : <svg>
            <use href='sprite.svg#user'></use>
          </svg>}
      </div>
      <p className={clsx(css.userName, isHome && css.userNameWhite)}>{user?.name}</p>
    </NavLink>
  )
}
