import Image from "next/image";
import styles from "./page.module.css";
import { SlotsGame } from "@/components";


export default function Home() {



  return (
    <main className={styles.main}>
      <SlotsGame />
    </main>
  );
}
