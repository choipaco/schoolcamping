'use client'
import styles from "./calendarList.module.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import getCalendarList from "@/app/_service/calendar";
import CalendarItem from "../calendarItem/calendarItem";


export default function CalendarList(props:{date?:Date, setData:Dispatch<SetStateAction<any>>, reload:boolean,  setReload:Dispatch<SetStateAction<boolean>>, permit:GetCalendars}){
    const [day,setDay] = useState<Day[]>()
    const getList = async() =>{
        if(props.date){
            setDay(await getCalendarList(props.date.getFullYear(),props.date.getMonth() + Number(process.env.NEXT_PUBLIC_DAY_NUMBER)))
        }
        else{
            props.setReload(true);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            if(props.reload){
                props.setReload(false);
                await getList();
            }
        };
        fetchData();
    }, [props.reload, props.setReload,props.date]);
     

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
                                    <CalendarItem day={day} setData={props.setData} permit={props.permit?.isValidToday}/>
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