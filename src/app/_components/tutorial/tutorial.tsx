import Image from 'next/image';
import styles from './tutorial.module.css';
import { Dispatch, SetStateAction } from 'react';

export default function Tutorial(props:{modal:boolean, setModal:Dispatch<SetStateAction<boolean>>}){
    
   const background = () =>{
    props.setModal(false);
   }
    return(
        <div className={styles.main} style={
            props.modal ?
            {display: 'flex'} :
            {display: 'none'}
        }>
            <div className={styles.background} onClick={background}/>
            <div className={styles.modalContainer}>
                <div className={styles.imgContainer}>
                    <div className={styles.yesImg}/>
                    <div className={styles.successImg}/>
                    <div className={styles.nopeImg}/>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.content}>
                        예약가능한 날짜는 
                        <span className={`${styles.state} ${styles.incomplete}`}>
                            가
                        </span>  
                        예약가능 이라고 표시되며, 클릭하여 신청이 가능합니다.
                    </div>
                    <div className={styles.content}>
                        이미 예약이 된 날짜는 
                        <span className={`${styles.state} ${styles.complite}`}>
                            완
                        </span>  
                        예약완료 라고 표시되며, 비밀번호 확인 후 수정이 가능합니다.
                    </div>
                    <div className={styles.content}>
                        공휴일, 주말 등 예약이 불가능한 날은 
                        <span className={`${styles.state} ${styles.imposible}`}>
                            불
                        </span> 
                        예약불가능 이라고 표시됩니다.
                    </div>
                </div>
            </div>
        </div>
    )
}