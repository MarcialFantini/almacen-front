"use client";
import Image from "next/image";
import styled from "./styled.module.css";
import srcWomanDefault from "../../../public/images/home/webp/main-image.webp";
import { Product } from "@/store/slice/products/product";
import { useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addOneProduct, addProduct } from "@/store/slice/car/car";

interface props {
  product: Product;
}

export const CardProduct = ({ product }: props) => {
  const [isLoad, setIsLoad] = useState(false);
  const products = useAppSelector((state) => state.CarReducer.products);
  const dispatch = useAppDispatch();
  const handlerLoad = () => setIsLoad(true);
  const handlerAddProduct = () =>
    dispatch(addProduct({ ...product, amount: 1 }));
  const handlerAddOneProduct = () => dispatch(addOneProduct(product.id));

  const handlerMix = () => {
    const id = products.findIndex((pro) => pro.id === product.id);
    if (id === -1) {
      return handlerAddProduct();
    }
    return handlerAddOneProduct();
  };

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
          <button onClick={handlerMix} className={styled.btn}>
            Comprar
          </button>
        </div>
        <p className={styled.text}>$ {product.price}</p>
      </div>
    </article>
  );
};
