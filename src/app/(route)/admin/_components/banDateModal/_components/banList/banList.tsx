import { banDateDelete, banDateList } from '@/app/_service/admin'
import styles from './banList.module.css'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getDatesInRange, formatDateRange } from '@/utils/time';
import { useAlert } from '@/app/_contexts/AlertContext';
import Image from 'next/image';

export default function BanList(props:{date:any, reloadList:boolean, setReloadList:Dispatch<SetStateAction<boolean>>}){
    const {addAlert} = useAlert();
    const [list,setList] = useState([]);

    const getList = async() => {
        const res = await banDateList(new Date().getFullYear(), props.date);
        setList(res);
    }

    useEffect(()=>{
        if(props.reloadList){
            getList();
            props.setReloadList(false);
        }
    },[props.reloadList,props.setReloadList])

    const handleOnClickDeleteDate = async(startDate:string,endDate:string) => {
        const res = await banDateDelete(startDate,endDate);

        if(res){
            addAlert('성공적으로 해제했습니다',true);
            props.setReloadList(true);
        }
    }
    return(
        <div className={styles.main}>
            <table className={styles.tables}>
                <thead>
                    <tr>
                        <td className={styles.head}>날짜</td>
                        <td className={styles.Longhead}>금지사유</td>
                        <td className={`${styles.head} ${styles.cancle}`}>해제</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((it:any)=>{
                            return(
                                <tr>
                                    <td className={styles.body}>{formatDateRange(it.startDate,it.endDate)}</td>
                                    <td className={styles.body}>{it.reason}</td>
                                    <td className={`${styles.body} ${styles.cancle}`} onClick={()=>{handleOnClickDeleteDate(it.startDate,it.endDate)}}>
                                    <Image
                                    src="/assets/img/delete.svg"
                                    alt="캔슬"
                                    width={16}
                                    height={16}
                                    />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}