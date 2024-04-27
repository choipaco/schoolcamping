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
export default function MiniPage(props:{nav:navbar, setNav:Dispatch<SetStateAction<navbar>>, date:date,reload:boolean, setReload:Dispatch<SetStateAction<boolean>>, setBlackList:Dispatch<SetStateAction<boolean>>, blackreload:{
    value: boolean;
}, setBlackreload:Dispatch<SetStateAction<{
    value: boolean;
}>>}){
    
    return(
        <div className={styles.main}>
            <div className={styles.container}>
                <Head nav={props.nav} setBlackList={props.setBlackList}/>
                {
                    props.nav === "list" ?
                    <List date={props.date} reload={props.reload} setReload={props.setReload}/>
                    :
                    <BlackList reload={props.blackreload} setReload={props.setBlackreload}/>
                }
            </div>
        </div>
    )
}