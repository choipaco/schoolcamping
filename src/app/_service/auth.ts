import axios from "axios";

export default async function loginApi(id:string, password:string, keepLogin:boolean) {
    if(!id) return alert("아이디를 입력해주세요");
    if(!password) return alert("비밀번호를 입력해주세요");
    
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_DB_LINK}/api/auth/login`, {
            id,
            password,
            keepLogin
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data; 
    } catch (error:any) {
        alert(error.response.data.message);
    }
}


export async function registerApi(email:string, id:string, password:string,repassword:string, name:string, birthdate:string,tokenChk:boolean,idExists:boolean) {
    if(!name) return alert("이름을 입력해주세요");
    if(!birthdate) return alert("생년월일을 입력해주세요");
    if(!email) return alert("이메일을 입력해주세요");
    if(!tokenChk) return alert("이메일을 인증해주세요");
    if(!id) return alert("아이디를 입력해주세요");
    if(!password) return alert("비밀번호를 입력해주세요");
    if(!repassword) return alert("비밀번호 확인을 입력해주세요");
    if(password !== repassword) return alert("비밀번호가 일치하지 않습니다");
    
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_DB_LINK}/api/auth/register`, {
            email,
            id,
            password,
            name,
            birthdate
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res)
        if(res.status === 201){
            return true;
        }
        return alert("회원가입에 실패하였습니다"); 
    } catch (error:any) {
        alert(error.response.data.message);
    }
}

export async function idExistApi(id:string) {
    
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DB_LINK}/api/auth/exist?id=${id}`, 
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return false; 
    } catch (error:any) {
        alert(error.response.data.message);
        return true;
    }
}
