import { Dispatch, SetStateAction } from 'react';
import styles from './head.module.css';

type navbar = 'list' | 'black' | 'forbid';
export default function Head(props:{nav:navbar, setBlackList:Dispatch<SetStateAction<boolean>>}){
    return(
        <div className={styles.main}>
            <div className={styles.headContainer}>
                <div className={styles.title}>
                    {
                        props.nav === "list" ?
                        "신청리스트"
                        :
                        props.nav === "black"?
                        "블랙리스트"
                        :
                        ""
                    }
                </div>
                {
                    props.nav === "black"?
                    <div className={styles.btnContainer} 
                    onClick={()=>{props.setBlackList(true)}}>
                    리스트 추가  +
                    </div>
                    :
                    <div>
                    </div>
                }
            </div>
        </div>
    )
}