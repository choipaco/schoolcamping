// components/Alert.tsx
import Image from "next/image";
import styles from "./alert.module.css";

export default function Alert({ id, message,isagree }: { id: number; message: string, isagree:boolean }) {
  return (
    <div className={styles.main}>
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
