"use client";
import styled from "./styled.module.css";
import { Product } from "@/store/slice/products/product";
import Image from "next/image";
import { useEffect, useState } from "react";
import srcDefault from "../../../../../public/images/home/main-image.jpg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addOneProduct, addProduct } from "@/store/slice/car/car";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [amountLeft, setAmountLeft] = useState(0);

  const car = useAppSelector((state) => state.CarReducer.products);

  const dispatch = useAppDispatch();
  const handlerAdd = () => dispatch(addOneProduct(params.id));

  const handlerAddProduct = () => {
    if (product) {
      dispatch(addProduct(product));
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/products/one/" + params.id, {
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((data) => data.data)
      .then((data) => {
        console.log(data);
        return setProduct(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (!product || !car) {
      return;
    }

    const productCar = car.find((productCar) => productCar.id === product.id);

    if (!productCar) {
      return setAmountLeft(product.amount);
    }

    const amountLeftCar = product.amount - productCar.amount;

    setAmountLeft(amountLeftCar);
  }, [car, product]);

  return (
    <section className={styled.view}>
      <article className={styled.product}>
        <picture className={styled.picture}>
          <Image
            src={
              product && product.ProductImages[0].id
                ? "http://localhost:5000/api/v1/products/images/one/" +
                  product.ProductImages[0].id
                : ""
            }
            alt=""
            width={1000}
            height={1000}
            className={styled.img + " " + (!!product ? styled.img_active : "")}
          ></Image>
        </picture>
        <div className={styled.containerText}>
          <h2>{product?.name}</h2>

          <p>${product?.price}</p>
          <p>Cantidad restante: {amountLeft}</p>
          <div className={styled.containerBtn}>
            <button onClick={handlerAddProduct}>Comprar</button>
            {product && amountLeft !== product.amount ? (
              <button onClick={handlerAdd}>Agregar mas </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </article>
    </section>
  );
}
