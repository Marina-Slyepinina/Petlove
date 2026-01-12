import { NavLink } from 'react-router'
import css from './UserBar.module.css'

export const UserBar = () => {
  return (
    <NavLink to="/profile" className={css.userBar}>
        <div className={css.userIcon}>
            <svg>
                <use href='sprite.svg#user'></use>
            </svg>
        </div>
        <p className={css.userName}>User name</p>
    </NavLink>
  )
}
