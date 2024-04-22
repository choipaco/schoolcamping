// components/Alert.tsx
import Image from "next/image";
import styles from "./alert.module.css";
import { useAlert } from "@/app/_contexts/AlertContext"; // 경로 확인 필요

export default function Alert({ id, message,isagree }: { id: number; message: string, isagree:boolean }) {
  const { removeAlert } = useAlert();

  return (
    <div className={styles.main} onClick={() => removeAlert(id)}>
      <div className={styles.container}>
        <div className={styles.left}
        style={message.length > 10 ? {fontSize: "12px"} : {}}
        >
            {message}
        </div>
        <div className={styles.right}>
            {
                isagree ?
                <Image
                  src="/assets/img/agree.svg"
                  alt=""
                  width={28}
                  height={28}
                />
                :
                <Image
                  src="/assets/img/cancle.svg"
                  alt=""
                  width={28}
                  height={28}
                />
            }
        </div>
      </div>
    </div>
  );
}
