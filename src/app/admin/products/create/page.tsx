"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styled from "./styled.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createProductAdmin } from "@/store/slice/products/actions";
import { resetFlags } from "@/store/slice/products/product";

export default function CreateProductPage() {
  const [form, setForm] = useState({
    name: "",
    amount: 0,
    price: 0,
    category: "",
  });

  const [files, setFiles] = useState<File[]>([]);

  const [color, setColor] = useState("white");
  const token = useAppSelector((state) => state.LoginReducer.token);
  const stateColor = useAppSelector(
    (state) => state.productReducer.eventResponse
  );
  const handlerForm = (event: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const handlerImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setFiles(filesArray);
    }
    console.log(files);
  };

  const dispatch = useAppDispatch();

  const handlerCreateProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      createProductAdmin({ body: form, token: token || "", images: files })
    );
  };

  useEffect(() => {
    setColor(stateColor);
    setTimeout(() => {
      dispatch(resetFlags());
    }, 500);
  }, [stateColor]);

  return (
    <div className={styled.view}>
      <form onSubmit={handlerCreateProduct}>
        <label>
          Nombre Producto:
          <input
            placeholder="nombre de producto"
            onChange={handlerForm}
            type="text"
            name="name"
            value={form.name}
          />
        </label>
        <label>
          Cantidad del Producto:
          <input
            placeholder="cantidad de producto"
            onChange={handlerForm}
            type="number"
            name="amount"
            value={form.amount}
          />
        </label>
        <label>
          Precio de Producto:
          <input
            placeholder="Precio de producto"
            onChange={handlerForm}
            type="number"
            name="price"
            value={form.price}
          />
        </label>

        <label>
          Categoría:
          <input
            placeholder="Categoría de producto"
            onChange={handlerForm}
            type="text"
            name="category"
            value={form.category}
          />
        </label>

        <label>
          Imagen del producto:
          <input onChange={handlerImageChange} type="file" multiple />
        </label>

        <button className={styled.btn}>Crear producto</button>
        <div style={{ background: color }} className={styled.state}>
          <p>state</p>
        </div>
      </form>
    </div>
  );
}
