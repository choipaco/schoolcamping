import { formatDate } from '@/utils/time'
import styles from './item.module.css'
import Image from 'next/image'
interface black{
    studentName:string,
    studentId:string,
    reason: string
}
export default function Item(props:{data:black}){
    return(
        <tr>
            <td className={styles.body}>
                {props.data.studentId}
                {props.data.studentName}
            </td>
            <td className={styles.body}>
                {props.data.reason}
            </td>
            <td className={styles.body}>
                <Image
                src="/assets/img/release.svg"
                alt=""
                width={28}
                height={28}
                />
            </td>
        </tr>
    )
}