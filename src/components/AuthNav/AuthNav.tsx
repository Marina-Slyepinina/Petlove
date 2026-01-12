import { NavButton } from '../NavButton/NavButton'
import css from './AuthNav.module.css'

export const AuthNav = () => {
  return (
    <div className={css.authNav}>
        <NavButton to="/login" variant="primary">LOG IN</NavButton>
        <NavButton to="/register" variant="secondary">REGISTRATION</NavButton>
    </div>
  )
}
