'use client'
import { useEffect, useState } from "react";
import Calendar from "./_components/calendar/calendar";
import MiniPage from "./_components/miniPage/miniPage";
import styles from "./page.module.css";
import { getYearAndMonth } from "@/utils/time";
type navbar = 'list' | 'black';
export default function Home() {
  const [nav,setNav] = useState<navbar>('list');
  const [date,setDate] = useState(getYearAndMonth());
  useEffect(()=>{
    console.log(nav)
  },[nav])
  return (
    <main>
      <Calendar nav={nav} setNav={setNav} date={date} setDate={setDate}/>
      <MiniPage nav={nav} setNav={setNav} date={date}/>
    </main>
  );
}
