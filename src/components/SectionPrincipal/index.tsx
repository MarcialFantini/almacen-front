"use client";

import Image from "next/image";
import styled from "./styled.module.css";
import srcMainImage1 from "../../../public/images/home/woman1.jpg";
import srcMainImage2 from "../../../public/images/home/woman2.jpg";
import srcMainImage3 from "../../../public/images/home/woman3.jpg";

export const SectionPrincipal = () => {
  return (
    <section className={styled.containerSection}>
      <div className={styled.containerSlider}>
        <div className={styled.rowSlider}>
          <picture className={styled.picture}>
            <Image
              className={styled.img}
              src={srcMainImage1}
              alt="main image"
            ></Image>
          </picture>
          <picture className={styled.picture}>
            <Image
              className={styled.img}
              src={srcMainImage2}
              alt="main image"
            ></Image>
          </picture>
          <picture className={styled.picture}>
            <Image
              className={styled.img}
              src={srcMainImage3}
              alt="main image"
            ></Image>
          </picture>
        </div>
      </div>
      <div className={styled.containerText}>
        <h2>
          Vive la moda <span>en cada momento</span>
        </h2>
      </div>
    </section>
  );
};
