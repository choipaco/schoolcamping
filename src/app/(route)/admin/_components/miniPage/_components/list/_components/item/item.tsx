import { formatDate } from '@/utils/time'
import styles from './item.module.css'
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
export default function Item(props:{data:Data}){
    return(
        <tr>
            <td className={styles.body}>
                {formatDate(props.data.info?.reservationDate)}
            </td>
            <td className={styles.body}>
                {props.data.info?.leaderId}{props.data.info?.leaderName}
            </td>
            <td className={styles.body}>
                <select className={styles.selectStu}>
                    <option className={styles.option}>신청자 {Number(props.data.info?.reservationStudents.length) + 1}명</option>
                    {
                        props.data.info?.reservationStudents.map((it)=>{
                            return(
                                <option key={it.id} className={styles.option}>{it.studentId}{it.studentName}</option>
                            )
                        })
                    }
                </select>
            </td>
            <td className={styles.body}>
                    {props.data.info?.teacherName}
            </td>
        </tr>
    )
}