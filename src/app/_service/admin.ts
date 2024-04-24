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