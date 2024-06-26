"use client";
import Image from "next/image";
import srcWomanDefault from "../../../public/images/home/webp/main-image.webp";
import { Product } from "@/store/slice/products/product";
import { useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addOneProduct, addProduct } from "@/store/slice/car/car";
import { Button } from "@nextui-org/react";

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
    <article className="flex flex-col aspect-[3/4] ">
      <picture className="h-[75%] w-full flex">
        <Image
          className="w-full h-full object-cover"
          onLoad={handlerLoad}
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
      <div className="p-2 w-full gap-1 flex flex-col bg-[#F4F5F7]">
        <h4 className=" text-xl">{product.name}</h4>

        <p>$ {product.price}</p>
        <Button color="warning" onClick={handlerMix}>
          Comprar
        </Button>

        <Button
          color="primary"
          variant="shadow"
          as={Link}
          href={`/products/one/${product.id}`}
        >
          Ver mas
        </Button>
      </div>
    </article>
  );
};
