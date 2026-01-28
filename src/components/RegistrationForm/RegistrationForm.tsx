import { NavLink, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthStore } from '../../store/authStore';
import { Title } from '../Title/Title'
import { AuthInput } from '../AuthInput/AuthInput';
import { registrationSchema } from '../../schemas/authSchemas';
import css from './RegistrationForm.module.css'

interface RegistrationFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const RegistrationForm = () => {

    const navigate = useNavigate();
    const registerUser = useAuthStore(state => state.register);

    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm({
        mode: 'onChange',
        resolver: yupResolver(registrationSchema),
    });

    const onSubmit = async (data: RegistrationFormData) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...userData } = data;

        try {
            await registerUser(userData);
            reset();
            navigate('/profile', { replace: true });

        } catch (error) {

            if (error instanceof AxiosError && error.response) {
                const status = error.response.status;

                if (status === 409) {
                    setError('email', {
                        type: 'server',
                        message: 'Such email already exists'
                    });
                    return;
                }

                if (status === 400) {
                    alert('Bad request. Please check your data.');
                }
            }

            console.error('Registration error:', error);
        }
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