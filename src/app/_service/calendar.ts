import { validate } from "@/utils/form";
import { processDates } from "@/utils/time";
import axios from "axios";

export default async function getCalendarList(year:number, month:number) {

    
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DB_LINK}/api/calendar/${year}/${month}`, {
        });
        return processDates(year,month,res.data); 
    } catch (error:any) {
        alert(error.response.data.message);
    }
}


export async function submitCalendar(data:any) {

    try {
        await axios.post(`${process.env.NEXT_PUBLIC_DB_LINK}/api/camping`, {
            leader: data.leader,
            password: data.password,
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

export async function validateStudent(leaderInput:string, studentsInput: { value: string }[],reservationDate: string) {
    const data = validate(leaderInput,studentsInput,reservationDate)

    if(!data) return false;
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_DB_LINK}/api/camping/validate/student`, {
            studentsInfo: data.studentsInfo,
            date: data.date
        }, {
            headers: {
                'Content-Type': 'application/json'
            }   
        });

        return res.status;
    } catch (error:any) {
        return false;
    }
}