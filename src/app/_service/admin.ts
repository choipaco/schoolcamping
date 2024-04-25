import axiosInstance from "@/utils/axiosInstance";
import { processDates } from "@/utils/time";
import axios from "axios";


export default async function getCalendarListAdmin(year:number, month:number) {

    try {
        const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DB_LINK}/api/admin/reservation/${year}/${month}`, {
        });
        return processDates(year,month,res.data); 
    } catch (error:any) {
        alert(error.response.data.message);
    }
}

export const getBlackList = async() =>{
    try {
        const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DB_LINK}/api/admin/blacklist`, {
        });
        return res.data; 
    } catch (error:any) {
        alert(error.response.data.message);
    }
}


export async function updateCalendarAdmin(data:any) {

    try {
        await axiosInstance.put(`${process.env.NEXT_PUBLIC_DB_LINK}/api/admin/reservation/update`, {
            id: data.id,
            leader: data.leader,
            reservationDate: data.reservationDate,
            students: data.students,
            teacherName: data.teacherName
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return true;
    } catch (error:any) {
        return false;
    }
    
}