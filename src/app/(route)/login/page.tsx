'use client'
import styles from "./page.module.css";
import { FormEvent, useState } from "react";
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

export default function Home() {
  const router = useRouter();
  const [pw, setPw] = useState('');
  const {addAlert} = useAlert();
  const onSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!pw) return addAlert('비밀번호를 입력해주세요',false);
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
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.margin}>
              <div className={styles.title}>
              관리자 로그인
              </div>
              <form className={styles.passwordContainer} onSubmit={onSubmit}>
                <input className={styles.input} type="password" value={pw} onChange={(e)=>{setPw(e.target.value)}}/>
                <button className={styles.btn}>{`->`}</button>
              </form>
            </div>
          </div>
        </main>
  );
}
