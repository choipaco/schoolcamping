'use client'
import { useEffect, useState } from "react";
import Calendar from "./_components/calendar/calendar";
import MiniPage from "./_components/miniPage/miniPage";
import styles from "./page.module.css";
import { getYearAndMonth } from "@/utils/time";
import Modal from "./_components/modal/modal";
type navbar = 'list' | 'black';
type miniChoice = 'update' | 'delete' | 'none';
export default function Home() {
  const [nav,setNav] = useState<navbar>('list');
  const [date,setDate] = useState(getYearAndMonth());
  const [miniChoice,setMiniChoice] = useState<miniChoice>('none');
  const [data, setData] = useState<any>();
  const [reload,setReload] = useState(true);
  
  return (
    <main>
      <Calendar reload={reload} setReload={setReload} nav={nav} setNav={setNav} date={date} setDate={setDate} miniChoice={miniChoice} setMiniChoice={setMiniChoice} setData={setData}/>
      <MiniPage nav={nav} setNav={setNav} date={date}/>
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
