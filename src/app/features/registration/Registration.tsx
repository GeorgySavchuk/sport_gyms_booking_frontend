'use client'
import React, {useState} from "react";
import {Controller, useForm, SubmitHandler} from "react-hook-form";
import styles from "./styles.module.css";
import {HiXMark} from "react-icons/hi2";
import {CircularProgress} from "@mui/material";
import {useAppDispatch} from "@/app/shared/lib/hooks";
import {setAuthStatus, setModalContent, setModalVisibility} from "@/app/shared/model";
import cn from 'classnames'

interface RegistrationFormValues {
    email: string;
    username: string;
    password: string;
    registrationError: string;
}

export const Registration: React.FC = () => {
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<RegistrationFormValues>({
        defaultValues: {
            username: "",
            password: "",
            registrationError: ""
        }
    });
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState<boolean>(false);
    const [registrationError, setRegistrationError] = useState<{isError: boolean; message: string;}>({
        isError: false,
        message: ""
    })

    const onClose = (): void => {
        dispatch(setModalVisibility(false));
        dispatch(setModalContent(null));
    };

    const redirectToLogin = (): void => {
        dispatch(setModalContent('login'));
    };

    const confirmRegistration: SubmitHandler<RegistrationFormValues> = async ({username, password}): Promise<void> => {
        try {
            setLoading(true)
            const response = await fetch("/auth/signup", {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), 
                cache: 'no-store'
            });
            
            const data = await response.text();

            if (!response.ok || data !== "User created") {
                throw new Error('Ошибка регистрации');
            }
    
            dispatch(setModalVisibility(false));
            dispatch(setModalContent(null));
            dispatch(setAuthStatus(true));

            localStorage.setItem('authed', 'true');
        } catch (e: any) {
            setRegistrationError({
                isError: true,
                message: e.message || 'Произошла ошибка',
            });
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.registrationContainer}>
            <div className={styles.exitContainer}>
                <HiXMark size={26} onClick={onClose} />
            </div>
            <form className={styles.registrationForm} onSubmit={handleSubmit(confirmRegistration)}>
                <h2>Регистрация</h2>
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
                <button className={styles.registrationBtn}>{loading ? <CircularProgress size={20} color={"inherit"}/> : "Создать аккаунт"}</button>
                {
                    registrationError.isError &&
                    <div className={styles.registrationError}>
                        {registrationError.message}
                    </div>
                }
                <span className={styles.accountInfo}>Есть аккаунт? <span onClick={redirectToLogin}>Войти</span></span>
            </form>
        </div>
    );
};