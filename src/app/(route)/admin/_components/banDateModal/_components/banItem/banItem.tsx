import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './banItem.module.css';
import { createDatesArray, getDaysOfMonth } from '@/utils/form';
import { banDate } from '@/app/_service/admin';
import { useAlert } from '@/app/_contexts/AlertContext';

export default function BanItem(props: { date: number, reload:boolean,setReload:Dispatch<SetStateAction<boolean>>,setCalendarReload:Dispatch<SetStateAction<boolean>> }) {
  const {addAlert} = useAlert();
  const [date, setDate] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<number>(1);
  const [endDate, setEndDate] = useState<number>(date[date.length - 1]);
  const [ban,setBan] = useState('');
  useEffect(()=>{
    if(props.reload){
      setDate(getDaysOfMonth(props.date))
      props.setReload(false);
    }
  },[props.reload,props.setReload])
  
  useEffect(()=>{
    setEndDate(date[date.length - 1])
  },[date])
  const handleOnChangeStartDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const dateValue = parseInt(event.target.value, 10);
    setStartDate(dateValue);

    if (dateValue > endDate) {
      setEndDate(dateValue);
    }
  };

  const handleOnChangeEndDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const dateValue = parseInt(event.target.value, 10);
    setEndDate(dateValue);

    if (dateValue < startDate) {
      setStartDate(dateValue);
    }
  };

  const handleOnClickSubmit = async() => {
   const res = await banDate(new Date().getFullYear(),props.date,startDate,endDate,ban);

   if(res){
    addAlert('성공적으로 금지됐습니다', true);
    props.setCalendarReload(true);
   }
  }
  return (
    <div className={styles.main}>
      <div className={styles.startEndContainer}>
        <div className={styles.startContainer}>
          <label className={styles.subTitle}>시작일</label><br />
          <select className={styles.choiceDate} value={startDate} onChange={handleOnChangeStartDate}>
            {date.map((it) => (
              <option key={it} value={it} className={styles.dateItems}>
                {it}일
              </option>
            ))}
          </select>
        </div>
        <div className={styles.middleContainer}>~</div>
        <div className={styles.startContainer}>
          <label className={styles.subTitle}>종료일</label><br />
          <select className={styles.choiceDate} value={endDate} onChange={handleOnChangeEndDate}>
            {date.map((it) => (
              <option key={it} value={it} className={styles.dateItems}>
                {it}일
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.banContainer}>
        <label className={styles.subTitle}>금지사유</label><br />
        <div className={styles.textInputContainer}>
          <textarea placeholder='금지하는 이유' 
          value={ban}
          onChange={(e)=>{setBan(e.target.value)}}
          className={styles.textInput} />
        </div>
        <div className={styles.btnContainer}>
          <button onClick={handleOnClickSubmit} className={styles.btn}>금지하기</button>
        </div>
      </div>
    </div>
  );
}
