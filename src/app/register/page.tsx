"use client";
import Link from "next/link";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  UserInterface,
  createUserActionThunk,
} from "@/store/slice/login/actions";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";

export default function RegisterPage() {
  const router = useRouter();

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
    dispatch(createUserActionThunk(form));
  };

  const token = useAppSelector((state) => state.LoginReducer.token);

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);
  return (
    <main>
      <form
        className=" flex flex-col gap-4 text-2xl w-[95%] m-auto p-4"
        onSubmit={handlerCreateUser}
      >
        <label>
          Nombre:
          <Input required onChange={handlerForm} type="text" name="name" />
        </label>
        <label>
          Apellido:
          <Input required onChange={handlerForm} type="text" name="lastName" />
        </label>
        <label>
          Email:
          <Input required onChange={handlerForm} type="email" name="email" />
        </label>
        <label>
          Contraseña:
          <Input
            required
            onChange={handlerForm}
            type="password"
            name="password"
          />
        </label>
        <Button color="primary" type="submit">
          Registrar
        </Button>
        <Button
          color="warning"
          href="/login"
          as={Link}
          style={{ width: "100%" }}
        >
          Iniciar Sesión
        </Button>
      </form>
    </main>
  );
}
