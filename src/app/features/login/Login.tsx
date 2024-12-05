'use client'
import React, {useState} from "react";
import {Controller, useForm, SubmitHandler} from "react-hook-form";
import styles from "./styles.module.css";
import {HiXMark} from "react-icons/hi2";
import {CircularProgress} from "@mui/material";
import {useAppDispatch} from "@/app/shared/lib/hooks";
import {setAuthStatus, setModalContent, setModalVisibility} from "@/app/shared/model";
import cn from 'classnames';

interface LoginFormValues {
    username: string;
    password: string;
    loginError: string;
}
export const Login : React.FC = () => {
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<LoginFormValues>({
        defaultValues: {
            username: "",
            password: "",
            loginError: ""
        }
    });
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<{isError: boolean; message: string;}>({
        isError: false,
        message: ""
    })
    const confirmLogin: SubmitHandler<LoginFormValues> = async ({username, password}): Promise<void> => {
        try {
            setLoading(true)
            const response = await fetch("/auth/signin", {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), 
                cache: 'no-store'
            });
            
            const data = await response.text();

            if (!response.ok || data !== "Signed in successfully") {
                throw new Error('Ошибка авторизации');
            }
    
            dispatch(setModalVisibility(false));
            dispatch(setModalContent(null));
            dispatch(setAuthStatus(true));
            
            localStorage.setItem('authed', 'true');
        } catch (e: any) {
            setLoginError({
                isError: true,
                message: e.message || 'Произошла ошибка',
            });
        } finally {
            setLoading(false)
        }
    }
    const onClose = (): void  => {
        dispatch(setModalVisibility(false))
        dispatch(setModalContent(null))
    }
    const redirectToRegistration = (): void  => {
        dispatch(setModalContent('registration'))
    }
    return (
        <div className={styles.loginContainer}>
            <div className={styles.exitContainer}>
                <HiXMark size={26} onClick={onClose}/>
            </div>
            <form className={styles.loginForm} onSubmit={handleSubmit(confirmLogin)}>
                <h2>Авторизация</h2>
                <div className={styles.inputGroup}>
                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => (
                            <input type="text" autoComplete="off" {...field} className={cn(styles.defaultInput, {
                                [styles.activeInput]: field.value,
                                [styles.errorInput]: errors.username,
                            })}/>
                        )}
                        rules={{
                            required: "Данное поле обязательно",
                            pattern: {
                                value: /^[a-zA-Z0-9_-]+$/,
                                message: "Некорректный логин",
                            },
                            minLength: {
                                value: 3,
                                message: "Логин должен содержать минимум 3 символа",
                            },
                            maxLength: {
                                value: 16,
                                message: "Логин не должен превышать 16 символов",
                            },
                        }}
                    />
                    <label htmlFor="">{errors.username ? errors.username.message : "Логин"}</label>
                </div>
                <div className={styles.inputGroup}>
                    <Controller
                        name="password"
                        control={control}defaultValue=""
                        render={({ field }) => (
                            <input type="password" autoComplete="off" {...field} className={cn(styles.defaultInput, {
                                [styles.activeInput]: field.value,
                                [styles.errorInput]: errors.password,
                            })}/>
                        )}
                        rules={{
                            required: "Данное поле обязательно",
                            minLength: {
                                value: 3,
                                message: "Пароль должен содержать минимум 3 символа",
                            },
                            maxLength: {
                                value: 20,
                                message: "Пароль не должен превышать 20 символов",
                            },
                        }}
                    />
                    <label htmlFor="">{errors.password ? errors.password.message : "Пароль"}</label>
                </div>
                <button className={styles.loginBtn}>{loading ? <CircularProgress size={20} color={"inherit"}/> : "Войти"}</button>
                {
                    loginError.isError &&
                    <div className={styles.loginError}>
                        {loginError.message}
                    </div>
                }
                <span className={styles.accountInfo}>Нет аккаунта? <span onClick={redirectToRegistration}>Зарегистрироваться</span></span>
            </form>
        </div>
    );
};