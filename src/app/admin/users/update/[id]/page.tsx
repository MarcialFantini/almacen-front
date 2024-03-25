"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "./styled.module.css";
import {
  getUserAdmin,
  updateUserAdmin,
  updateUserInterface,
} from "@/store/slice/users/action";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function UpdatePage({ params }: { params: { id: string } }) {
  const [form, setForm] = useState<updateUserInterface>({
    name: "",
    lastName: "",
    email: "",
    role: "",
  });
  const user = useAppSelector((state) => state.usersReducer.userUpdate);
  const token = useAppSelector((state) => state.LoginReducer.token);
  const dispatch = useAppDispatch();
  const handlerOnChangeForm = (event: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [event.target.name]: event.target.value });
  const handlerSendForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (token) {
      dispatch(updateUserAdmin({ token, update: form, id: params.id }));
    }
  };
  useEffect(() => {
    if (token) {
      dispatch(getUserAdmin({ token: token, id: params.id }));
    }
  }, []);

  useEffect(() => {
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      lastName: user.lastName,
    });
  }, [user]);

  return (
    <div className={styled.view}>
      <form onSubmit={handlerSendForm}>
        <label>
          Nombre:
          <input
            value={form.name}
            name="name"
            onChange={handlerOnChangeForm}
            type="text"
          />
        </label>
        <label>
          Apellido:
          <input
            value={form.lastName}
            name="lastName"
            onChange={handlerOnChangeForm}
            type="text"
          />
        </label>
        <label>
          Email:
          <input
            value={form.email}
            name="email"
            onChange={handlerOnChangeForm}
            type="text"
          />
        </label>
        <label>
          Role:
          <input
            value={form.role}
            name="role"
            onChange={handlerOnChangeForm}
            type="text"
          />
        </label>
        <button type="submit" className={styled.btn}>
          Actualizar
        </button>
      </form>
    </div>
  );
}
