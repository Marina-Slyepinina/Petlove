import { NavLink } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from '../../schemas/authSchemas';
import { Title } from '../Title/Title'
import { AuthInput } from '../AuthInput/AuthInput';
import css from './RegistrationForm.module.css'

export const RegistrationForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(registrationSchema),
    });

    const onSubmit = (data: unknown) => {
        console.log(data);
    }
    
    return (
        <div className={css.formWrapper}>
            <div className={css.formContainer}>
                <Title title="Registration" />
                <p className={css.text}>Thank you for your interest in our platform.</p>

                <form onSubmit={handleSubmit(onSubmit)} className={css.form} noValidate>

                    <AuthInput
                        register={register('name')}
                        error={errors.name}
                        placeholder="Name"
                    />

                    <AuthInput
                        register={register('email')}
                        error={errors.email}
                        placeholder="Email"
                        type="email"
                    />

                    <AuthInput
                        register={register('password')}
                        error={errors.password}
                        placeholder="Password"
                        type="password"
                    />

                    <AuthInput
                        register={register('confirmPassword')}
                        error={errors.confirmPassword}
                        placeholder="Confirm password"
                        type="password"
                    />

                    <button className={css.button} type="submit">Registration</button>
                </form>

                <div className={css.authSwitcher}>
                    <p className={css.switcherText}>
                        Already have an account? <NavLink to="/login" className={css.switcherLink}>Login</NavLink>
                    </p>
                </div>
            </div>
        </div>
    )
}