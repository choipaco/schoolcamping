import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './banItem.module.css';
import { getDaysOfMonth } from '@/utils/form'; // 가정: createDatesArray 함수는 사용되지 않으므로 제거
import { banDate } from '@/app/_service/admin';
import { useAlert } from '@/app/_contexts/AlertContext';

// props를 구조 분해 할당으로 받습니다.
export default function BanItem({ date, reload, setReload, setCalendarReload }: { date: number, reload: boolean, setReload: Dispatch<SetStateAction<{
  value: boolean;
}>>, setCalendarReload: Dispatch<SetStateAction<boolean>> }) {
  const { addAlert } = useAlert();
  const [dates, setDates] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<number>(1);
  const [endDate, setEndDate] = useState<number>(dates[dates.length - 1] || 1); // 초기값 설정에 dates 사용
  const [ban, setBan] = useState('');

  useEffect(() => {
    if (reload) {
      setDates(getDaysOfMonth(date));
      setReload({value: false});
      console.log("리로드 완료");
    }
  }, [reload, date, setReload]);

  useEffect(() => {
    setEndDate(dates[dates.length - 1] || 1);
  }, [dates]);

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

  const handleOnClickSubmit = async () => {
    const res = await banDate(new Date().getFullYear(), date, startDate, endDate, ban);

    if (res) {
      addAlert('성공적으로 금지됐습니다', true);
      setCalendarReload(true);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.startEndContainer}>
        <div className={styles.startContainer}>
          <label className={styles.subTitle}>시작일</label><br />
          <select className={styles.choiceDate} value={startDate} onChange={handleOnChangeStartDate}>
            {dates.map((it) => (
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
            {dates.map((it) => (
              <option key={it} value={it} className={styles.dateItems}>
                {it}일
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.banContainer}>
        <label className={styles.subTitle}>금지사유</label><br />
        <textarea 
          placeholder='금지하는 이유' 
          value={ban}
          onChange={(e) => setBan(e.target.value)}
          className={styles.textInput} 
          maxLength={100}
        />
        <div className={styles.btnContainer}>
          <button onClick={handleOnClickSubmit} className={styles.btn}>금지하기</button>
        </div>
      </div>
    </div>
  );
}
