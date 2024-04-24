import { Dispatch, SetStateAction } from 'react';
import Head from './_components/head/head'
import List from './_components/list/list'
import styles from './miniPage.module.css'
import BlackList from './_components/blackList/blackList';
interface date{
    year: number
    month: number
}
type navbar = 'list' | 'black';
export default function MiniPage(props:{nav:navbar, setNav:Dispatch<SetStateAction<navbar>>, date:date}){
    
    return(
        <div className={styles.main}>
            <div className={styles.container}>
                <Head nav={props.nav}/>
                {
                    props.nav === "list" ?
                    <List date={props.date}/>
                    :
                    <BlackList/>
                }
            </div>
        </div>
    )
}