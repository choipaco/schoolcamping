import Image from "next/image";
import styles from "./easyLogin.module.css";
export default function EasyLogin() {
 
  return (
    <div className={styles.EasyLoginContainer}>
      <div>
      간편로그인
      </div>
      <div className={styles.iconSort}>
      <Image 
      src="/assets/img/ri_kakao-talk-fill.svg"
      alt="카카오톡"
      width={28}
      height={28}
      />
      <Image 
      src="/assets/img/simple-icons_naver.svg"
      alt="네이버"
      width={25}
      height={25}
      />
      <Image 
      src="/assets/img/bi_google.svg"
      alt="구글"
      width={25}
      height={25}
      />
      </div>
    </div>
  );
}
