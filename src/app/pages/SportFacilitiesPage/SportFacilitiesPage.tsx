import { SportFacility as SportFacilityComponent } from "@/app/widgets/SportFacility";
import styles from './styles.module.css';

type SportFacility = {
    id: number;
    image: string;
    title: string;
    address: string;
    coatingType: string;
    metro: string;
    bookingPrice: number;
}

export const SportFacilitiesPage = async () => {
    const res = await fetch('http://localhost:8080/facilities/all', {cache: 'no-store'});
    const facilities: SportFacility[] = (await res.json()) || [];
    
    return (
        <div className={styles.sportFacilitiesPage}>
            {facilities.map(facility => (
                <SportFacilityComponent
                    key={facility.id}
                    id={facility.id}
                    src={facility.image}
                    title={facility.title}
                    address={facility.address}
                    coating={facility.coatingType}
                    metro={facility.metro}
                    price={facility.bookingPrice}
                />
            ))}
        </div>
    );
};

export default SportFacilitiesPage;