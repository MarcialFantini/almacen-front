"use client";
import styled from "./styled.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { OrdersDeleteThunk, OrdersGetThunk } from "@/store/slice/orders/action";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { useEffect } from "react";

export default function OrdersPage() {
  const orders = useAppSelector(
    (state) => state.OrdersReducer.ordersAdminTable
  );
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.LoginReducer.token);

  const handlerOrderDelete = (id: string) => () => {
    if (token) {
      dispatch(OrdersDeleteThunk({ id, token }));
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(OrdersGetThunk({ page: 0, offset: 20, token: token }));
    }
  }, []);

  return (
    <div className={styled.view}>
      <Table className="dark">
        <TableHeader>
          <TableColumn>Usuario</TableColumn>
          <TableColumn>Producto</TableColumn>
          <TableColumn>Precio</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Cantidad</TableColumn>
          <TableColumn>Total</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map((state) => {
            return (
              <TableRow key={state.id}>
                <TableCell>{state.User.name}</TableCell>
                <TableCell>{state.Product.name}</TableCell>
                <TableCell>{state.Product.price}</TableCell>
                <TableCell>{state.User.email}</TableCell>
                <TableCell>{state.amount}</TableCell>
                <TableCell>${state.amount * state.Product.price}</TableCell>
                <TableCell className={styled.row}>
                  <Button color="danger" onClick={handlerOrderDelete(state.id)}>
                    Borrar
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
