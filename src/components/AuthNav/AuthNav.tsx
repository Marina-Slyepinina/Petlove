import clsx from 'clsx';
import { NavButton } from '../NavButton/NavButton'
import css from './AuthNav.module.css'

interface AuthNavProps {
  isHome?: boolean;
  isBurger?: boolean;
}

export const AuthNav = ({ isHome, isBurger }: AuthNavProps) => {

  return (
    <div className={clsx(css.authNav, isBurger && css.burger)}>
      <NavButton to="/login" variant={isHome ? "outline" : "primary"}>LOG IN</NavButton>
      <NavButton to="/register" variant={"secondary"}>REGISTRATION</NavButton>
    </div>
  )
}