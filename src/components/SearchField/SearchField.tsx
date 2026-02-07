import { useState } from 'react';
import clsx from 'clsx';
import css from './SearchField.module.css';

interface SearchFieldProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchField = ({ onSearch, placeholder, className }: SearchFieldProps) => {

  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  const handleClear = () => {
    setQuery('');
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input type="text" className={clsx(css.input, className)} placeholder={placeholder} value={query} onChange={handleChange}/>

      <div className={css.actionsBlock}>
        {query && <button type="button" onClick={handleClear}>
          <svg className={css.clearSvg}>
            <use href='sprite.svg#cross-small'></use>
          </svg>
        </button>}
        <button type="submit">
          <svg className={css.searchSvg}>
            <use href='sprite.svg#search'></use>
          </svg>
        </button>
      </div>
    </form>
  );
};