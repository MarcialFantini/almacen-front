"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styled from "./styled.module.css";
import Link from "next/link";
import { DeleteProduct } from "@/store/slice/products/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export const TableProducts = () => {
  const products = useAppSelector(
    (state) => state.productReducer.adminProducts,
  );

  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.LoginReducer.token);

  const handlerDeleteProduct = (id: string) =>
    dispatch(DeleteProduct({ id, token: token || "" }));

  return (
    <Table color="primary" className={"dark "}>
      <TableHeader>
        <TableColumn>name</TableColumn>
        <TableColumn>amount</TableColumn>
        <TableColumn>price</TableColumn>
        <TableColumn>actions</TableColumn>
      </TableHeader>
      <TableBody className={styled.tbody}>
        {products.map((product) => {
          return (
            <TableRow key={product.id} className={styled.rowBody}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.amount}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell className={styled.actions}>
                <Link
                  style={{ color: "inherit" }}
                  href={"/admin/products/update/" + product.id}
                >
                  <button>Modificar </button>
                </Link>

                <button onClick={() => handlerDeleteProduct(product.id)}>
                  del
                </button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
