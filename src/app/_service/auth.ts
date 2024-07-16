import { setCookie } from "@/utils/cookies";
import axios from "axios";

export default async function loginApi(password:string) {
    
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_LINK}/api/auth/login/admin`, {
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(res.status === 429){
            return '429';
        }

        return res.data; 
    } catch (error:any) {   
        return false;
    }
}

