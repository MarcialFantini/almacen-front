"use client";
import { Product } from "@/store/slice/products/product";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addOneProduct, addProduct } from "@/store/slice/car/car";
import { Button } from "@nextui-org/react";
import Link from "next/link";

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
    <section className="flex flex-col">
      <article className="grid grid-cols-2 max-w-[1200px] m-auto ">
        <picture>
          <Image
            src={
              product && product.ProductImages[0].id
                ? "http://localhost:5000/api/v1/products/images/one/" +
                  product.ProductImages[0].id
                : ""
            }
            alt=""
            className=" w-full h-full object-cover"
            width={1200}
            height={900}
          ></Image>
        </picture>
        <div className="flex flex-col gap-2 py-4 px-[10%] w-full justify-center">
          <h2 className=" text-4xl">{product?.name}</h2>

          <p className="text-xl text-gray-500">${product?.price}</p>
          <p>Amount: {amountLeft}</p>
          <div className="flex flex-col gap-2">
            <Button
              color="primary"
              variant="shadow"
              onClick={handlerAddProduct}
            >
              Add car
            </Button>
            {product && amountLeft !== product.amount ? (
              <>
                <Button color="warning" variant="ghost" onClick={handlerAdd}>
                  Add one more{" "}
                </Button>
                <Button
                  href="/car"
                  color="secondary"
                  variant="shadow"
                  as={Link}
                >
                  Car
                </Button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </article>
    </section>
  );
}
