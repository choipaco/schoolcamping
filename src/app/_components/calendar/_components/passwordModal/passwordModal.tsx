import { Dispatch, SetStateAction, createRef, useEffect, useState } from 'react';
import styles from './passwordModal.module.css';
import PasswordInput from './_components/PasswordInput';
import { calendarLogin } from '@/app/_service/calendar';

type pass = "create" | 'auth';
export default function PasswordModal(props: { modal: boolean, setModal: Dispatch<SetStateAction<boolean>>, setPassword:Dispatch<SetStateAction<string>>,data:any, setData:Dispatch<SetStateAction<any>>, mode:pass, setUpdateModal:Dispatch<SetStateAction<boolean>>,setUpdateData:Dispatch<SetStateAction<any>>}) {
    const [inputValues, setInputValues] = useState(["", "", "", ""]); // 입력 값 배열 상태 생성
    const [password, setPassword] = useState("");
    const inputRefs = Array(4).fill(0).map(() => createRef<HTMLInputElement>());
    const [passwordWrong, setPasswordWrong] = useState(false);
    const [title, setTitle] = useState('비밀번호 입력');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValues = [...inputValues];
        newValues[index] = event.target.value;
        setInputValues(newValues);
      };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === 'Backspace' && !inputValues[index]) {
            if (index > 0) {
                inputRefs[index - 1].current?.focus();
            }
        } else {
            if (index < inputRefs.length - 1) {
                if(inputValues[index - 1] === "") return;

                if(inputValues[0] === "") return;
                inputRefs[index + 1].current?.focus();
            }
        }
    };

    const handleOnClickBackground = () => {
        setInputValues(["", "", "", ""])
        setPassword("")
        setPasswordWrong(false)
        props.setModal(false);
        props.setData("");
        setTitle("비밀번호 입력")
      }
      const handleOnChangePasswordChk = async() =>{
        const res = await calendarLogin(inputValues[0]+inputValues[1]+inputValues[2]+inputValues[3],props.data.id);
        
        if(res){
          props.setUpdateData({...res, password: inputValues[0]+inputValues[1]+inputValues[2]+inputValues[3]});
          props.setUpdateModal(true);
          setInputValues(["", "", "", ""])
          props.setData('');
          setPassword("")
          setPasswordWrong(false)
          props.setModal(false);
          setTitle("비밀번호 입력")
        }else{
          setPasswordWrong(true);
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
                    setPasswordWrong(false)
                    setTitle("비밀번호 입력")
                    props.setModal(false);
                }else{
                    setPasswordWrong(true);
                }
            }else{
              if(props.mode === "create"){
                setPassword(inputValues[0]+inputValues[1]+inputValues[2]+inputValues[3]);
                setInputValues(["", "", "", ""])
                inputRefs[0].current?.focus();
                setTitle("비밀번호 재입력")
              }else{
                handleOnChangePasswordChk()
              }
            }
        }else{
          setPasswordWrong(false);
        }
    },[inputValues])

    useEffect(()=>{
      if(props.modal){
        inputRefs[0].current?.focus();
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
            {inputRefs.map((ref, index) => (
              <PasswordInput
                key={index}
                ref={ref}
                onKeyUp={(event) => handleKeyUp(event, index)}
                onChange={(event) => handleChange(event, index)}
                value={inputValues[index]}
                index={index}
              />
            ))}
          </div>
          <div className={styles.wrong}
          style={passwordWrong ? {display: 'block'} : {display: 'none'}}
          >
            일치하지 않습니다
          </div>
        </div>
      </div>
    </div>
    )
}
