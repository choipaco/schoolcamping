'use client'
import styles from "./page.module.css";
import { useState } from "react";
import LoginInput from "./_components/loginInputs/loginInput";
import LoginButton from "./_components/loginButton/loginButton";
import EasyLogin from "./_components/easyLogin/easyLogin";
import Link from "next/link";
import loginApi from "@/app/_service/auth";
export default function Home() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const onSubmit = async () => {

    await loginApi(id,pw,autoLogin);
};
  return (
    <main>
        <div className={styles.loginContainer}>

          <h1 className={styles.loginTitle}>
            <label className={styles.loginTitleColor1}>Min</label>
            <label className={styles.loginTitleColor2}>clod</label>
          </h1>

          <div className={styles.loginDep}>
          Lorem ipsum dolor sit amet consectetur. Pharetra.
          </div>

          <div className={styles.loginFormContainer}>
            <LoginInput setId={setId} setPw={setPw} setAutoLogin={setAutoLogin}/>
            <LoginButton onSubmit={onSubmit}/>
            <EasyLogin/>
            <div className={styles.findIDContainer}>
            <Link 
            href={"#"}
            className={styles.findID}
            >아이디 / 비밀번호 찾기</Link>
            </div>
          </div>
        </div>
    </main>
  );
}
