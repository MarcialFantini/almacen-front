"use client";
import { useEffect } from "react";
import styled from "./styled.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteUserAdmin, setUsersAdmin } from "@/store/slice/users/action";
import Link from "next/link";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
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
    <section className={"w-[95%] max-w-[1200px] m-auto text-white"}>
      <Table color="primary" className="dark">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Apellido</TableColumn>
          <TableColumn>Role</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((state) => {
            return (
              <TableRow>
                <TableCell>{state.id}</TableCell>
                <TableCell>{state.name}</TableCell>
                <TableCell>{state.lastName}</TableCell>
                <TableCell>{state.role}</TableCell>
                <TableCell>{state.email}</TableCell>
                <TableCell className={styled.row}>
                  <Button
                    color="secondary"
                    href={"/admin/users/update/" + state.id}
                    as={Link}
                  >
                    Update
                  </Button>
                  <Button
                    color="danger"
                    onClick={handlerDelete(state.id, token)}
                  >
                    Del
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
