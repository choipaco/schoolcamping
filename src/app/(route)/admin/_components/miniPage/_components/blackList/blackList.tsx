import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Item from './_components/item/item';
import styles from './blackList.module.css';
import getCalendarListAdmin, { getBlackList } from '@/app/_service/admin';
interface black{
    studentName:string,
    studentId:string,
    reason: string
}


export default function BlackList(props:{reload:{
    value: boolean;
}, setReload:Dispatch<SetStateAction<{
    value: boolean;
}>>}){

    const [data,setData] = useState<black[]>();
    const handleGetList = async() =>{
        setData(await getBlackList());
    }
    useEffect(()=>{
        if(props.reload.value){
            handleGetList();
            props.setReload({value: false});
        }
    },[props.reload,props.setReload])

    return(
        <div className={styles.main}>
            {
                !data ?
                "loding..."
                :
            <table className={styles.tables}>
                <thead>
                    <tr>
                        <th className={styles.head}>학번이름</th>
                        <th className={styles.Longhead}>금지사유</th>
                        <th className={styles.head}>해제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((it,idx)=>{
                            return(
                                <Item key={idx} data={it} setReload={props.setReload}/>
                            )
                        })
                    }
                </tbody>
            </table>

            }
        </div>
    )
}