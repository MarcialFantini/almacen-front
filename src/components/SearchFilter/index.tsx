"use client";
import { useAppDispatch } from "@/store/hooks";
import {
  setProductsGallery,
  setProductsGallerySearch,
} from "@/store/slice/products/actions";
import { Button, Input } from "@nextui-org/react";
import { ChangeEvent, FormEvent, useState } from "react";

const arrCategory = ["women", "men", "children"];

export const SearchFilter = () => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");

  const handlerInputSearch = (event: ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);
  const handlerSetCategory = (category: string) => () =>
    dispatch(setProductsGallery({ page: 0, offset: 20, category }));

  const handlerSearchPage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setProductsGallerySearch(search));
  };

  return (
    <div className="w-full m-auto p-4 bg-[#F9F1E7]">
      <form onSubmit={handlerSearchPage}>
        <label className="flex flex-row w-full gap-4">
          <Input
            color="primary"
            onChange={handlerInputSearch}
            name="search"
            type="text"
            placeholder="Nombre de producto"
          />
          <Button color="primary" variant="shadow" type="submit">
            Buscar
          </Button>
        </label>
      </form>
      <ul className=" flex flex-row gap-4 py-4">
        {arrCategory.map((category) => (
          <li key={category}>
            <Button
              color="secondary"
              variant="shadow"
              onClick={handlerSetCategory(category)}
            >
              {category}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
