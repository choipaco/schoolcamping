import axios from "axios";

export default async function emailVerificationApi(email:string) {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_DB_LINK}/api/email/send-verification`, {
            email   
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res);
        alert("인증번호를 전송하였습니다");
        return true; 
    } catch (error:any) {
        alert(error.response.data.message);
    }
}


export async function tokenVerificationApi(email:string,token:string) {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DB_LINK}/api/email/verify-email?email=${email}&verifyToken=${token}`, 
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res);
        alert("인증되었습니다"); 
        return true;
    } catch (error:any) {
        alert(error.response.data.message);
    }
}