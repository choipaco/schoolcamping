'use client'
import { processDates } from "@/utils/time";
import styles from "./calendarList.module.css";
import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import getCalendarListAdmin from "@/app/_service/admin";
import CalendarItem from "../calendarItem/calendarItem";

interface Day{
    date?: string
    info: info | null
}

interface date{
    year: number
    month: number
}
interface info{
    id: number,
    leaderName: string,
    leaderId: string,
    teacherName: string,
    reservationDate: string,
    reservationStudents:reservationStudents[]
}

interface reservationStudents{
    id: number,
    studentName: string,
    studentId: string
}

type miniChoice = 'update' | 'delete' | 'none';
export default function CalendarList(props:{date:date, setData:Dispatch<SetStateAction<any>>, reload:boolean,  setReload:Dispatch<SetStateAction<boolean>>, miniChoice:miniChoice , setMiniChoice:Dispatch<SetStateAction<miniChoice>>}){
    const [day,setDay] = useState<Day[]>();
    const getList = async() =>{
        setDay(await getCalendarListAdmin(props.date.year,props.date.month));
    }

    useEffect(() => {
        const fetchData = async () => {
            if(props.date){
                await getList();
                props.setReload(false);
            }
        };
        fetchData();
    }, [props.reload, props.setReload, props.date]);



    const chunkArray = (size:number, array?:Day[]) => {
        const chunked_arr = [];
        if(!array){
            return;
        }
        for (let i = 0; i < array.length; i += size) {
            chunked_arr.push(array.slice(i, i + size));
        }
        return chunked_arr;
    };

    const weeks = chunkArray(5,day);
    return(
        <table className={styles.main}>
        <thead>
            <tr>
                <th className={styles.head}>월요일</th>
                <th className={styles.head}>화요일</th>
                <th className={styles.head}>수요일</th>
                <th className={styles.head}>목요일</th>
                <th className={styles.head}>금요일</th>
            </tr>
        </thead>
        <tbody>
            {
                weeks?.map((week, idx) => (
                    <tr key={idx}>
                        {week.map(( day, index) => (
                            <td key={index} className={styles.body}>
                                {
                                    day.date ?
                                    <CalendarItem key={''} day={day} month={props.date.month} year={props.date.year} setData={props.setData} setMiniChoice={props.setMiniChoice}/>
                                    :
                                    <></>
                                }
                            </td>
                        ))}
                    </tr>
                ))
            }
        </tbody>
    </table>
    )
}