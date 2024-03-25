"use client";
import styled from "./styled.module.css";
import { CardProduct } from "@/components/CardProduct";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setProductsGallery,
  setProductsGallerySearch,
} from "@/store/slice/products/actions";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function ProductsGallery() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const data = useAppSelector((state) => state.productReducer.galleryProducts);
  const handlerInputSearch = (event: ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);
  const handlerSetCategory = (category: string) => () =>
    dispatch(setProductsGallery({ page: 0, offset: 20, category }));

  const handlerSearchPage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setProductsGallerySearch(search));
  };
  useEffect(() => {
    dispatch(setProductsGallery({ page: 0, offset: 20 }));
  }, []);
  return (
    <div className={styled.view}>
      <section>
        <header>
          <form onSubmit={handlerSearchPage}>
            <label>
              <input
                onChange={handlerInputSearch}
                name="search"
                type="text"
                placeholder="Nombre de producto"
              />
              <button type="submit">Buscar</button>
            </label>
          </form>
          <ul className={styled.sectionCategoryList}>
            <li>
              <button onClick={handlerSetCategory("men")}>mens</button>
            </li>
            <li>
              <button onClick={handlerSetCategory("women")}>women</button>
            </li>
            <li>
              <button onClick={handlerSetCategory("children")}>children</button>
            </li>
            <li>
              <button
                onClick={() =>
                  dispatch(setProductsGallery({ page: 0, offset: 20 }))
                }
              >
                all
              </button>
            </li>
          </ul>
        </header>
        <main className={styled.sectionProducts}>
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
