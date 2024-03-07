import Image from "next/image";
import styled from "./styled.module.css";
import srcMainImage from "../../../public/images/home/main-image.jpg";

export const SectionPrincipal = () => {
  return (
    <section className={styled.containerSection}>
      <picture className={styled.picture}>
        <Image
          className={styled.img}
          src={srcMainImage}
          alt="main image"
        ></Image>
      </picture>
      <div className={styled.filter}></div>
      <div className={styled.containerText}>
        <h2>
          Vive la moda <span>en cada momento</span>
        </h2>
      </div>
    </section>
  );
};
