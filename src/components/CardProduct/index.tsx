"use client";
import Image from "next/image";
import styled from "./styled.module.css";
import srcWomanDefault from "../../../public/images/home/woman-1840538_640.jpg";
import { Product } from "@/store/slice/products/product";
import { useState } from "react";
import Link from "next/link";

interface props {
  product: Product;
}

export const CardProduct = ({ product }: props) => {
  const [isLoad, setIsLoad] = useState(false);

  const handlerLoad = () => setIsLoad(true);

  return (
    <article className={styled.containerProduct}>
      <picture className={styled.picture + " " + (isLoad ? styled.Active : "")}>
        <Image
          onLoad={handlerLoad}
          className={styled.img + " " + (isLoad ? styled.Active : "")}
          width={500}
          height={400}
          src={
            product.ProductImages.length > 0
              ? "http://localhost:5000/api/v1/products/images/one/" +
                product.ProductImages[0].id
              : srcWomanDefault
          }
          alt=""
        ></Image>
      </picture>
      <div className={styled.textContainer}>
        <p className={styled.text}>{product.name}</p>
        <div className={styled.btnContainer}>
          <Link style={{ width: "100%" }} href={`/products/one/${product.id}`}>
            <button className={styled.btn}>Ver mas</button>
          </Link>
          <button className={styled.btn}>Comprar</button>
        </div>
        <p className={styled.text}>$ {product.price}</p>
      </div>
    </article>
  );
};
