import { UserBookingsPage } from "@/app/pages";

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

export default async function SportFacility({
    params,
}: {
    params: Promise<{id: string}>,
}) {
    const id = (await params).id;
    const res = await fetch(`http://localhost:8080/bookings/user/${id}`, {cache: 'no-store'});
    const facilities: SportFacility[] = (await res.json()) || {};

    return (
        <UserBookingsPage facilities={facilities}/>
    )
}