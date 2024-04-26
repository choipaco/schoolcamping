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

type banChoice = 'ban' | 'pardon';
export default function BanDateModal(props:{modal:boolean, setModal:Dispatch<SetStateAction<boolean>>,setReload:Dispatch<SetStateAction<boolean>>, data:any,}) {
    const { addAlert } = useAlert();
    const [day,setDay] = useState<any>();
    const [banChoice, setBanChoice] = useState<banChoice>('ban');

    useEffect(()=>{
        console.log(props.data)
    },[props.data])




    const handleOnClickBackground = () => {

        props.setModal(false);
    }

    const handleOnClickSubmit = async() =>{
        // if(!boss) return addAlert("대표자를 입력해주세요",false);
        // if(!teacher) return addAlert("선생님 성함을 입력해주세요",false);
        // if(!inputs[0].value) return addAlert('참가자를 한명이라도 입력해주세요',false);

        const res = 'shangus';
        if(res){
            addAlert("수정완료",true);
        }else{
            addAlert("수정에 실패했습니다",false);
        }
    }
    return(
        <div className={styles.main}
        style={props.modal ? {display: 'flex'} : {display: 'none'}}
        >
            <div className={styles.background} onClick={handleOnClickBackground}/>
            <div className={styles.modalContainer}>
                <div className={styles.header}>
                    <div className={styles.prev}>
                    {`<`}
                    </div>
                    <div className={styles.month}>
                    5월
                    </div>
                    <div className={styles.next}>
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
                    <BanItem/>
                </div>
            </div>
        </div>
    )
}