import Image from "next/image";
import styles from "./page.module.css";
import { SectionPrincipal } from "@/components/SectionPrincipal";
import { SectionProductsHome } from "@/components/SectionProductsHome";
import { SectionBanner } from "@/components/SectionBanner";

export default function Home() {
  return (
    <main className={styles.main}>
      <SectionPrincipal></SectionPrincipal>
      <SectionProductsHome></SectionProductsHome>
      <SectionBanner></SectionBanner>
    </main>
  );
}
