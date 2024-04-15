"use client";
import { CardProduct } from "@/components/CardProduct";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setProductsGallery } from "@/store/slice/products/actions";

import Image from "next/image";
import { useEffect } from "react";
import srcMainImg from "../../../public/images/products/bedroom.webp";
import { SearchFilter } from "@/components/SearchFilter";

export default function ProductsGallery() {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.productReducer.galleryProducts);

  useEffect(() => {
    dispatch(setProductsGallery({ page: 0, offset: 20 }));
  }, []);
  return (
    <div className="w-[95%] m-auto max-w-[1200px]">
      <picture className="flex w-full h-[300px] overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          src={srcMainImg}
          alt="main products img"
        ></Image>
      </picture>
      <SearchFilter></SearchFilter>
      <section className="w-[95%] p-2 m-auto">
        <main
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))" }}
          className="grid gap-4 "
        >
          {data.map((product) => {
            return (
              <CardProduct key={product.id} product={product}></CardProduct>
            );
          })}
        </main>
      </section>
    </div>
  );
}
