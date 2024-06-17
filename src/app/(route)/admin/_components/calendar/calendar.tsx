"use client"
import styles from './calendar.module.css'
import { getNextMonthYear, getYearAndMonth } from '@/utils/time';
import CalendarList from './_components/calendarList/calendarList';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { createClassroomData } from '@/utils/form';
import { getCalendar, submitCalendar } from '@/app/_service/calendar';
import { useAlert } from '@/app/_contexts/AlertContext';
import ChoiceDate from './_components/choiceDate/choiceDate';

type navbar = 'list' | 'black';

interface date{
    year: number
    month: number
}
type miniChoice = 'update' | 'delete' | 'none';
export default function Calendar(props:{reload:boolean,setReload:Dispatch<SetStateAction<boolean>>,nav:navbar, setNav:Dispatch<SetStateAction<navbar>>,date:date,setDate:Dispatch<SetStateAction<date>>,miniChoice:miniChoice ,setMiniChoice:Dispatch<SetStateAction<miniChoice>>, setData:Dispatch<SetStateAction<any>>, setBanDate:Dispatch<SetStateAction<boolean>>}){
    const { addAlert } = useAlert();
    
    const [day, setDay] = useState<Date>();

    const getDay = async () =>{
        setDay(new Date(String( getCalendar())));
    }

    useEffect(()=>{
        getDay();
        if (day) {
            const newDay = new Date(day); // 기존 day 객체를 복사하여 새 Date 객체를 생성
            newDay.setMonth(day.getMonth() + 2); // 현재 월에 2를 더함 (월은 0부터 시작하므로 +2)
            setDay(newDay); // 업데이트된 날짜를 day 상태에 저장
          }
        
    },[])

    useEffect(()=>{
        props.setReload(true);
    },[props.date])
    
    return(
        <div className={styles.main}>
            <div className={styles.calendarContainer}>
                <div className={styles.calendarMonth}>
                    <ChoiceDate date={props.date} setDate={props.setDate} nav={props.nav} setNav={props.setNav} setBanDate={props.setBanDate}/>
                </div>
                <div className={styles.calendarItem}>
                    <CalendarList date={props.date} setData={props.setData} reload={props.reload} setReload={props.setReload} miniChoice={props.miniChoice} setMiniChoice={props.setMiniChoice}/>
                </div>
            </div>
            
        </div>
    )
}