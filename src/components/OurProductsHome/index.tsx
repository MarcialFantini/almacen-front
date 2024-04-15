"use client";
import Image from "next/image";
import srcImage from "../../../public/images/home/webp/main-image.webp";
import { Button } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { setProductsHome } from "@/store/slice/products/actions";
import Link from "next/link";

export const OurProductsHome = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productReducer.homeProducts);

  useEffect(() => {
    dispatch(setProductsHome({ page: 0, offset: 8 }));
  }, []);

  return (
    <section className=" flex flex-col w-[95%] m-auto my-4 gap-4 max-w-[1050px]">
      <h2 className="text-center text-4xl">Our Products</h2>
      <div
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))" }}
        className="grid gap-4 "
      >
        {products.map((item, index) => {
          return (
            <article
              key={item.id}
              className=" h-auto aspect-[3/4]  flex flex-col"
            >
              <picture className="h-[75%] w-full">
                <Image
                  className="w-full h-full object-cover"
                  width={1000}
                  height={1000}
                  src={
                    item.ProductImages[0].id
                      ? "http://localhost:5000/api/v1/products/images/one/" +
                        item.ProductImages[0].id
                      : srcImage
                  }
                  alt="Image from category"
                ></Image>
              </picture>
              <div className=" bg-[#F4F5F7] p-2 flex flex-col gap-2">
                <h4>{item.name}</h4>
                <p>{item.name}</p>
                <p>$ {item.price}</p>
                <Button
                  as={Link}
                  href={`/products/one/${item.id}`}
                  color="primary"
                  variant="shadow"
                >
                  Buy product
                </Button>
                <Button
                  as={Link}
                  href="/products"
                  color="secondary"
                  variant="ghost"
                >
                  See more
                </Button>
              </div>
            </article>
          );
        })}
      </div>
      <div className="flex items-center justify-center">
        <Button
          as={Link}
          href="/products"
          className=" w-full"
          color="warning"
          variant="shadow"
        >
          Ver mas
        </Button>
      </div>
    </section>
  );
};
