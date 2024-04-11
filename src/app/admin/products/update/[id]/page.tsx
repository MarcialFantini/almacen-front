"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styled from "./styled.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ProductUpdate } from "@/store/slice/products/actions";
import { Colors } from "@/utils/enums";
import { resetFlags } from "@/store/slice/products/product";
import { Button, Input } from "@nextui-org/react";

export interface ResponseProduct {
  data: Product;
  message: string;
  code: number;
}

export interface Product {
  id: string;
  name: string;
  amount: number;
  price: number;
}

export default function UpdatePage({ params }: { params: { id: string } }) {
  const [productToUpdate, setProductToUpdate] = useState<Product>({
    id: "",
    name: "",
    amount: 0,
    price: 0,
  });

  const handlerChangeProduct = (event: ChangeEvent<HTMLInputElement>) => {
    setProductToUpdate({
      ...productToUpdate,
      [event.target.name]: event.target.value,
    });
  };
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.LoginReducer.token);
  const handlerUpdateForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(ProductUpdate({ formProduct: productToUpdate, token }));
  };

  const color = useAppSelector((state) => state.productReducer.eventResponse);

  useEffect(() => {
    console.log("http://localhost:5000/api/v1/products/one/" + params.id);
    fetch("http://localhost:5000/api/v1/products/one/" + params.id)
      .then((res) => res.json() as unknown as Promise<ResponseProduct>)
      .then((data) => data.data)
      .then((data) => {
        console.log(data);
        setProductToUpdate({
          id: data.id,
          name: data.name,
          amount: data.amount,
          price: data.price,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (color === Colors.CreatedColor || color === Colors.ErrorColor) {
      setTimeout(() => {
        dispatch(resetFlags());
      }, 2000);
    }
  }, [color]);

  return (
    <div className={"flex w-[95%] max-w-[600px] m-auto"}>
      <form
        className={styled.formUpdate + " flex flex-col w-full gap-2 my-4"}
        onSubmit={handlerUpdateForm}
      >
        <label>
          Nombre del producto:
          <input
            value={productToUpdate.name}
            onChange={handlerChangeProduct}
            type="text"
            name="name"
          />
        </label>
        <label>
          Cantidad de producto:
          <input
            value={productToUpdate.amount}
            onChange={handlerChangeProduct}
            type="number"
            name="amount"
          />
        </label>
        <label>
          Precio de producto:
          <input
            value={productToUpdate.price}
            onChange={handlerChangeProduct}
            type="number"
            name="price"
          />
        </label>
        <Button color="primary" className={"bg-black"}>
          Actualizar
        </Button>
        <div
          style={{
            background: color,
            width: "100%",
            padding: "10px",
            textAlign: "center",
          }}
        >
          state
        </div>
      </form>
    </div>
  );
}
