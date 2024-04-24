import { formatDateAdmin } from '@/utils/time';
import styles from './littleModal.module.css'
import { useRef, useEffect, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
export default function Little(props: {modal:boolean, setModal:Dispatch<SetStateAction<boolean>>, day:string | undefined, month:number, year:number}){
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (divRef.current && !divRef.current.contains(event.target as Node)) {
            props.setModal(false);
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [divRef]);

      useEffect(()=>{
        console.log(props.day, props.month)
      },[props.day])
    return(
        <div className={styles.main}
        style={props.modal ? {display: "block"} : {display: "none"}}
        ref={divRef}
        >
          <div className={styles.container}>
            {formatDateAdmin(props.year,props.month,props.day)}
            <div className={styles.iconConatiner}>
              <div className={styles.insertContainer}>
                <Image
                src="/assets/img/insert.svg"
                alt="수정"
                width={16}
                height={16}
                />
                <label className={styles.insert}>
                  수정하기
                </label>
              </div>
              <div className={styles.insertContainer}>
                <Image
                src="/assets/img/delete.svg"
                alt="등록취소"
                width={16}
                height={16}
                />
                <label className={styles.insert}>
                  등록취소
                </label>
              </div>
            </div>
          </div>
        </div>
    )
}