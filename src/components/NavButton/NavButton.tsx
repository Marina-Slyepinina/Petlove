import { NavLink } from "react-router";
import css from "./NavButton.module.css";
import clsx from "clsx";

interface NavButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'transparent' | 'outline';
  onClick?: () => void;
  isFullWidth?: boolean;
}

export const NavButton = ({ to, children, variant = 'transparent', onClick, isFullWidth }: NavButtonProps) => {
  return (
    <NavLink to={to} onClick={onClick} className={({ isActive }) => clsx(css.btn, css[variant], { [css.active]: isActive }, isFullWidth && css.fullWidth)}>{children}</NavLink>
  )
}