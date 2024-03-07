import Image from "next/image";
import styled from "./styled.module.css";
import srcWomanDefault from "../../../public/images/home/woman-1840538_640.jpg";
export const CardProduct = () => {
  return (
    <article className={styled.containerProduct}>
      <picture className={styled.picture}>
        <Image className={styled.img} src={srcWomanDefault} alt=""></Image>
      </picture>
      <div className={styled.textContainer}>
        <p className={styled.text}>product 01</p>
        <button>Ver mas</button>
      </div>
    </article>
  );
};
