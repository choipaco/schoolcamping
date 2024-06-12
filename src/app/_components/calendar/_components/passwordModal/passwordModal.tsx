import React, { ChangeEvent, Dispatch, KeyboardEvent, RefObject, SetStateAction, createRef, useEffect, useState } from 'react';
import styles from './passwordModal.module.css';
import { calendarLogin } from '@/app/_service/calendar';
import { useAlert } from '@/app/_contexts/AlertContext';

type pass = "create" | 'auth';
export default function PasswordModal(props: { modal: boolean, setModal: Dispatch<SetStateAction<boolean>>, setPassword:Dispatch<SetStateAction<string>>,data:any, setData:Dispatch<SetStateAction<any>>, mode:pass, setUpdateModal:Dispatch<SetStateAction<boolean>>,setUpdateData:Dispatch<SetStateAction<any>>}) {
    const [inputValues, setInputValues] = useState(Array(4).fill('')); // 입력 값 배열 상태 생성
    const [refs, setRefs] = useState<RefObject<HTMLInputElement>[]>([]);
    useEffect(() => {
      setRefs(Array(4).fill(null).map((_, i) => refs[i] || React.createRef<HTMLInputElement>()));
    }, []);
    const {addAlert} = useAlert();
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState('비밀번호 입력');
    const handleChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const nextValues = [...inputValues];
      nextValues[index] = e.target.value;
      setInputValues(nextValues);

      if (e.target.value.length === 1 && index < 3) {
        refs[index + 1].current?.focus(); 
      }
    };
    
    const handleBackspace = (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !inputValues[index] && index > 0) {
        refs[index - 1].current?.focus(); 
      }
    };

    const handleOnClickBackground = () => {
        setInputValues(["", "", "", ""])
        setPassword("")
        props.setModal(false);
        props.setData("");
        setTitle("비밀번호 입력")
      }
      const handleOnChangePasswordChk = async() =>{
        const res = await calendarLogin(inputValues[0]+inputValues[1]+inputValues[2]+inputValues[3],props.data.id);
        if(res === '429'){
          setInputValues(["", "", "", ""])
          refs[0].current?.focus(); 
          addAlert("잠시 후 시도해주세요", false);
          return;
        }
        if(res){
          props.setUpdateData({...res, password: inputValues[0]+inputValues[1]+inputValues[2]+inputValues[3]});
          props.setUpdateModal(true);
          setInputValues(["", "", "", ""])
          props.setData('');
          setPassword("")
          props.setModal(false);
          setTitle("비밀번호 입력")
        }else{
          setInputValues(["", "", "", ""])
          refs[0].current?.focus(); 
          addAlert("비밀번호가 일치하지 않습니다", false);
        }
      }

    useEffect(()=>{
        if(inputValues[0] && inputValues[1] && inputValues[2] && inputValues[3]){
            if(password){
                const passwordChk = inputValues[0]+inputValues[1]+inputValues[2]+inputValues[3]

                if(passwordChk === password){
                    props.setPassword(password);
                    setInputValues(["", "", "", ""])
                    setPassword("")
                    setTitle("비밀번호 입력")
                    props.setModal(false);
                }else{
                  setInputValues(["", "", "", ""])
                  refs[0].current?.focus(); 
                  addAlert("비밀번호가 일치하지 않습니다", false);
                }
            }else{
              if(props.mode === "create"){
                setPassword(inputValues[0]+inputValues[1]+inputValues[2]+inputValues[3]);
                setInputValues(["", "", "", ""])
                refs[0].current?.focus(); 
                setTitle("비밀번호 재입력")
              }else{
                handleOnChangePasswordChk()
              }
            }
        }else{
        }
    },[inputValues])

    useEffect(()=>{
      if(props.modal){
        refs[0].current?.focus(); 
      }
    },[props.modal])

    return (
        <div className={styles.main}
        style={props.modal ? {display: "flex"} : {display: "none"}}
        >
      <div className={styles.background} onClick={handleOnClickBackground} />
      <div className={styles.modalContainer}>
        <div className={styles.modalPasswordContainer}>
          <div className={styles.passwordTitle}>{title}</div>
          <div className={styles.passwordContainer}>
            {inputValues.map((value, index) => (
               <input
                key={index}
                ref={refs[index]}
                value={value ? "*" : value}
                onChange={handleChange(index)}
                onKeyDown={handleBackspace(index)}
                maxLength={1}
                className={styles.passwordItem}
                />
            ))}
          </div>

        </div>
      </div>
    </div>
    )
}
