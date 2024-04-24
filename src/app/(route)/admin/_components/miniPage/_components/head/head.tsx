import styles from './head.module.css';

type navbar = 'list' | 'black' | 'forbid';
export default function Head(props:{nav:navbar}){
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
                    <div className={styles.btnContainer}>
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