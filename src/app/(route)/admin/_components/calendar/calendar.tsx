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
type miniChoice = 'update' | 'delete' | 'none';
export default function Calendar(props:{reload:boolean,setReload:Dispatch<SetStateAction<boolean>>,nav:navbar, setNav:Dispatch<SetStateAction<navbar>>,date:date,setDate:Dispatch<SetStateAction<date>>,miniChoice:miniChoice ,setMiniChoice:Dispatch<SetStateAction<miniChoice>>, setData:Dispatch<SetStateAction<any>>}){
    const { addAlert } = useAlert();
    
    const day = new Date();
    day.setMonth(day.getMonth() + 2);

    useEffect(()=>{
        props.setReload(true);
    },[props.date])
    
    return(
        <div className={styles.main}>
            <div className={styles.calendarContainer}>
                <div className={styles.calendarMonth}>
                    <ChoiceDate date={props.date} setDate={props.setDate} nav={props.nav} setNav={props.setNav}/>
                </div>
                <div className={styles.calendarItem}>
                    <CalendarList date={props.date} setData={props.setData} reload={props.reload} setReload={props.setReload} miniChoice={props.miniChoice} setMiniChoice={props.setMiniChoice}/>
                </div>
            </div>
            
        </div>
    )
}