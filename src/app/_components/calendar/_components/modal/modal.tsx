'use client'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from './modal.module.css'
import { getNextMonthDateFormatted } from '@/utils/time';
import { validateStudent } from '@/app/_service/calendar';
import { useAlert } from '@/app/_contexts/AlertContext';

export default function Modal(props:{modal:boolean,setModal:Dispatch<SetStateAction<boolean>>, data:any, setSubmit:Dispatch<SetStateAction<any>>, setData:Dispatch<SetStateAction<any>>}) {
    const { addAlert } = useAlert();
    const [boss,setBoss] = useState('');
    const [teacher,setTeacher] = useState('');
    const [inputs, setInputs] = useState([{ value: '' }]);
    const [day,setDay] = useState<any>();
    
    useEffect(()=>{
        if(props.data) {
            const getDay = async()=>{
                setDay(await getNextMonthDateFormatted(props.data.date));
            }
            getDay();
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

    const handleInputChange = (index:number, event:ChangeEvent<HTMLInputElement>) => {
      const newInputs = inputs.slice();
      newInputs[index].value = event.target.value;
      setInputs(newInputs);
    };  

    const handleOnClickBackground = () => {
        props.setModal(false);
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
            
            const res = await validateStudent(boss,inputs,props.data.date);
            if(!res) return addAlert("학번을 정확히 써주세요", false);
            if(res !== 200){
                return addAlert("참가 불가능한 학생이 있습니다",false);
            }
         props.setSubmit({
            boss,
            teacher,
            inputs
         })

        props.setModal(false);
        setBoss('')
        setTeacher('')
        setInputs([{ value: '' }])
        setDay('')
    }
    return(
        <div className={styles.main}
        style={props.modal ? {display: "flex"} : {display: "none"}}
        >
            <div className={styles.background} onClick={handleOnClickBackground}/>
            <div className={styles.modalContainer}>
                <div className={styles.title}>
                    {day}
                </div>
                <div className={styles.inputContainer}>
                        <label className={styles.bossTitle}>참가자를 입력해주세요</label>
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
                        <input
                            type="text"
                            value={input.value}
                            onChange={(event) => handleInputChange(index, event)}
                            className={styles.commonInput}
                            placeholder='학번이름'
                        />
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
                        신청완료
                    </button>
                </div>
            </div>
        </div>
    )
}