"use client";
import { useEffect } from "react";
import styled from "./styled.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteUserAdmin, setUsersAdmin } from "@/store/slice/users/action";
import Link from "next/link";
export default function UsersPage() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.LoginReducer.token);
  const users = useAppSelector((state) => state.usersReducer.users);
  const handlerDelete = (id: string, token: string | null) => () => {
    if (token) {
      dispatch(deleteUserAdmin({ token, id }));
    }
  };
  useEffect(() => {
    if (token) {
      dispatch(setUsersAdmin(token));
    }
  }, []);

  return (
    <section className={styled.view}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Role</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((state) => {
            return (
              <tr>
                <td>{state.id}</td>
                <td>{state.name}</td>
                <td>{state.lastName}</td>
                <td>{state.role}</td>
                <td>{state.email}</td>
                <td className={styled.row}>
                  <button>
                    <Link href={"/admin/users/update/" + state.id}>Update</Link>
                  </button>
                  <button onClick={handlerDelete(state.id, token)}>Del</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
