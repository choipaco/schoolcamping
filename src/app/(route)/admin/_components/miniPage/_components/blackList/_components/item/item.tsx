import { formatDate } from '@/utils/time'
import styles from './item.module.css'
import Image from 'next/image'
import { deleteBlackList } from '@/app/_service/admin'
import { Dispatch, SetStateAction } from 'react'
import { useAlert } from '@/app/_contexts/AlertContext'
interface black{
    studentName:string,
    studentId:string,
    reason: string
}
export default function Item(props:{data:black, setReload:Dispatch<SetStateAction<boolean>>}){
    const {addAlert} = useAlert();
    const handleOnClickDeleteBlackList = async() => {
        const res = await deleteBlackList(props.data.studentId);
        if(res){
            addAlert('성공적으로 해제되었습니다', true);
            props.setReload(true);
        }else{
            addAlert('해제에 실패했습니다', false);
        }
    }
    return(
        <tr>
            <td className={styles.body}>
                {props.data.studentId}
                {props.data.studentName}
            </td>
            <td className={styles.body}>
                {props.data.reason}
            </td>
            <td className={`${styles.body} ${styles.cu}`} onClick={handleOnClickDeleteBlackList}>
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