import { FC } from 'react';
import { GiSoccerField } from "react-icons/gi";
import { IoLocationSharp } from "react-icons/io5";
import { SiShanghaimetro } from "react-icons/si";
import { IoMdTime } from "react-icons/io";
import Link from "next/link";
import {ROUTES} from "@/app/shared/routing";
import styles from './styles.module.css';
import dayjs from 'dayjs';

type Props = {
    id: number;
    src: string;
    title: string;
    address: string;
    coating: string;
    metro: string;
    price: number;
    bookingStartTime?: string;
    bookingEndTime?: string;
}

export const SportFacility: FC<Props> = ({id, src, title, address, coating, metro, price, bookingStartTime, bookingEndTime}) => {
    const imageStyles = {
        backgroundImage: `url(${src})`
    }
    const formatTimeRange = (startTime: string, endTime: string) => {
        const start = dayjs(startTime);
        const end = dayjs(endTime);

        const formattedStartTime = start.format('HH:mm');
        const formattedEndTime = end.format('HH:mm');
        const formattedDate = start.format('DD.MM.YYYY');
    
        const formattedTimeRange = `${formattedStartTime}-${formattedEndTime} ${formattedDate}`;
    
        return formattedTimeRange;
    }
    return (
        <Link href={`/${ROUTES.SPORT_FACILITY}/${id}`} className={styles.sportFacility}>
            <div className={styles.sportFacilityImg} style={imageStyles}/>
            <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>
                    <div className={styles.descriptionElement}>
                        <IoLocationSharp color="#909090" size={17}/>
                        <span>{address}</span>
                    </div>
                    <div className={styles.descriptionElement}>
                        <GiSoccerField color="#909090" size={17}/>
                        <span>{coating}</span>
                    </div>
                    <div className={styles.descriptionElement}>
                        <SiShanghaimetro color="#909090" size={17}/>
                        <span>{metro}</span>
                    </div>
                    {bookingStartTime && bookingEndTime && (
                        <div className={styles.descriptionElement}>
                            <IoMdTime color="#909090" size={17}/>
                            <span>{formatTimeRange(bookingStartTime, bookingEndTime)}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.price}>
                <span>{`от ${price} ₽`}</span>
            </div>
        </Link>
    )
}