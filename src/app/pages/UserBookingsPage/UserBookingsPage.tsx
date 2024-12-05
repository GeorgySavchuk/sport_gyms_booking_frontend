import React, {FC} from 'react';
import { SportFacility as SportFacilityComponent } from "@/app/widgets/SportFacility";
import styles from './styles.module.css';

type SportFacility = {
    sportFacility: {
        id: number;
        image: string;
        title: string;
        address: string;
        coatingType: string;
        metro: string;
        bookingPrice: number;
    },
    startTime: string;
    endTime: string;
}

type Props = {
    facilities: SportFacility[];
}

export const UserBookingsPage: FC<Props> = async ({facilities}) => {    
    return (
        <div className={styles.userBookingsPage}>
            {facilities.length !== 0 ? facilities.map(facility => (
                <SportFacilityComponent
                    key={facility.sportFacility.id}
                    id={facility.sportFacility.id}
                    src={facility.sportFacility.image}
                    title={facility.sportFacility.title}
                    address={facility.sportFacility.address}
                    coating={facility.sportFacility.coatingType}
                    metro={facility.sportFacility.metro}
                    price={facility.sportFacility.bookingPrice}
                    bookingStartTime={facility.startTime}
                    bookingEndTime={facility.endTime}
                />
            ))
            : <span className={styles.emptyBookings}>На ближайшее время у вас нет бронирований</span>
        }
        </div>
    );
};

export default UserBookingsPage;