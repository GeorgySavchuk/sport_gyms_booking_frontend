import { FC } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { GiSoccerField } from "react-icons/gi";
import { IoMdTime } from "react-icons/io";
import { TbHanger } from "react-icons/tb";
import { LiaShowerSolid } from "react-icons/lia";
import { HiOutlineLightBulb } from "react-icons/hi";
import { PiStepsFill } from "react-icons/pi";
import { FaCar } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import styles from './styles.module.css'
import { ROUTES } from '@/app/shared/routing';
import { BookingDate } from '@/app/widgets/BookingDate';
import {Toaster} from "sonner";
import Image from 'next/image';

type Props = {
    id: number;
    title: string;
    src: string;
    address: string;
    workInterval: string[];
    areaParams: string;
    coatingType: string;
    areaType: string;
    changingRooms: boolean;
    tribune: boolean;
    shower: boolean;
    lighting: boolean;
    parkingSpace: boolean;
    parkingSpaceType: string;
    maxPeopleCount?: number;
}

export const SportFacilityPage: FC<Props> = ({id, title, src, address, workInterval, areaParams, coatingType, areaType, changingRooms, tribune, shower, lighting, parkingSpace, parkingSpaceType, maxPeopleCount}) => {
    return (
        <div className={styles.sportFacilityPage}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <Link href={`/${ROUTES.SPORT_FACILITIES}`} className={styles.backBtn}>
                        <FaArrowLeftLong size={20} color="#000"/>
                    </Link>
                    <span>{title}</span>
                </div>
                <div className={styles.addressAndTime}>
                    <div className={styles.address}>
                        <IoLocationSharp color="#909090" size={17}/>
                        <span>{address}</span>
                    </div>
                    <div className={styles.time}> 
                        <IoMdTime color="#909090" size={17}/>
                        <span>{`с ${workInterval[0]} до ${workInterval[1]}`}</span>
                    </div>
                </div>
                <div className={styles.mainInfo}>
                    <div className={styles.facilityImg}>
                        <Image src={src} alt="Фото спортивной площадки" width={400} height={400}/>
                    </div>
                    <div className={styles.facilityDetails}>
                       <div className={styles.areaDetails}>
                            <div className={styles.firstRow}>
                                <div className={styles.areaParams}>
                                    <GiSoccerField color="#000" size={16}/>
                                    <span>{areaParams}</span>
                                </div>
                                <div className={styles.verticalSeparator}/>
                                <span className={styles.facilityDetail}>{coatingType}</span>
                                <div className={styles.verticalSeparator}/>
                                <span className={styles.facilityDetail}>{areaType}</span>
                            </div>
                            {maxPeopleCount && 
                                <div className={styles.secondRow}>
                                    <span>{`Вмещает игроков — ${maxPeopleCount}`}</span>
                                </div>
                            }
                        </div>
                        <div className={styles.amenities}>
                            <div className={styles.amenity}>
                                <div className={styles.amentityTitle}>
                                    <TbHanger color='#000' size={16}/>
                                    <span>Раздевалки</span>
                                </div>
                                {changingRooms ? <MdDone color="#47A76A" size={16}/> : <RxCross1 color="FF2400" size={16}/>}
                            </div>
                            <div className={styles.amenity}>
                                <div className={styles.amentityTitle}>
                                    <PiStepsFill color='#000' size={16}/>
                                    <span>Трибуны</span>
                                </div>
                                {tribune ? <MdDone color="#47A76A" size={16}/> : <RxCross1 color="FF2400" size={16}/>}
                            </div>
                            <div className={styles.amenity}>
                                <div className={styles.amentityTitle}>
                                    <LiaShowerSolid color='#000' size={16}/>
                                    <span>Душ</span>
                                </div>
                                {shower ? <MdDone color="#47A76A" size={16}/> : <RxCross1 color="FF2400" size={16}/>}
                            </div>
                            <div className={styles.amenity}>
                                <div className={styles.amentityTitle}>
                                    <HiOutlineLightBulb color='#000' size={16}/>
                                    <span>Освещение</span>
                                </div>
                                {lighting ? <MdDone color="#47A76A" size={16}/> : <RxCross1 color="FF2400" size={16}/>}
                            </div>
                            <div className={styles.amenity}>
                                <div className={styles.amentityTitle}>
                                    <FaCar color='#000' size={16}/>
                                    <div className={styles.parkingInfo}>
                                        <span>Парковка</span>
                                        {parkingSpace && (
                                            <>
                                                <span>—</span>
                                                <span className={styles.parkingSpaceType}>{parkingSpaceType}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                {parkingSpace ? <MdDone color="#47A76A" size={16}/> : <RxCross1 color="FF2400" size={16}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BookingDate id={id}/>
        </div>
    );
}