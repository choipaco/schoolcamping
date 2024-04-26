import styles from './banItem.module.css'

export default function BanItem(){
    return(
        <div className={styles.main}>
            <div className={styles.startEndContainer}>
                <div className={styles.startContainer}>
                    <label className={styles.subTitle}>시작일</label><br/>
                    <select className={styles.choiceDate}>

                    </select>
                </div>
                <div className={styles.midleContainer}>
                    ~
                </div>
                <div className={styles.startContainer}>
                    <label className={styles.subTitle}>종료일</label><br/>
                    <select className={styles.choiceDate}>

                    </select>
                </div>
            </div>
            <div className={styles.banContainer}>
            <label className={styles.subTitle}>금지사유</label><br/>
            <div className={styles.textInputContainer}>
            <textarea
            placeholder='금지하는 이유'
            className={styles.textInput}
            />
            </div>
            <div className={styles.btnContainer}>
                <button className={styles.btn}>
                    금지하기
                </button>
            </div>
            </div>
        </div>
    )
}