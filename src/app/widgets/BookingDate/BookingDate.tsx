'use client';
import React, { FC, useState, useEffect } from 'react';
import {toast, Toaster} from "sonner";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import {CircularProgress} from "@mui/material";
import cn from 'classnames';
import styles from './styles.module.css';
import { checkAuth, getUserInfo } from '@/app/shared/utils';
import {useAppDispatch, useAppSelector} from "@/app/shared/lib/hooks";
import {setModalContent, setModalVisibility} from "@/app/shared/model";

type Props = {
    id: number;
}

type WeekIntervalItem = {
    date: string;
    items: {
        time: string;
        booked: boolean;
        price:  number;
    }[];
}

const DAYS = [
    'пн',
    'вт',
    'ср',
    'чт',
    'пт',
    'сб',
    'вс'
];

export const BookingDate: FC<Props> = ({id}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [userInfo, setUserInfo] = useState<{id: number; username: string}>({id: 0, username: ''});
    const [currentWeekIndex, setCurrentWeekIndex] = useState<number>(0);
    const [weekInterval, setWeekInterval] = useState<WeekIntervalItem[]>([]);
    const [selectedButtonIndex, setSelectedButtonIndex] = useState<{ dayIndex: number, itemIndex: number } | null>(null);
    const dispatch = useAppDispatch()
    const {authed} = useAppSelector(state => state.authReducer);

    useEffect(() => {
        fetchWeekInterval(currentWeekIndex);
    }, [currentWeekIndex]);

    useEffect(() => {
        const userAuthed = checkAuth() || authed;

        if (userAuthed) {
            getUserInfo().then(res => {
                setUserInfo(res);
            }).catch(error => {
                console.error('Error fetching user info:', error);
            });
        }
    }, [authed]);

    const fetchWeekInterval = async (weekIndex: number) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/bookings/schedule/${id}?weekIndex=${weekIndex}`, {cache: 'no-store'});
            const data: WeekIntervalItem[] = await response.json();
            setWeekInterval(data);
            setSelectedButtonIndex(null);
        } catch (error) {
            console.error('Error fetching week interval:', error);
        } finally {
            setLoading(false)
        }
    };

    const bookFacility = async () => {
        if (!checkAuth()) {
            dispatch(setModalVisibility(true))
            dispatch(setModalContent('login'))
            return;
        }
        const { dayIndex, itemIndex } = selectedButtonIndex as { dayIndex: number, itemIndex: number };
        const selectedItem = weekInterval[dayIndex].items[itemIndex];

        const date = weekInterval[dayIndex].date; 
        const time = selectedItem.time; 

        const startTime = `${date} ${time}`;

        const endTime = `${date} ${Number(time.split(':')[0]) + 1}:00`

        console.log(startTime, endTime)

        const bookingData = {
            userId: userInfo.id,
            sportFacilityId: id,
            startTime,
            endTime,
        };


        try {
            const response = await fetch('/api/bookings/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                toast.success('Площадка успешно забронирована');
                fetchWeekInterval(currentWeekIndex);
                setSelectedButtonIndex(null);
            } else {
                toast.error('Произошла ошибка при бронировании');
            }
        } catch (error) {
            console.error('Error booking facility:', error);
            toast.error('Произошла ошибка при бронировании');
        }
    }

    const handlePrevWeek = () => {
        setCurrentWeekIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const handleNextWeek = () => {
        setCurrentWeekIndex(prevIndex => prevIndex + 1);
    };

    const handleButtonClick = (dayIndex: number, itemIndex: number) => {
        setSelectedButtonIndex({ dayIndex, itemIndex });
    };

    return (
        <div className={styles.booking}>
            <Toaster position="bottom-right" richColors/>
            <div className={styles.bookingInfo}>
                <div className={styles.tooltip}>Выберите удобное время для занятий и нажмите «Забронировать»</div>
                <button className={styles.bookingBtn} disabled={!selectedButtonIndex} onClick={bookFacility}>Забранировать</button>
            </div>
            <div className={styles.bookingDatesAndPrices}>
                {
                    loading
                        ? <CircularProgress size={30} color={"inherit"} />
                        :  
                        <div className={styles.bookingWrapper}>
                            <div className={styles.dateScroll}>
                                <div className={styles.leftChevron}>
                                    {currentWeekIndex > 0 && (
                                        <button onClick={handlePrevWeek} className={styles.chevronButton}>
                                            <FaChevronLeft color="#000" size="20"/>
                                        </button>
                                    )}
                                </div>
                                <div className={styles.bookingDates}>
                                    {weekInterval.map(({date}, idx) => (
                                        <div 
                                            className={cn(styles.day, {
                                                [styles.weekend]: idx === 5 || idx === 6,
                                            })}
                                            key={`booking-date-${idx}`}
                                        >
                                            <span className={styles.dayBoldDate}>{date}</span>
                                            <span className={styles.weekDay}>{DAYS[idx]}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.rightChevron}>
                                    <button onClick={handleNextWeek} className={styles.chevronButton}>
                                        <FaChevronRight color="#000" size="20"/>
                                    </button>
                                </div>
                            </div>
                            <div className={styles.bookingPrices}>
                                <div className={styles.leftTimeCol}>
                                    {weekInterval[0]?.items.map(({ time }, idx) => (
                                        <div className={styles.timeWrapper} key={`left-time-col-${idx}`}>
                                            <span key={time} className={cn({
                                                [styles.startTime]: time.split(':')[1] === '00',
                                                [styles.endTime]: time.split(':')[1] !== '00',
                                            })}>
                                                {time}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.weekIntervalPrices}>
                                    {weekInterval.map(({ items }, dayIndex) => (
                                        <div className={styles.dayPrices} key={`week-prices-${dayIndex}`}>
                                            {items.map((item, itemIndex) => (
                                                <button 
                                                    key={`week-prices-btn-${itemIndex}`} 
                                                    disabled={item.booked}
                                                    className={cn({
                                                        [styles.selected]: selectedButtonIndex?.dayIndex === dayIndex && selectedButtonIndex?.itemIndex === itemIndex,
                                                    })}
                                                    onClick={() => handleButtonClick(dayIndex, itemIndex)}
                                                >
                                                    {`${item.price} ₽`}
                                                </button>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.rightTimeCol}>
                                    {weekInterval[0]?.items.map(({ time }, idx) => (
                                        <div className={styles.timeWrapper} key={`right-time-col-${idx}`}>
                                            <span key={time} className={cn({
                                                [styles.startTime]: time.split(':')[1] === '00',
                                                [styles.endTime]: time.split(':')[1] !== '00',
                                            })}>
                                                {time}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};