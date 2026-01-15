import { useState } from 'react';
import { type UseFormRegisterReturn, type FieldError } from 'react-hook-form';
import clsx from 'clsx';
import css from './AuthInput.module.css';

interface AuthInputProps {
    register: UseFormRegisterReturn;
    error?: FieldError;
    placeholder: string;
    type?: string;         
}

export const AuthInput = ({ register, error, placeholder, type = 'text' }: AuthInputProps) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isPasswordType = type === 'password';

    const currentType = isPasswordType ? (isPasswordVisible ? 'text' : 'password') : type;

    return (
        <div className={css.inputWrapper}>
            <input
                className={clsx(css.input, error ? css.error : '')}
                type={currentType}
                placeholder={placeholder}
                {...register}
            />

            {isPasswordType && !error && (
                <svg className={css.iconEye} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <use href={isPasswordVisible ? "sprite.svg#eye-open" : "sprite.svg#eye-off"}></use>
                </svg>
            )}

            {error && (
                <svg className={css.iconError}>
                    <use href='sprite.svg#cross-small'></use>
                </svg>
            )}

            {error && <p className={css.errorMessage}>{error.message}</p>}
        </div>
    );
};