import { CardProduct } from "../CardProduct";
import styled from "./styled.module.css";
const arr = [0, 0, 0, 0, 0, 0, 0, 0];

export const SectionProductsHome = () => {
  return (
    <section className={styled.containerSection}>
      <header>
        <h2 className={styled.title}>Nueva colección </h2>
        <ul className={styled.list}>
          <li>Mujer</li>
          <li>Hombre</li>
          <li>Niños</li>
          <li>Total look</li>
        </ul>
      </header>
      <main className={styled.containerSectionProducts}>
        {arr.map(() => {
          return <CardProduct></CardProduct>;
        })}
      </main>
      <footer className={styled.containerFooter}>
        <button className={styled.btn}>Ver mas</button>
      </footer>
    </section>
  );
};
