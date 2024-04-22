"use client"
import { useState } from "react";
import styles from "./sidebar.module.css";
import Image from "next/image";
  
export default function Sidebar(){
   const [tool, setTool] = useState(['가위','전자렌지','수저','가위','가위','가위','가위','가위'])
    return(
        <div className={styles.main}>
            <div className={styles.sidebarContainer}>
                <div className={styles.inforContainer}>
                    <label className={styles.title}>
                        <Image
                        src="/assets/img/rules.png"
                        alt=""
                        width={28}
                        height={28}
                        />
                        예약안내
                    </label>
                    <div className={styles.itemContainer}>
                        <div className={styles.item}>
                            <label className={styles.subTitle}>예약가능</label>
                            <label className={`bluePoint ${styles.content} `}>{`2024.5.18`}까지</label>
                        </div>
                        <div className={styles.item}>
                            <label className={styles.subTitle}>예약주기</label>
                            <label className={`${styles.greyPoint} ${styles.content} `}>매달에 1번 (30일 단위)</label>
                        </div>
                        <div className={styles.item}>
                            <label className={styles.subTitle}>최대인원</label>
                            <label className={`${styles.greyPoint} ${styles.content} `}>선생님 포함 최대 10명</label>
                        </div>
                        <div className={styles.item}>
                            <label className={styles.subTitle}>이용시간</label>
                            <label className={`${styles.greyPoint} ${styles.content} `}>저녁부터 야자까지 (6:30 ~ 8:30) </label>
                        </div>
                    </div>
                </div>

                <div className={styles.toolContainer}>
                    <label className={styles.title}>
                        <Image
                        src="/assets/img/hama.png"
                        alt=""
                        width={32}
                        height={32}
                        />
                        시설/장비
                    </label>
                    <div className={styles.itemContainer}>
                        {
                            tool.map((it,idx)=>{
                                return(
                                    <label className={styles.toolItem} key={idx}>
                                        {it}
                                    </label>
                                )
                            })
                        }
                    </div>
                </div>

                <div className={styles.ruleContainer}>
                    <label className={styles.title}>
                        <Image
                        src="/assets/img/gongzi.png"
                        alt=""
                        width={28}
                        height={28}
                        />
                        스쿨캠핑 규칙
                    </label>
                    <div className={styles.ruleItemContainer}>
                        
                            <p>1. 스쿨캠핑 재료는 스쿨캠핑 당일 점심시간 최대 3명까지 외출하여 구매할 수 있습니다.</p>
                            <p>2. 사용 전, 꼭 담당 학생회 임원에게 설명을 듣고 스쿨캠핑을 진행하여야 합니다. </p>
                            <p>3. 학생회실에 있는 장비들이나, 수저 등 도구들을 자유롭게 사용 가능하지만, 꼭 사용 후 제자리에 놓아야합니다. </p>
                            <p>4. 스쿨캠핑은 정리시간을 포함하여, 저녁시간부터 야간자율학습 시간 동안에만 가능합니다 ( 18:30 ~ 20:30 ) </p>
                            <p>5. 스쿨캠핑장 이용 후, 청소를 깔끔하게 해 놓아야 합니다</p>
                            <p>6. 5번사항이 지켜지지 않은 스쿨캠핑 이용 학생들에게는 벌점이 부과되고, 일정 기간동안 스쿨캠핑 이용이 불가합니다. </p>
                            <p>7. 스쿨캠핑 이후 남은 식재료들은 학생회실에 둘 수 없으므로 신중하게 재료를 구매 해 주세요. </p>
                            <p>8. 스쿨캠핑 진행 도중, 위급사항이나, 질문이 있다면 학생부장 서승범 선생님 혹은, 당일 스쿨캠핑 관리 담당 학생회 임원에게 연락해주세요 </p>
                            <p>9. 스쿨캠핑 이용 후, 나온 쓰레기들은 스쿨캠핑을 진행한 학생들이 처리 해야하며, 쓰레기 처리가 제대로 되어있지 않으면 벌점이 부과될 수 있습니다.</p>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}