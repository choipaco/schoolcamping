import { Dispatch, SetStateAction } from 'react'
import styles from './choiceDate.module.css'
interface date{
    year: number
    month: number
}
type navbar = 'list' | 'black';
export default function ChoiceDate(props:{date:date, setDate:Dispatch<SetStateAction<date>>, nav:navbar, setNav:Dispatch<SetStateAction<navbar>>, setBanDate:Dispatch<SetStateAction<boolean>>}){

    const handleOnClickPrevDate = () => {
        let year = props.date.year;
        let month = props.date.month - 1;

        if(month === 0){
            month = 12;
            --year;
        }
        props.setDate({
            year,
            month
        })
    }

    const handleOnClickNextDate = () => {
        let year = props.date.year;
        let month = props.date.month + 1;

        if(month === 13){
            month = 1;
            ++year;
        }
        props.setDate({
            year,
            month
        })
    }
    return(
        <div className={styles.main}>
            <div className={styles.main}>
                <div>
                    {props.date.year}.{props.date.month < 10 ? "0"+props.date.month : props.date.month}
                </div>
                <div className={styles.prevnextContainer}>
                    <div className={styles.prevnext} onClick={handleOnClickPrevDate}>{"<"}</div>
                    <div className={styles.prevnext} onClick={handleOnClickNextDate}>{">"}</div>
                </div>
            </div>

            <div className={styles.navbarContainer}>
                <div className={styles.navbar} onClick={()=>{props.setNav('list')}}>신청리스트</div>
                <div className={styles.navbar} onClick={()=>{props.setNav('black')}}>블랙리스트</div>
                <div className={styles.navbar} onClick={()=>{props.setBanDate(true)}}>신청 금지/해제</div>
                <div className={styles.navbar}>엑셀 추출</div>
            </div>

        </div>
    )
}