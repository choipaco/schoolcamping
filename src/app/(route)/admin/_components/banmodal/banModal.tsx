'use client'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from './banModal.module.css'
import { getNextMonthDateFormatted } from '@/utils/time';
import { validateStudent } from '@/app/_service/calendar';
import { useAlert } from '@/app/_contexts/AlertContext';
import Image from 'next/image';
import { addBlackList, updateCalendarAdmin } from '@/app/_service/admin';
import { createClassroomData } from '@/utils/form';

export default function BanModal(props:{modal:boolean, setModal:Dispatch<SetStateAction<boolean>>, setReload:Dispatch<SetStateAction<boolean>>}) {
    const { addAlert } = useAlert();
    const [stu, setStu] = useState('');
    const [ban, setBan] = useState('');

    const handleOnClickBackground = () => {
        setStu('')
        setBan('')
        props.setModal(false);
    }


    const handleOnClickSubmit = async() =>{
        if(!stu) return addAlert("학번이름을 입력해주세요",false);
        if(!ban) return addAlert("금지사유를 입력해주세요",false);

        const res = await addBlackList(stu,ban);

        if(res){
            addAlert("추가완료",true);
            props.setReload(true);
            props.setModal(false);
            setStu('')
            setBan('')
        }else{
            addAlert("추간에 실패했습니다",false);
        }
    }
    return(
        <div className={styles.main}
        style={
            props.modal ? {display:'flex'} : {display: 'none'}
        }
        >
            <div className={styles.background} onClick={handleOnClickBackground}/>
            <div className={styles.modalContainer}>
                <div className={styles.blackListContainer}>
                <div className={styles.title}>
                    블랙리스트 추가
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.subTitle}>
                        학번이름
                    </div>
                    <input 
                    type='text' 
                    placeholder='학번이름'
                    value={stu}
                    onChange={(e)=>{setStu(e.target.value)}}
                    className={styles.input}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.subTitle}>
                        금지사유
                    </div>
                    <textarea 
                    placeholder='금지사유'
                    value={ban}
                    onChange={(e)=>{setBan(e.target.value)}}
                    className={styles.textArea}
                    />
                </div>

                <div className={styles.submitBtnContainer}>
                    <button className={styles.submitBtn} onClick={handleOnClickSubmit}>추가하기</button>
                    
                </div>
                </div>
            </div>
        </div>
    )
}