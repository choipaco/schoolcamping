import Image from "next/image";
import styles from "./page.module.css";
import Sidebar from "./_components/sidebar/sidebar";
import Calendar from "./_components/calendar/calendar";
import viewport from "@/utils/viewport";

export default function Home() {
  
  return (
    <>
    {
      viewport() ?
      <main className={styles.main}>
        <Sidebar/>
        <Calendar/>
      </main>
      :
      <></>
    }
    </>
  );
}
