"use client";
import Link from "next/link";
import styled from "./styled.module.css";
import Image from "next/image";
import srcImageBack from "../../../public/images/register/register.jpg";
import { ChangeEvent, FormEvent, Suspense, useEffect, useState } from "react";
import { IsLoad } from "@/hooks/isLoad";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUserToken } from "@/store/slice/login/actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { isLoad, handlerIsLoad } = IsLoad();
  const [form, setForm] = useState({ email: "", password: "" });
  const handlerSetForm = (event: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const dispatch = useAppDispatch();
  const handlerCreateUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginUserToken(form));
  };

  const token = useAppSelector((state) => state.LoginReducer.token);
  const router = useRouter();
  useEffect(() => {
    console.log(token);
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
          Email:
          <input
            value={form.email}
            onChange={handlerSetForm}
            type="email"
            name="email"
          />
        </label>
        <label>
          Contraseña:
          <input
            value={form.password}
            onChange={handlerSetForm}
            type="password"
            name="password"
          />
        </label>
        <button className={styled.btn} type="submit">
          Login
        </button>
        <Link className={styled.btn} href={"/register"}>
          Register
        </Link>
      </form>
    </main>
  );
}
