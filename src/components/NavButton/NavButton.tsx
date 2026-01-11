import { NavLink } from "react-router";
import css from "./NavButton.module.css";
import clsx from "clsx";

interface NavButtonProps {
    to: string;
    children: React.ReactNode;
    variant?: 'white' | 'primary' | 'secondary' | 'outline';
    onClick?: () => void;
}

export const NavButton = ({ to, children, variant = 'white', onClick }: NavButtonProps) => {
  return (
    <NavLink to={to} onClick={onClick} className={({isActive}) => clsx(css.btn, css[variant], {[css.active]: isActive})}>{children}</NavLink>
  )
}