import { Dispatch, SetStateAction } from 'react'
import styles from './choiceDate.module.css'
import { getExecl } from '@/app/_service/admin';
import { useAlert } from '@/app/_contexts/AlertContext';
interface date{
    year: number
    month: number
}
type navbar = 'list' | 'black';
export default function ChoiceDate(props:{date:date, setDate:Dispatch<SetStateAction<date>>, nav:navbar, setNav:Dispatch<SetStateAction<navbar>>, setBanDate:Dispatch<SetStateAction<boolean>>}){
    const {addAlert} = useAlert();
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

    const handleOnClickGetExcel = async () => {
        try {
            const blob = await getExecl(props.date.year, props.date.month); // 엑셀 파일 받기
            const downloadUrl = window.URL.createObjectURL(blob); // blob에서 다운로드 URL 생성
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', `${props.date.year}년 ${props.date.month}월 스쿨캠핑 리스트.xlsx`); // 다운로드될 파일명 설정
            document.body.appendChild(link);
            link.click();
            link.remove();  // 사용한 링크 요소 제거
            window.URL.revokeObjectURL(downloadUrl); // 생성된 URL 해제
            addAlert('엑셀다운로드 성공',true);
        } catch (error) {
            addAlert('엑셀다운로드 실패',false);
        }
    };
    
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
                <div className={styles.navbar} onClick={handleOnClickGetExcel}>엑셀 추출</div>
            </div>

        </div>
    )
}