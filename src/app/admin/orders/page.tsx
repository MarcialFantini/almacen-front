"use client";
import styled from "./styled.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { OrdersDeleteThunk, OrdersGetThunk } from "@/store/slice/orders/action";

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
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Email</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((state) => {
            return (
              <tr key={state.id}>
                <td>{state.User.name}</td>
                <td>{state.Product.name}</td>
                <td>{state.Product.price}</td>
                <td>{state.User.email}</td>
                <td>{state.amount}</td>
                <td>${state.amount * state.Product.price}</td>
                <td className={styled.row}>
                  <button onClick={handlerOrderDelete(state.id)}>Borrar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
