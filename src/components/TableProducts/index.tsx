"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styled from "./styled.module.css";
import Link from "next/link";
import { DeleteProduct } from "@/store/slice/products/actions";

export const TableProducts = () => {
  const products = useAppSelector(
    (state) => state.productReducer.adminProducts
  );

  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.LoginReducer.token);

  const handlerDeleteProduct = (id: string) =>
    dispatch(DeleteProduct({ id, token: token || "" }));

  return (
    <table className={styled.table}>
      <thead>
        <tr className={styled.rowTop}>
          <th>name</th>
          <th>amount</th>
          <th>price</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody className={styled.tbody}>
        {products.map((product) => {
          return (
            <tr key={product.id} className={styled.rowBody}>
              <td>{product.name}</td>
              <td>{product.amount}</td>
              <td>{product.price}</td>
              <td className={styled.actions}>
                <Link
                  style={{ color: "inherit" }}
                  href={"/admin/products/update/" + product.id}
                >
                  <button>Modificar </button>
                </Link>

                <button onClick={() => handlerDeleteProduct(product.id)}>
                  del
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
