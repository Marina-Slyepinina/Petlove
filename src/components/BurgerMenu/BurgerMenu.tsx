import clsx from "clsx";
import { Nav } from "../Nav/Nav";
import { NavButton } from "../NavButton/NavButton";
import { AuthNav } from "../AuthNav/AuthNav";
import css from "./BurgerMenu.module.css";

interface BurgerMenuProps {
    onClose: () => void;
    logout: () => void;
    isLoggedIn: boolean;
    isHome: boolean;
}

export const BurgerMenu = ({ onClose, isLoggedIn, logout, isHome }: BurgerMenuProps) => {

    const handleClose = () => {
        logout();
        onClose();
    }

    const handleNavClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.closest('a')) {
            onClose();
        }
    }

  return (
      <div className={clsx(css.menu, isHome && css.accent)}>
        <div className={css.menuWrapper}>
            <button type="button" onClick={onClose}>
                <svg  className={clsx(css.close, isHome && css.white)}>
                    <use href="sprite.svg#cross-small"></use>
                </svg>
            </button>
            
            <div onClick={handleNavClick} className={css.navContainer}>
                <Nav isBurger={true} isHome={isHome} />
                {isLoggedIn ? (
                <div className={css.logout}>
                    <NavButton to="/login" onClick={handleClose} children="Log out" variant={isHome ? "secondary" : "primary"} isFullWidth={true} />
                </div>)
                : <AuthNav isHome={isHome} isBurger={true} />
                }
            </div>
        </div>
    </div>
  )
}