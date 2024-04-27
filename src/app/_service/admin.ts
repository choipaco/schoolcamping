import axiosInstance from "@/utils/axiosInstance";
import { createDatesArray, parseStudentInput } from "@/utils/form";
import { getDatesInRange, processDates } from "@/utils/time";
import axios from "axios";


export default async function getCalendarListAdmin(year:number, month:number) {

    try {
        const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DB_LINK}/api/admin/reservation/${year}/${month}`, {
        });
        return processDates(year,month,res.data); 
    } catch (error:any) {
        window.location.href = './login';
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
        await axiosInstance.put(`${process.env.NEXT_PUBLIC_DB_LINK}/api/admin/reservation`, {
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


export async function addBlackList(stu:string,reason:string) {
    const {studentId, studentName} = parseStudentInput(stu);

    try {
        await axiosInstance.post(`${process.env.NEXT_PUBLIC_DB_LINK}/api/admin/blacklist`, {
            studentId,
            studentName,
            reason,
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



export async function deleteBlackList(studentId:string) {

    try {
        await axiosInstance.delete(`${process.env.NEXT_PUBLIC_DB_LINK}/api/admin/blacklist`, {
            data:{
                studentId
            }
        });

        return true;
    } catch (error:any) {
        return false;
    }
}


export async function banDate(year:number, month:number, startDate:number, endDate:number, reason:string) {
    const data = createDatesArray(year,month,startDate,endDate,reason)
    try {
        await axiosInstance.post(`${process.env.NEXT_PUBLIC_DB_LINK}/api/admin/reservation/disable`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return true;
    } catch (error:any) {
        return false;
    }
}
export async function banDateList(year:number, month:number) {
    try {
        const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DB_LINK}/api/admin/reservation/disable/${year}/${month}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return res.data;
    } catch (error:any) {
        return false;
    }
}

export async function banDateDelete(startDate:string,endDate:string){
    const data = getDatesInRange(startDate,endDate);
    try {
        await axiosInstance.post(`${process.env.NEXT_PUBLIC_DB_LINK}/api/admin/reservation/enable`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return true;
    } catch (error:any) {
        return false;
    }
}

export async function getExecl(year:number,month:number) {
    try {
        const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DB_LINK}/api/admin/excel/${year}/${month}`, {
            responseType: 'blob'
        });
        return res.data
    } catch (error:any) {
        window.location.href = './login';
    }
}


export async function deleteCalendar(id:number) {
    try {
        await axiosInstance.delete(`${process.env.NEXT_PUBLIC_DB_LINK}/api/admin/reservation/${id}`, {});
        return true;
    } catch (error:any) {
        return false;
    }
    
}