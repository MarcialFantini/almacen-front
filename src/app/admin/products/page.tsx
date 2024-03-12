"use client";
import { TableDataProduct } from "@/components/TableDataProduct";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setProductsAdmin } from "@/store/slice/products/actions";
import { useEffect } from "react";

export default function ProductPage() {
  const products = useAppSelector(
    (state) => state.productReducer.adminProducts
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (products.length === 0) {
      dispatch(setProductsAdmin({ page: 0, offset: 20 }));
    }
  }, [products]);
  return (
    <main style={{ minHeight: "100vh", padding: "100px 0" }}>
      <TableDataProduct></TableDataProduct>
    </main>
  );
}
