import css from './Title.module.css'

interface TitleProps {
    title: string;
    className?: string;
}

export const Title = ({ title, className }: TitleProps) => {
  return (
    <h1 className={`${css.title} ${className}`}>{title}</h1>
  )
}