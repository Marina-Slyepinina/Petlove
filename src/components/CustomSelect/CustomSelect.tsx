import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import css from './CustomSelect.module.css';

interface CustomSelectProps {
    options: string[];
    onChange: (option: string) => void;
    placeholder: string;
}

export const CustomSelect = ({ options, onChange, placeholder }: CustomSelectProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const [selectedOption, setSelectedOption] = useState('');

    const handleSelect = (optionValue: string) => {
        setSelectedOption(optionValue);
        onChange(optionValue);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={css.selectWrapper} ref={selectRef}>
            <div
                className={clsx(css.selectHeader)}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedOption ? selectedOption : placeholder}</span>
                <svg className={clsx(css.chevron, isOpen && css.open)} width={18} height={18}>
                    <use href="sprite.svg#chevron-down"></use>
                </svg>
            </div>
            {isOpen && (
                <ul className={css.optionsList}>
                    <li
                        className={clsx(css.optionItem, selectedOption === '' && css.selected)}
                        onClick={() => handleSelect('')}
                    >Show all
                    </li>
                    {options.map((option) => (
                        <li key={option} className={clsx(css.optionItem, selectedOption === option && css.selected)} onClick={() => handleSelect(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
