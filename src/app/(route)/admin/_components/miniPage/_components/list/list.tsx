import { useEffect, useState } from 'react';
import Item from './_components/item/item';
import styles from './list.module.css';
import getCalendarListAdmin from '@/app/_service/admin';
interface date{
    year: number
    month: number
}

interface Data{
    date:string,
    status:string,
    info: info | null
}
interface info{
    id:number,
    leaderId:string,
    leaderName:string,
    reservationDate:string,
    reservationStudents: student[],
    teacherName: string
}
interface student{
    id:number,
    studentId:string,
    studentName:string
}
export default function List(props:{date: date}){

    const [data,setData] = useState<Data[]>();
    const handleGetList = async() =>{
        setData(await getCalendarListAdmin(props.date.year,props.date.month));
    }
    useEffect(()=>{
        if(props.date){
            handleGetList();
        }
    },[props.date.month])

    useEffect(()=>{
        console.log(data)
    },[data])
    return(
        <div className={styles.main}>
            {
                !data ?
                "loding..."
                :
            <table className={styles.tables}>
                <thead>
                    <tr>
                        <th className={styles.head}>날짜</th>
                        <th className={styles.head}>대표자</th>
                        <th className={styles.head}>신청자 목록</th>
                        <th className={styles.head}>담당선생님</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((it,idx)=>{
                            if(it.status !== "예약 완료") return;
                            return(
                                <Item key={idx} data={it}/>
                            )
                        })
                    }
                </tbody>
            </table>

            }
        </div>
    )
}