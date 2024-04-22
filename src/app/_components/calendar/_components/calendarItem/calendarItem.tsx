import { Dispatch, SetStateAction } from 'react';
import styles from './calendarItem.module.css'
import { useAlert } from '@/app/_contexts/AlertContext';

interface Day{
    date?: string;
    status?: string
}
export default function CalendarItem(props:{day:Day, setData:Dispatch<SetStateAction<any>>}){
    const { addAlert } = useAlert();
    const handleOnClick = () => {
        props.setData(props.day);
        if(props.day.status === "예약 불가능"){
            addAlert("예약이 불가능한 날입니다", false);
        }
    }
    return(
        <div className={styles.main} onClick={handleOnClick}>
            {props.day.date}
            <div className={styles.container}>
                <div className={`${styles.state} 
                ${
                    props.day.status?
                    props.day.status === "예약 가능" ?
                    styles.incomplete
                    : 
                    props.day.status === "예약 완료" ?
                    styles.complite
                    :
                    styles.imposible
                    :
                    ""
                }`}>
                    {
                    props.day.status?
                    props.day.status === "예약 가능" ?
                    "가"
                    :
                    props.day.status === "예약 완료" ?
                    "완"
                    :
                    "불"
                    :
                    ""
                    }
                </div>

                <div className={styles.font}>
                {
                    props.day.status?
                    props.day.status === "예약 가능" ?
                    "예약가능"
                    :
                    props.day.status === "예약 완료" ?
                    "예약완료"
                    :
                    "예약불가능"
                    :
                    ""
                    }
                </div>
            </div>
        </div>
    )
}