"use client"
import styles from './calendar.module.css'
import { getNextMonthYear, getYearAndMonth } from '@/utils/time';
import CalendarList from './_components/calendarList/calendarList';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { createClassroomData } from '@/utils/form';
import { submitCalendar } from '@/app/_service/calendar';
import { useAlert } from '@/app/_contexts/AlertContext';
import ChoiceDate from './_components/choiceDate/choiceDate';

type navbar = 'list' | 'black';

interface date{
    year: number
    month: number
}

export default function Calendar(props:{nav:navbar, setNav:Dispatch<SetStateAction<navbar>>,date:date,setDate:Dispatch<SetStateAction<date>>}){
    const { addAlert } = useAlert();
    const [data, setData] = useState<any>()
    const [reload,setReload] = useState(true);
    
    const day = new Date();
    day.setMonth(day.getMonth() + 2);

    useEffect(()=>{
        setReload(true);
    },[props.date])
    return(
        <div className={styles.main}>
            <div className={styles.calendarContainer}>
                <div className={styles.calendarMonth}>
                    <ChoiceDate date={props.date} setDate={props.setDate} nav={props.nav} setNav={props.setNav}/>
                </div>
                <div className={styles.calendarItem}>
                    <CalendarList date={props.date} setData={setData} reload={reload} setReload={setReload}/>
                </div>
            </div>
        </div>
    )
}