import Image from "next/image";
import styles from "./page.module.css";
import Sidebar from "./_components/sidebar/sidebar";
import Calendar from "./_components/calendar/calendar";

export default function Home() {
  return (
  <main className={styles.main}>
    <Sidebar/>
    <Calendar/>
  </main>
  );
}
