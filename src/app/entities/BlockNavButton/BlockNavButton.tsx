'use client'
import { FC } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import styles from './styles.module.css';
import { useRouter } from 'next/navigation'
import { ROUTES } from "@/app/shared/routing";

type Props = {
    title: string;
    icon: JSX.Element;
}

export const BlockNavButton: FC<Props> = ({title, icon}) => {
    const router = useRouter()
    return (
        <div className={styles.blockNavButton} onClick={() => router.push(ROUTES.SPORT_FACILITIES)}>
            <div className={styles.icon}>
                {icon}
            </div>
            <span className={styles.title}>{title}</span>
            <div className={styles.arrow}>
                <IoIosArrowRoundForward/>
            </div>
        </div>
    );
};