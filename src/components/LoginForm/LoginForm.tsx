import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { AuthInput } from "../AuthInput/AuthInput";
import { Title } from "../Title/Title";
import { useAuthStore } from "../../store/authStore";
import { loginSchema } from "../../schemas/authSchemas";
import css from "./LoginForm.module.css";

interface LoginFormData {
    email: string;
    password: string;
}


export const LoginForm = () => {

    const navigate = useNavigate();
    const loginUser = useAuthStore(state => state.login);
    
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm({
        mode: 'onChange',
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {

        try {
            await loginUser(data);
            reset();
            navigate('/profile', { replace: true });

        } catch (error) {

            if (error instanceof AxiosError && error.response) {
                const status = error.response.status;

                if (status === 400) {
                    alert('Bad request. Please check your data.');
                }

                if (status === 401) {
                    setError('email', {
                        type: 'server',
                        message: 'Invalid email or password.'
                    });
                    return;
                }
            }

            console.error('Log in error:', error);
        }
    }
    
    return (
        <div className={css.formWrapper}>
            <div className={css.formContainer}>
                <Title title="Login" />
                <p className={css.text}>Welcome! Please enter your credentials to login to the platform:</p>

                <form onSubmit={handleSubmit(onSubmit)} className={css.form} noValidate>

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

                    <button className={css.button} type="submit">Log in</button>
                </form>

                <div className={css.authSwitcher}>
                    <p className={css.switcherText}>
                        Don't have an account? <NavLink to="/register" className={css.switcherLink}>Register</NavLink>
                    </p>
                </div>
            </div>
        </div>
    )
}
