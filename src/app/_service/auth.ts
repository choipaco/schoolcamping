import { setCookie } from "@/utils/cookies";
import axios from "axios";

export default async function loginApi(password:string) {
    
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_DB_LINK}/api/auth/login/admin`, {
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


export async function registerApi(email:string, id:string, password:string,repassword:string, name:string, birthdate:string,tokenChk:boolean,idExists:boolean) {

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
        if(res.status === 201){
            return true;
        }
    } catch (error:any) {
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
        return true;
    }
}
