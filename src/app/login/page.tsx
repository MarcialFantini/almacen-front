"use client";
import Link from "next/link";
import { ChangeEvent, FormEvent, Suspense, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUserToken } from "@/store/slice/login/actions";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";

export default function LoginPage() {
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
    if (token !== null) {
      router.push("/");
    }
  }, [token]);

  return (
    <div className=" min-h-[400px] flex justify-center items-center w-full">
      <form
        className="  w-[95%] max-w-[600px] flex flex-col gap-2"
        onSubmit={handlerCreateUser}
      >
        <label>
          Email:
          <Input
            value={form.email}
            onChange={handlerSetForm}
            type="email"
            name="email"
          />
        </label>
        <label>
          Contraseña:
          <Input
            value={form.password}
            onChange={handlerSetForm}
            type="password"
            name="password"
          />
        </label>
        <Button color="primary" type="submit">
          Login
        </Button>
        <Button variant="ghost" color="warning" href={"/register"} as={Link}>
          Register
        </Button>
      </form>
    </div>
  );
}
