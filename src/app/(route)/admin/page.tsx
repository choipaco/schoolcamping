'use client'
import { useEffect, useState } from "react";
import Calendar from "./_components/calendar/calendar";
import MiniPage from "./_components/miniPage/miniPage";
import styles from "./page.module.css";
import { getYearAndMonth } from "@/utils/time";
import Modal from "./_components/modal/modal";
import BanModal from "./_components/banmodal/banModal";
import BanDateModal from "./_components/banDateModal/banDateModal";
type navbar = 'list' | 'black';
type miniChoice = 'update' | 'delete' | 'none';
export default function Home() {
  const [nav,setNav] = useState<navbar>('list');
  const [date,setDate] = useState(getYearAndMonth());
  const [miniChoice,setMiniChoice] = useState<miniChoice>('none');
  const [data, setData] = useState<any>();
  const [reload,setReload] = useState(true);
  const [blackreload,setBlackReload] = useState(true);
  const [blackList,setBlackList] = useState(false);
  const [banDate, setBanDate] = useState(false);
  useEffect(()=>{
    if(nav === 'black'){
      setBlackReload(true);
    }
  },[nav])
  return (
    <main>
      <Calendar reload={reload} setReload={setReload} nav={nav} setNav={setNav} date={date} setDate={setDate} miniChoice={miniChoice} setMiniChoice={setMiniChoice} setData={setData} setBanDate={setBanDate}/>
      <MiniPage nav={nav} setNav={setNav} date={date} reload={reload} setReload={setReload} setBlackList={setBlackList} blackreload={blackreload} setBlackreload={setBlackReload}/>
      <BanDateModal modal={banDate} setModal={setBanDate} data={date} setReload={setReload}/>
      {
        nav === 'black' ?
        <BanModal modal={blackList} setModal={setBlackList} setReload={setBlackReload}/>
        :
        <></>
      }
      {
        miniChoice === 'none' ?
        ""
        :
        miniChoice === "update" ?
        <Modal setReload={setReload} setData={setData} data={data} miniChoice={miniChoice} setMiniChoice={setMiniChoice}/>
        :
        miniChoice === "delete" ?
        ""
        :
        ""

      }
    </main>
  );
}
