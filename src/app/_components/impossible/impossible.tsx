import Image from 'next/image';
import styles from './impossible.module.css';

export default function Impossible(props:{modal:boolean, date?:Date}){
    
    return(
        <div className={styles.main}
        style={{display: `${props.modal && Number(process.env.NEXT_PUBLIC_LIMIT) ? 'flex' : 'none'}`}}
        >
            <div className={styles.background}/>
            <div className={styles.modalContainer}>
               <div className={styles.banImg}>
                    <Image
                    src="/assets/img/banIcon.svg"
                    alt=""
                    width={152}
                    height={152}
                    />
               </div>
               <div className={styles.textContainer}>
                <div className={styles.mainText}>
                    지금은 신청할 수 없어요!
                </div>
                <div className={styles.subText}>
                    지금은 예약할 수 없어요. {Number(props.date?.getMonth()) + 1}월 {props.date?.getDate()}일에 만나요!
                </div>
               </div>
            </div>
        </div>
    )
}