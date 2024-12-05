'use client'
import React, {useEffect, useState} from 'react';
import {ROUTES} from "@/app/shared/routing";
import {CircularProgress} from "@mui/material";
import { CgLogIn } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import styles from './styles.module.css';
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@/app/shared/lib/hooks";
import {setModalContent, setModalVisibility} from "@/app/shared/model";
import {Modal} from "@/app/shared/ui/modal/Modal";
import { checkAuth, getUserInfo } from '@/app/shared/utils';


export const Header = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [authed, setAuthed] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<{id: number; username: string}>({id: 0, username: ''});
    const dispatch = useAppDispatch()
    const {isVisible, content} = useAppSelector(state => state.modalReducer)
    const {authed: _authed} = useAppSelector(state => state.authReducer);
    const handleLoginBtnClick = () : void  => {
        dispatch(setModalVisibility(true))
        dispatch(setModalContent('login'))
    }

    useEffect(() => {
        const userAuthed = checkAuth() || _authed;
        setAuthed(userAuthed);
    }, [_authed]);

    useEffect(() => {
        if (authed) {
            getUserInfo().then(res => {
                setUserInfo(res);
            }).catch(error => {
                console.error('Error fetching user info:', error);
            });
        }
        setLoading(false);
    }, [authed])

    return (
        <header className={styles.pageHeader}>
            <Link href={ROUTES.HOME}>
                <h1>SportTime</h1>
            </Link>
            <nav className={styles.navlinks}>
                <Link href={`/${ROUTES.SPORT_FACILITIES}`}>
                    <span>ПЛОЩАДКИ</span>
                </Link>
            </nav>
            <div className={styles.auth}>
                {
                    loading 
                    ? <CircularProgress color='inherit' size={18}/> 
                    : authed 
                    ? <>
                        <FaRegUserCircle/>
                        <Link className={styles.account} href={`/${ROUTES.USER_BOOKINGS}/${userInfo.id}`}>{userInfo.username}</Link>
                    </>
                    : <>
                        <CgLogIn/>
                        <button className={styles.login} onClick={handleLoginBtnClick}>Войти</button>
                    </>
                }
            </div>
            <Modal isVisible={isVisible} content={content}/>
        </header>
    );
}