import { getDayOfWeek } from '@/utils/time';
import styles from './deleteModal.module.css'
import { deleteCalendar } from '@/app/_service/admin';
import { useAlert } from '@/app/_contexts/AlertContext';
import { Dispatch, SetStateAction } from 'react';
interface date {
    year: number;
    month: number;
}
type miniChoice = 'update' | 'delete' | 'none';
export default function DeleteModal(props:{date:date, data:any, miniChoice:miniChoice, setMiniChoice:Dispatch<SetStateAction<miniChoice>>, setReload:Dispatch<SetStateAction<boolean>>}){
    const {addAlert} = useAlert();
    const handleOnClickBackground = () => {
        props.setMiniChoice('none');

    }

    const handleOnClickSubmit = async () => {
        const res = await deleteCalendar(props.data.info.id);

        if(res){
            props.setReload(true);
            props.setMiniChoice('none');
            return addAlert('성공적으로 삭제 되었습니다', true);
        }
        addAlert('삭제에 실패하였습니다', false);
    }
    return(
        <div className={styles.main}>
            <div className={styles.background} onClick={handleOnClickBackground}/>
                <div className={styles.modalContainer}>
                    <div className={styles.modalMargin}>
                        <div className={styles.title}>
                            {props.date.month}.{props.data.date}({getDayOfWeek(props.date.year,props.date.month,props.data.date)})
                        </div>
                        <div className={styles.subTitle}>
                        등록을 취소하시겠습니까?
                        </div>

                        <div className={styles.btn}>
                            <button className={styles.nope} onClick={handleOnClickBackground}>
                                아니오
                            </button>
                            <button className={styles.yes} onClick={handleOnClickSubmit}>
                                예
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    )
}