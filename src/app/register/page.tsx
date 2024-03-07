"use client";
import Link from "next/link";
import styled from "./styled.module.css";
import Image from "next/image";
import srcImageBack from "../../../public/images/register/register.jpg";
import { IsLoad } from "@/hooks/isLoad";
import { ChangeEvent, FormEvent, Suspense, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  UserInterface,
  createUserActionThunk,
} from "@/store/slice/login/actions";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const { isLoad, handlerIsLoad } = IsLoad();
  const [form, setForm] = useState<UserInterface>({
    name: "",
    lastName: "",
    password: "",
    email: "",
  });
  const handlerForm = (event: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const dispatch = useAppDispatch();

  const handlerCreateUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
    dispatch(createUserActionThunk(form));
  };

  const token = useAppSelector((state) => state.LoginReducer.token);

  useEffect(() => {
    if (token.split("").length > 0) {
      router.push("/");
    }
  }, [token]);
  return (
    <main className={styled.containerView}>
      <Suspense>
        <picture className={styled.back}>
          <Image
            onLoad={handlerIsLoad}
            className={styled.img + " " + (isLoad ? styled.activeImage : "")}
            src={srcImageBack}
            alt="paisaje"
          ></Image>
        </picture>
      </Suspense>

      <form onSubmit={handlerCreateUser} className={styled.form}>
        <label>
          Nombre:
          <input onChange={handlerForm} type="text" name="name" />
        </label>
        <label>
          Apellido:
          <input onChange={handlerForm} type="text" name="lastName" />
        </label>
        <label>
          Email:
          <input onChange={handlerForm} type="email" name="email" />
        </label>
        <label>
          Contraseña:
          <input onChange={handlerForm} type="password" name="password" />
        </label>
        <button className={styled.btn} type="submit">
          Registrar
        </button>
        <Link className={styled.btn} href={"/login"}>
          Iniciar Sesión
        </Link>
      </form>
    </main>
  );
}
