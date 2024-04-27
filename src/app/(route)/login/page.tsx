'use client'
import styles from "./page.module.css";
import { useState } from "react";
import Link from "next/link";
import loginApi from "@/app/_service/auth";
import { useAlert } from "@/app/_contexts/AlertContext";
import { useRouter } from "next/navigation";
import { setCookie } from "@/utils/cookies";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import viewport from "@/utils/viewport";

export default function Home() {
  const router = useRouter();
  const [pw, setPw] = useState('');
  const {addAlert} = useAlert();
  const onSubmit = async () => {
    const status = await loginApi(pw);

    if(status){
      addAlert('로그인 완료', true);  
      setCookie('login',status,{path: '/'})
      router.push('/admin');
    }else{
      addAlert('로그인 실패', false);
    }
  };
  return (
    <>
    {
      viewport() ?
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.margin}>
              <div className={styles.title}>
              관리자 로그인
              </div>
              <div className={styles.passwordContainer}>
                <input className={styles.input} type="password" value={pw} onChange={(e)=>{setPw(e.target.value)}}/>
                <button className={styles.btn} onClick={onSubmit}>{`->`}</button>
              </div>
            </div>
          </div>
        </main>
        :
        <></>
    }
    </>
    
  );
}
