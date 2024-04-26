"use client"
import styles from './calendar.module.css'
import { getNextMonthYear } from '@/utils/time';
import CalendarList from './_components/calendarList/calendarList';
import Modal from './_components/modal/modal';
import { useEffect, useState } from 'react';
import PasswordModal from './_components/passwordModal/passwordModal';
import { createClassroomData } from '@/utils/form';
import { submitCalendar } from '@/app/_service/calendar';
import { useAlert } from '@/app/_contexts/AlertContext';
import Image from 'next/image';
import Link from 'next/link';

type pass = "create" | 'auth';

export default function Calendar(){
    const { addAlert } = useAlert();
    const [modal,setModal] = useState(false);
    const [passwordModal,setPasswordModal] = useState(false);
    const [passwordMode,setPasswordMode] = useState<pass>('create')
    const [data, setData] = useState<any>()
    const [submit,setSubmit] = useState<any>();
    const [password,setPassword] = useState('');
    const [reload,setReload] = useState(true);

    const day = new Date();
    day.setMonth(day.getMonth() + 2);

    const submitCalendarInput = async() =>{
        const submits = await submitCalendar(createClassroomData(submit.boss,submit.inputs,submit.teacher,data.date,0,password))
        if(submits){
            addAlert("예약이 완료되었습니다.", true);
            setReload(true);
        }else{
            addAlert("예약에 실패했습니다.", false);
        }
    }
    useEffect(()=>{
        if(data){
            if(data.status === "예약 가능"){ 
                setPasswordMode('create');
                setModal(true);
            }
            else if(data.status === "예약 완료"){ 
                setPasswordMode('auth');
                setPasswordModal(true);
            }
            else {}
        }
    },[data])

    useEffect(()=>{
        if(!modal && password){
            setData('');
        }
    },[modal])


    useEffect(()=>{
        if(submit){
            setPasswordModal(true);
        }
    },[submit])

    useEffect(()=>{
        if(password){
            submitCalendarInput();
            setPassword('');
        }
    },[password])

    return(
        <div className={styles.main}>
            <div className={styles.calendarContainer}>
                <div className={styles.calendarMonth}>
                    <div className={styles.month}>
                        {getNextMonthYear()}
                        <Image
                        className={styles.sonamu}
                        src="/assets/img/sonamu.svg"
                        alt=""
                        width={75}
                        height={70}
                        />
                    </div>
                </div>
                <div className={styles.calendarItem}>
                    <CalendarList date={day} setData={setData} reload={reload} setReload={setReload}/>
                    <Modal modal={modal} setModal={setModal} data={data} setSubmit={setSubmit} setData={setData} />
                    <PasswordModal modal={passwordModal} setModal={setPasswordModal} setPassword={setPassword} setData={setData} mode={passwordMode}/>
                </div>
            </div>
        </div>
    )
}