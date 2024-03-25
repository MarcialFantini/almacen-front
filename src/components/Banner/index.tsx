import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import styled from "./styled.module.css";
import Link from "next/link";

export interface BannerInterface {
  src: string | StaticImport;
  title: string;
  category: string;
}

export const Banner = ({ src, title, category }: BannerInterface) => {
  return (
    <article className={styled.article}>
      <picture className={styled.picture}>
        <Image className={styled.img} src={src} alt={title}></Image>
      </picture>
      <div className={styled.filter}></div>
      <div className={styled.containerBanner}>
        <h2 className={styled.title}>{title}</h2>
        <Link href={"/products"}>
          <button className={styled.btn}>Ver mas</button>
        </Link>
      </div>
    </article>
  );
};
