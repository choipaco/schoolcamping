'use client'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from './modal.module.css'
import { getNextMonthDateFormatted } from '@/utils/time';
import { validateStudent } from '@/app/_service/calendar';
import { useAlert } from '@/app/_contexts/AlertContext';
import Image from 'next/image';
import { updateCalendarAdmin } from '@/app/_service/admin';
import { createClassroomData } from '@/utils/form';

type miniChoice = 'update' | 'delete' | 'none';
export default function Modal(props:{setReload:Dispatch<SetStateAction<boolean>>, data:any, setData:Dispatch<SetStateAction<any>>, miniChoice:miniChoice, setMiniChoice:Dispatch<SetStateAction<miniChoice>>}) {
    const { addAlert } = useAlert();
    const [boss,setBoss] = useState(props.data.info.leaderId + props.data.info.leaderName);
    const [teacher,setTeacher] = useState(props.data.info.teacherName);
    const [inputs, setInputs] = useState([{ value: '' }]);
    const [day,setDay] = useState<any>();
    useEffect(()=>{
        setInputs(props.data.info.reservationStudents.map((it:any)=>{
            return(
                { value: it.studentId + it.studentName }
            )
        }))
    },[])
    useEffect(()=>{
        if(props.data) {
            setDay(getNextMonthDateFormatted(props.data.date));
        }
    },[props.data])
    
    const handleOnChangeBoss = (e:ChangeEvent<HTMLInputElement>) => {
        setBoss(e.target.value);
    }
    const handleOnChangeTeacher = (e:ChangeEvent<HTMLInputElement>) => {
        setTeacher(e.target.value);
    }

    const handleAddInput = () => {
      if (inputs.length < 8) {
        setInputs(inputs.concat([{ value: '' }]));
      }
    };

    const handleRemoveInput = (indexToRemove:any) => {
        setInputs(inputs.filter((_, index) => index !== indexToRemove));
    };

    const handleInputChange = (index:number, event:ChangeEvent<HTMLInputElement>) => {
      const newInputs = inputs.slice();
      newInputs[index].value = event.target.value;
      setInputs(newInputs);
    };  

    const handleOnClickBackground = () => {
        props.setMiniChoice('none');
        setBoss('')
        setTeacher('')
        setInputs([{ value: '' }])
        setDay('')
        props.setData("");
    }

    const handleOnClickSubmit = async() =>{
        if(!boss) return addAlert("대표자를 입력해주세요",false);
        if(!teacher) return addAlert("선생님 성함을 입력해주세요",false);
        if(!inputs[0].value) return addAlert('참가자를 한명이라도 입력해주세요',false);

        const res = await updateCalendarAdmin(createClassroomData(boss,inputs,teacher,props.data.date,props.data.info.id));
        if(res){
            addAlert("수정완료",true);
            props.setReload(true);
            props.setMiniChoice('none');
            setBoss('')
            setTeacher('')
            setInputs([{ value: '' }])
            setDay('')
        }else{
            addAlert("수정에 실패했습니다",false);
        }
    }
    return(
        <div className={styles.main}>
            <div className={styles.background} onClick={handleOnClickBackground}/>
            <div className={styles.modalContainer}>
                <div className={styles.title}>
                    {day}
                </div>
                <div className={styles.inputContainer}>
                        <label className={styles.bossTitle}>참가자 수정하기</label>
                    <div className={styles.inputItemList}>
                    <div className={styles.bossContainer}>
                        <label className={styles.commonTitle}>대표자</label><br/>
                        <input 
                            type='text' 
                            value={boss} 
                            onChange={handleOnChangeBoss}
                            className={styles.commonInput}
                            placeholder='학번이름 예)3105김찬민'
                        />
                        
                    </div>
                    <div className={styles.bossContainer}>
                        <label className={styles.commonTitle}>담당선생님</label><br/>
                        <input 
                            type='text' 
                            value={teacher} 
                            onChange={handleOnChangeTeacher}
                            className={styles.commonInput}
                            placeholder='선생님 성함 예)서승범'
                        />
                    </div>
                    
                    {inputs.map((input, index) => (
                        <>
                        <div key={index} className={styles.bossContainer}>
                            {
                                index === 0 ?
                                <>
                                <label className={styles.commonTitle}>참가자 명단</label><br/>
                                </>
                                :
                                ""
                            }
                            <div className={styles.listContainer}>
                                <input
                                    type="text"
                                    value={input.value}
                                    onChange={(event) => handleInputChange(index, event)}
                                    className={styles.commonListInput}
                                    placeholder='학번이름'
                                    />
                                    {inputs.length > 1 && (
                                        <div 
                                        className={styles.deleteBtn}
                                        onClick={() => handleRemoveInput(index)}>
                                            <Image
                                            src="/assets/img/deleteMan.svg"
                                            alt=""
                                            width={20}
                                            height={16}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        {index === inputs.length - 1 && inputs.length < 8 && (
                             <div className={styles.bossContainer}>
                                <div className={styles.more} onClick={handleAddInput}>
                                    +
                                </div>
                             </div>
                        )}
                        </>
                    ))}
                    </div>
                </div>
                <div className={styles.formBtnContainer}>
                    <button
                    className={styles.formBtn}
                    onClick={handleOnClickSubmit}
                    >
                        수정완료
                    </button>
                </div>
            </div>
        </div>
    )
}