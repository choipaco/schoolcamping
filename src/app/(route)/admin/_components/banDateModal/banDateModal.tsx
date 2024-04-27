'use client'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from './banDateModal.module.css'
import { getNextMonthDateFormatted } from '@/utils/time';
import { validateStudent } from '@/app/_service/calendar';
import { useAlert } from '@/app/_contexts/AlertContext';
import Image from 'next/image';
import { updateCalendarAdmin } from '@/app/_service/admin';
import { createClassroomData } from '@/utils/form';
import BanItem from './_components/banItem/banItem';
import BanList from './_components/banList/banList';

type banChoice = 'ban' | 'pardon';
export default function BanDateModal(props:{modal:boolean, setModal:Dispatch<SetStateAction<boolean>>,setReload:Dispatch<SetStateAction<boolean>>, data:any,}) {
    const { addAlert } = useAlert();
    const [day,setDay] = useState<any>(props.data.month);
    const [banChoice, setBanChoice] = useState<banChoice>('ban');
    const [reload, setReload] = useState(true);
    const [reloadList, setReloadList] = useState(true);
    const handleOnClickPrev = () =>{
        if(day - 1 === 0){
            return addAlert('이번년도 만 금지 할 수 있습니다', false);
        }
        setDay(day - 1);
        setReload(true);
        setReloadList(true)
    }
    const handleOnClickNext = () =>{
        if(day + 1 === 13){
            return addAlert('이번년도 만 금지 할 수 있습니다', false);
        }
        setDay(day + 1);
        setReload(true);
        setReloadList(true)
    }


    const handleOnClickBackground = () => {

        props.setModal(false);
    }

    useEffect(()=>{
        if(banChoice === 'ban'){
            setReload(true);
        }else{
            setReloadList(true);
        }
    },[banChoice])
    return(
        <div className={styles.main}
        style={props.modal ? {display: 'flex'} : {display: 'none'}}
        >
            <div className={styles.background} onClick={handleOnClickBackground}/>
            <div className={styles.modalContainer}>
                <div className={styles.header}>
                    <div className={styles.prev} onClick={handleOnClickPrev}>
                    {`<`}
                    </div>
                    <div className={styles.month}>
                    {day}월
                    </div>
                    <div className={styles.next} onClick={handleOnClickNext}>
                    {`>`}
                    </div>
                </div>
                <div className={styles.nav}>
                    <button 
                    className={banChoice === 'ban' ? styles.seletedNavBtn : styles.navBtn}
                    onClick={()=>{setBanChoice('ban')}}
                    >
                        금지
                    </button>

                    <button 
                    className={banChoice === 'pardon' ? styles.seletedNavBtn : styles.navBtn}
                    onClick={()=>{setBanChoice('pardon')}}
                    >
                        해제
                    </button>
                </div>
                <div className={styles.titleContainer}>
                    {
                        banChoice === 'ban'  ?
                        "예약 금지할 날짜를 선택해주세요"
                        :
                        "해제할 날짜를 선택해주세요"
                    }
                </div>
                <div className={styles.bodyContainer}>
                    {
                        banChoice === 'ban' ?
                        <BanItem date={day} reload={reload} setReload={setReload} setCalendarReload={props.setReload}/>
                        :
                        <BanList date={day} reloadList={reloadList}  setReloadList={setReloadList}/>
                    }
                </div>
            </div>
        </div>
    )
}