"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styled from "./styled.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createProductAdmin } from "@/store/slice/products/actions";
import { resetFlags } from "@/store/slice/products/product";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";

const categories = ["men", "women", "children"];

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
  const handlerForm = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => setForm({ ...form, [event.target.name]: event.target.value });

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
      <form
        className={styled.form + " flex flex-col"}
        onSubmit={handlerCreateProduct}
      >
        <label>
          Nombre Producto:
          <input
            className={styled.input}
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
            className={styled.input}
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
            className={styled.input}
            placeholder="Precio de producto"
            onChange={handlerForm}
            type="number"
            name="price"
            value={form.price}
          />
        </label>

        <label>
          Categoría:
          <Select
            placeholder="Categoría de producto"
            onChange={handlerForm}
            name="category"
            children={categories.map((item) => (
              <SelectItem key={item}>{item}</SelectItem>
            ))}
          ></Select>
        </label>

        <label>
          Imagen del producto:
          <Input onChange={handlerImageChange} type="file" multiple />
        </label>

        <Button color="primary" type="submit" className="my-4">
          Crear producto
        </Button>
      </form>
    </div>
  );
}
