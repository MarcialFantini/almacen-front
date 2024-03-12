"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CardProduct } from "../CardProduct";
import styled from "./styled.module.css";
import { useEffect } from "react";
import { setProductsHome } from "@/store/slice/products/actions";
import Link from "next/link";
const arr = [0, 0, 0, 0, 0, 0, 0, 0];

export const SectionProductsHome = () => {
  const products = useAppSelector((state) => state.productReducer.homeProducts);

  const dispatch = useAppDispatch();
  const setCategoryProducts = (category: string) =>
    dispatch(setProductsHome({ page: 0, offset: 8, category: category }));

  useEffect(() => {
    if (products.length === 0) {
      dispatch(setProductsHome({ page: 0, offset: 8 }));
    }
  }, [products]);

  return (
    <section className={styled.containerSection}>
      <header>
        <h2 className={styled.title}>Nueva colección </h2>
        <ul className={styled.list}>
          <li
            onClick={() => {
              setCategoryProducts("women");
            }}
          >
            Mujer
          </li>
          <li
            onClick={() => {
              setCategoryProducts("mens");
            }}
          >
            Hombre
          </li>
          <li
            onClick={() => {
              setCategoryProducts("children");
            }}
          >
            Niños
          </li>
          <li
            onClick={() => {
              dispatch(setProductsHome({ page: 0, offset: 8 }));
            }}
          >
            Total look
          </li>
        </ul>
      </header>
      <main className={styled.containerSectionProducts}>
        {products.length > 0
          ? products.map((product) => {
              return (
                <CardProduct key={product.id} product={product}></CardProduct>
              );
            })
          : arr.map((product, index) => {
              return (
                <CardProduct
                  key={index}
                  product={{
                    id: String(index),
                    name: "",
                    ProductImages: [],
                    amount: 0,
                    price: 0,
                  }}
                ></CardProduct>
              );
            })}
      </main>
      <footer className={styled.containerFooter}>
        <Link href={"/products"}>
          <button className={styled.btn}>Ver mas</button>
        </Link>
      </footer>
    </section>
  );
};
