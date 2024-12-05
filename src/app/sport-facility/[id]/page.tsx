import { SportFacilityPage } from "@/app/pages";
import { useParams } from 'next/navigation';

type SportFacility = {
    id: number;
    image: string;
    title: string;
    address: string;
    workInterval: string;
    areaParams: string;
    coatingType: string;
    areaType: string;
    changingRooms: boolean;
    tribune: boolean;
    shower: boolean;
    lighting: boolean;
    parkingSpace: boolean;
    parkingType: string;
    maxPeopleCount?: number;
}

export default async function SportFacility({
    params,
}: {
    params: Promise<{id: string}>,
}) {
    const id = (await params).id;
    const res = await fetch(`http://localhost:8080/facilities/${id}`, {cache: 'no-store'});
    const facility: SportFacility = (await res.json()) || {};

    return (
        <SportFacilityPage 
            id={Number(id)}
            title={facility.title}
            src={facility.image}
            address={facility.address}
            workInterval={facility.workInterval.split('-')}
            areaParams={facility.areaParams}
            coatingType={facility.coatingType}
            areaType={facility.areaType}
            changingRooms={facility.changingRooms}
            tribune={facility.tribune}
            shower={facility.shower}
            lighting={facility.lighting}
            parkingSpace={facility.parkingSpace}
            parkingSpaceType={facility.parkingType}
            maxPeopleCount={facility.maxPeopleCount}
        />
    )
}