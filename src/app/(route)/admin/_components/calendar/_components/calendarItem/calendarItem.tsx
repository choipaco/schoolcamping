import { Dispatch, SetStateAction, useState } from 'react';
import styles from './calendarItem.module.css'
import { useAlert } from '@/app/_contexts/AlertContext';
import Little from '../littleModal/littleModal';

interface Day{
    date?: string
    status?: string
    info?: info | null
}
type miniChoice = 'update' | 'delete' | 'none';

interface info{
    id: number,
    leaderName: string,
    leaderId: string,
    teacherName: string,
    reservationDate: string,
    reservationStudents:reservationStudents[]
}

interface reservationStudents{
    id: number,
    studentName: string,
    studentId: string
}

export default function CalendarItem(props:{day:Day,month:number, year:number, setData:Dispatch<SetStateAction<any>>, setMiniChoice:Dispatch<SetStateAction<miniChoice>>}){
    const { addAlert } = useAlert();
    const [modal,setModal] = useState(false);
    const handleOnClick = () => {
        setModal(true)
        props.setData(props.day);
    }
    
    return(
        <div className={styles.main} onClick={handleOnClick}>
            {props.day.date}
            <div className={styles.container}>
                <div className={`${styles.state} 
                ${
                    props.day.status?
                    props.day.status === "예약 완료" ?
                    styles.complite
                    :
                    props.day.status === "예약 불가능"?
                    styles.imposible
                    :
                    ""
                    :
                    ""
                }`}>
                    {
                    props.day.status?
                    props.day.status === "예약 완료" ?
                    "완"
                    :
                    props.day.status === "예약 불가능"?
                    "불"                    
                    :
                    ""
                    :
                    ""
                    }
                </div>

                <div className={styles.font}>
                {
                    props.day.status?
                    props.day.status === "예약 완료" ?
                    "예약완료"
                    :
                    props.day.status === "예약 불가능"?
                    "예약 불가능"
                    :
                    ""
                    :
                    ""
                    }
                </div> 
            </div>
            {
                props.day.status === "예약 완료" ?
                <Little modal={modal} setModal={setModal} day={props.day.date} month={props.month} year={props.year} setMiniChoice={props.setMiniChoice}/>
                :
                ""
            }
        </div>
    )
}